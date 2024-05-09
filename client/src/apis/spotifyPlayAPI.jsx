import {requestSpotifyPlay} from "@/axios/requestSpotifyPlay.jsx";  // Import the requestSpotifyPlay function from a local file

export function playListAPI(deviceId, data) {
    return requestSpotifyPlay({
        method: 'PUT',  // Set the HTTP method to PUT for updating resources
        url: `/play?device_id=${deviceId}`,  // Define the URL endpoint with the device ID as a query parameter
        data  // Pass the data payload for the request
    })
}

export function getActiveDeviceAPI() {
    return requestSpotifyPlay({
        method: 'GET',  // Set the HTTP method to GET to retrieve data
        url: '/devices'  // Define the URL endpoint to get information about devices
    })
}

export function getPlaybackStateAPI() {
    return requestSpotifyPlay({
        method: 'GET'  // Set the HTTP method to GET to retrieve the current playback state
    })
}

export function playRepeat(state) {
    const url = `/repeat?state=${encodeURIComponent(state)}`;  // Encode the state parameter to ensure URL compatibility
    return requestSpotifyPlay({
        method: 'PUT',  // Set the HTTP method to PUT to modify the repeat state
        url: url  // Use the URL with the encoded state parameter
    })
}

export function playShuffle(state) {
    const url = `/shuffle?state=${encodeURIComponent(state)}`;  // Encode the state parameter to ensure URL compatibility
    return requestSpotifyPlay({
        method: 'PUT',  // Set the HTTP method to PUT to modify the shuffle state
        url: url  // Use the URL with the encoded state parameter
    })
}

export function playbackQueue(uri, device_id = null) {
    // Initialize params with the URI
    const params = { uri: uri };  // Assuming uri needs to be in the body

    // Add device_id to params if it's provided
    if (device_id) {
        params.device_id = device_id;  // Add device_id to params if it's provided
    }
    return requestSpotifyPlay({
        url: '/queue', // Define the URL endpoint to add to the playback queue
        method: 'POST',  // Set the HTTP method to POST to send data
        params  // Include params in the request
    });
}





