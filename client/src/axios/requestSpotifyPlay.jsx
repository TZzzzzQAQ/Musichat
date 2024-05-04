import axios from 'axios';
import {getUserToken} from "@/utils/tokenForUser.jsx";

const requestSpotifyPlay = axios.create({
    baseURL: 'https://api.spotify.com/v1/me/player',
    timeout: 5000
})

requestSpotifyPlay.interceptors.request.use((config) => {
    if (getUserToken()) {
        config.headers.Authorization = `Bearer ${getUserToken()}`
    }
    config.headers["Content-Type"] = "application/json; charset=utf-8"
    return config
}, (error) => {
    return Promise.reject(error)
})

requestSpotifyPlay.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    return Promise.reject(error)
})

export {requestSpotifyPlay}