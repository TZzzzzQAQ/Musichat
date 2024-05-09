import {requestMessage} from "@/axios/requestMessage.jsx";

export function getMessageAPI() {
    return requestMessage({
        method: 'GET',
        url: '/'
    })
}