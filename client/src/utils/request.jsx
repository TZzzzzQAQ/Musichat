import axios from 'axios'
import router from "@/router/index.jsx";
import {getToken, removeToken} from "@/utils/token.jsx";

const request = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use((config) => {
    if (getToken()) {
        config.headers.Authorization = `Bearer ${getToken()}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use((response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
}, (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // if (error.response.status === 401) {
    //     removeToken();
    // }
    return Promise.reject(error)
})

export {request}