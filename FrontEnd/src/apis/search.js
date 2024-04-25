import {request} from "FrontEnd/src/utils";

export function searchAPI(params) {
    return request({
        url: '/search',
        method: 'GET',
        params
    })
}