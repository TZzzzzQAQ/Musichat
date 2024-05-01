import axios from "axios";

const requestSpotifyVerify = axios.create({
    baseURL: "https://accounts.spotify.com/api",
    timeout: 5000
})

requestSpotifyVerify.interceptors.request.use((config) => {
    config.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
    return config;
}, error => {
    return Promise.reject(error);
})

requestSpotifyVerify.interceptors.response.use((response) => {
    return response.data;
}, error => {
    return Promise.reject(error);
})

export {
    requestSpotifyVerify
}