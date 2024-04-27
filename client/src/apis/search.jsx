import {request} from "@/utils/index.jsx";

export function searchAPI(params) {
    return request({
        url: '/search',
        method: 'GET',
        params
    })
}