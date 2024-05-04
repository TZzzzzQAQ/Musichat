import {requestSpotifyCommon} from "@/utils/index.jsx";

export function searchAPI(params) {
    return requestSpotifyCommon({
        url: '/search',
        method: 'GET',
        params
    })
}

export function getNewReleasesAPI(params) {
    return requestSpotifyCommon({
        url: '/browse/new-releases',
        method: 'GET',
        params
    }).then(response => {
        // Assuming the response is the direct data you want
        return response;
    }).catch(error => {
        console.error("Error fetching new releases:", error);
        // Optionally re-throw the error or handle it by returning a default structure
         // Re-throwing keeps the error handling consistent and lets the caller handle it
    });
}


export function getAlbumsFromIDAPI(id) {
    return requestSpotifyCommon({
        url: `albums/${id}`,
        method: 'GET'
    })
}

export function getTopTracksAPI(id) {
    return requestSpotifyCommon({
        url: `/artists/${id}/top-tracks`,
        method: 'GET'
    })
}