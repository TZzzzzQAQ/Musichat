import axios from "axios";
import {APP_API_URL} from "@/../config.js";

const requestMessage = axios.create({
    baseURL: `${APP_API_URL}message`,
    timeout: 5000
})

requestMessage.interceptors.request.use((config) => {

    return config;
},error =>{
    return Promise.reject(error)
})

requestMessage.interceptors.response.use((response) => {
    return response.data;
},error =>{
    return Promise.reject(error)
})

export {requestMessage}