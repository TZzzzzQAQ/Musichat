import {requestSpotifyLogin} from "@/utils/requestSpotifyLogin.jsx";

export function playListAPI(params) {
    return requestSpotifyLogin({
        method: 'GET',
        url: '/me/playlists',
        params
    })
}