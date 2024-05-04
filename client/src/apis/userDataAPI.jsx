import {requestSpotifyLogin} from "@/axios/requestSpotifyLogin.jsx";

export function getPlayListAPI(params) {
    return requestSpotifyLogin({
        method: 'GET',
        url: '/playlists',
        params
    })
}

export function getRecentPlaylistsAPI(params) {
    return requestSpotifyLogin({
        method: 'GET',
        url: 'player/recently-played',
        params
    })
}