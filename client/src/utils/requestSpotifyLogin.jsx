import axios from 'axios';
import {getUserToken} from "@/utils/tokenForUser.jsx";

const requestSpotifyLogin = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    timeout: 5000
})

requestSpotifyLogin.interceptors.request.use((config) => {
    if (getUserToken()) {
        config.headers.Authorization = `Bearer ${getUserToken()}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

requestSpotifyLogin.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    return Promise.reject(error)
})

export {requestSpotifyLogin}