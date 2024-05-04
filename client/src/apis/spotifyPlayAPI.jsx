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
