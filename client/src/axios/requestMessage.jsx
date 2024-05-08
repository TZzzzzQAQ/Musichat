import axios from "axios";

const requestMessage = axios.create({
    baseURL: 'http://localhost:3000/message',
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