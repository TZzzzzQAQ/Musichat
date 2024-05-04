import {useState, useCallback} from 'react';
import {CLIENT_ID} from "@/../config.js";
import {setUserToken} from "@/utils/index.jsx";

const redirect_uri = 'http://localhost:5173/Musichat/account';
const scope = "user-read-private user-read-email playlist-read-private user-read-recently-played playlist-read-collaborative user-modify-playback-state user-read-playback-state "
export const useSpotifyAuth = () => {
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);

    function generateCodeVerifier(length) {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    async function generateCodeChallenge(codeVerifier) {
        const data = new TextEncoder().encode(codeVerifier);
        const digest = await window.crypto.subtle.digest('SHA-256', data);
        return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    const redirectToAuthCodeFlow = useCallback(async () => {
        const verifier = generateCodeVerifier(128);
        const challenge = await generateCodeChallenge(verifier);

        localStorage.setItem("verifier", verifier);

        const params = new URLSearchParams();
        params.append("client_id", CLIENT_ID);
        params.append("response_type", "code");
        params.append("redirect_uri", redirect_uri);
        params.append("scope", scope);
        params.append("code_challenge_method", "S256");
        params.append("code_challenge", challenge);

        document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
    }, []);

    const getAccessToken = useCallback(async (code) => {
        const verifier = localStorage.getItem("verifier");

        const params = new URLSearchParams();
        params.append("client_id", CLIENT_ID);
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        params.append("redirect_uri", redirect_uri);
        params.append("code_verifier", verifier);

        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: params
        });

        const data = await result.json();
        if (data.access_token && data.refresh_token) {
            setAccessToken(data.access_token);
            setRefreshToken(data.refresh_token);
            setUserToken(data.access_token);
        }
        return data;

    }, []);

    const fetchProfile = useCallback(async (code) => {
        const {access_token: accessToken} = await getAccessToken(code);
        if (!accessToken) {
            throw new Error("Access token is not available.");
        }
        const response = await fetch("https://api.spotify.com/v1/me", {
            method: "GET",
            headers: {Authorization: `Bearer ${accessToken}`}
        });
        return response.json();
    }, [accessToken]);

    return {fetchProfile, getAccessToken, redirectToAuthCodeFlow, accessToken, refreshToken};
};
