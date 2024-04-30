import {requestSpotify} from "@/utils/index.jsx";

export function searchAPI(params) {
    return requestSpotify({
        url: '/search',
        method: 'GET',
        params
    })
}