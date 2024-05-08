import {requestChat} from "@/axios/requestChat.jsx";

export function sendUserDataAPI(data) {
    return requestChat({
        method: 'PUT',
        url: "/login",
        data
    })
}
