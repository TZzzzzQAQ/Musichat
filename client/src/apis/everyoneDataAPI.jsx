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
    })
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