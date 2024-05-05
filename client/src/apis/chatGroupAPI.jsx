import {requestChat} from "@/axios/requestChat.jsx";

export function sendMessageAPI(data) {
    return requestChat({
        method: 'PUT',
        url: "/login",
        data
    })
}

export function sendUserDataAPI(data) {
    return requestChat({
        method: 'PUT',
        url: "/login",
        data
    })
}