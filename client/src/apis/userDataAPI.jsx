import {requestSpotifyLogin} from "@/axios/requestSpotifyLogin.jsx";

export function playListAPI(params) {
    return requestSpotifyLogin({
        method: 'GET',
        url: '/playlists',
        params
    })
}

export function recentPlaylistsAPI(params) {
    return requestSpotifyLogin({
        method: 'GET',
        url: 'player/recently-played',
        params
    })
}