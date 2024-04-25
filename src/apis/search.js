import {request} from "@/utils";

export function searchAPI(params) {
    return request({
        url: '/search',
        method: 'GET',
        params
    })
}