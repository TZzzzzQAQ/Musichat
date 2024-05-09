import axios from 'axios'
import {getEveryoneToken} from "@/utils/tokenForEveryone.jsx";

const requestSpotifyCommon = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    timeout: 5000
})

requestSpotifyCommon.interceptors.request.use((config) => {
    if (getEveryoneToken()) {
        config.headers.Authorization = `Bearer ${getEveryoneToken()}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

requestSpotifyCommon.interceptors.response.use((response) => {
    return response.data
}, (error) => {
    return Promise.reject(error)
})

export {requestSpotifyCommon}