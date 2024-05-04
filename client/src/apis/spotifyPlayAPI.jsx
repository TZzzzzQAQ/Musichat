import {requestSpotifyPlay} from "@/axios/requestSpotifyPlay.jsx";

export function playListAPI(deviceId, params) {
    return requestSpotifyPlay({
        method: 'PUT',
        // url: `/play?device_id=${deviceId}`,
        url: '/play',
        params
    })
}

export function getActiveDeviceAPI() {
    return requestSpotifyPlay({
        method: 'GET',
        url: '/devices'
    })
}
