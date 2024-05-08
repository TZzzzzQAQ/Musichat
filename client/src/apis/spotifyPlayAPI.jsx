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


export function playbackQueue(uri, device_id = null) {
    // Initialize params with the URI
    const params = { uri: uri };  // Assuming uri needs to be in the body

    // Add device_id to params if it's provided
    if (device_id) {
        params.device_id = device_id;
    }
    console.log(params);
    return requestSpotifyPlay({
        url: '/queue', // Make sure the URL is fully qualified
        method: 'POST',
        params
    });
}





