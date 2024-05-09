import {requestUser} from "@/axios/requestUser.jsx";

export function sendUserDataAPI(data) {
    return requestUser({
        method: 'PUT',
        url: "/login",
        data
    })
}
