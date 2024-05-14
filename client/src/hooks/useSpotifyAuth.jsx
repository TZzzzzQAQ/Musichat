import {useState, useCallback} from 'react';
import {CLIENT_ID} from "@/../config.js";
import {setUserToken} from "@/utils/index.jsx";
import CryptoJS from 'crypto-js';

// Redirect URI after authentication success
const redirect_uri = `${window.location.origin}/Musichat/account`;

// Required Spotify scopes as a single string separated by spaces
const scope = "user-read-private " +
    "user-read-email " +
    "playlist-read-private " +
    "user-read-recently-played " +
    "playlist-read-collaborative " +
    "user-modify-playback-state " +
    "user-read-playback-state " +
    "user-follow-read " +
    "user-top-read " +
    "streaming";

export const useSpotifyAuth = () => {
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);

    // Generates a random string to be used as a code verifier
    function generateCodeVerifier(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    // Generates a code challenge from the verifier to be used in the PKCE flow
    async function generateCodeChallenge(codeVerifier) {
        const hash = CryptoJS.SHA256(codeVerifier);
        const base64 = CryptoJS.enc.Base64.stringify(hash)
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
        return base64;
    }

    // Redirects the user to Spotify's authorization page
    const redirectToAuthCodeFlow = useCallback(async () => {
        const verifier = generateCodeVerifier(128);
        const challenge = await generateCodeChallenge(verifier);

        sessionStorage.setItem("verifier", verifier);

        const params = new URLSearchParams();
        params.append("client_id", CLIENT_ID);
        params.append("response_type", "code");
        params.append("redirect_uri", redirect_uri);
        params.append("scope", scope);
        params.append("code_challenge_method", "S256");
        params.append("code_challenge", challenge);

        document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
    }, []);

    // Exchanges a code for an access token using the code verifier stored in session storage
    const getAccessToken = useCallback(async (code) => {
        const verifier = sessionStorage.getItem("verifier");

        const params = new URLSearchParams();
        params.append("client_id", CLIENT_ID);
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        params.append("redirect_uri", redirect_uri);
        params.append("code_verifier", verifier);

        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: params.toString()
        });

        const data = await response.json();
        if (data.access_token && data.refresh_token) {
            setAccessToken(data.access_token);
            setRefreshToken(data.refresh_token);
            setUserToken(data.access_token);
        }
        return data;
    }, []);

    // Fetches the user profile from Spotify using the access token
    const fetchProfile = useCallback(async (code) => {
        const {access_token: accessToken} = await getAccessToken(code);
        if (!accessToken) {
            throw new Error("Access token is not available.");
        }
        const response = await fetch("https://api.spotify.com/v1/me", {
            method: "GET",
            headers: {Authorization: `Bearer ${accessToken}`}
        });
        return await response.json();
    }, [accessToken]);

    return {fetchProfile, getAccessToken, redirectToAuthCodeFlow, accessToken, refreshToken};
};
