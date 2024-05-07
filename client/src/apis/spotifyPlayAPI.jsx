import {requestSpotifyPlay} from "@/axios/requestSpotifyPlay.jsx";

export function playListAPI(deviceId, data) {
    return requestSpotifyPlay({
        method: 'PUT',
        url: `/play?device_id=${deviceId}`,
        data
    })
}

export function getActiveDeviceAPI() {
    return requestSpotifyPlay({
        method: 'GET',
        url: '/devices'
    })
}

export function getPlaybackStateAPI() {
    return requestSpotifyPlay({
        method: 'GET'
    })
}


export function playRepeat(state) {
    const url = `/repeat?state=${encodeURIComponent(state)}`;
    return requestSpotifyPlay({
        method: 'PUT',
        url: url
    })
}


export function playShuffle(state) {
    const url = `/shuffle?state=${encodeURIComponent(state)}`;
    return requestSpotifyPlay({
        method: 'PUT',
        url: url
    })
}



