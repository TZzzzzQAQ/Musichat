import axios from 'axios'
import {getEveryoneToken} from "@/utils/tokenForEveryone.jsx";

const requestSpotifyCommon = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    timeout: 5000
})

// 添加请求拦截器
requestSpotifyCommon.interceptors.request.use((config) => {
    if (getEveryoneToken()) {
        config.headers.Authorization = `Bearer ${getEveryoneToken()}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

// 添加响应拦截器
requestSpotifyCommon.interceptors.response.use((response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
}, (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
})

export {requestSpotifyCommon}