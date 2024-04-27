import React from 'react'
import ReactDOM from 'react-dom/client'
// import "normalize.css"
import './index.scss'
import {Provider} from 'react-redux';
import {store} from "@/store/store.jsx";
import App from "@/app.jsx";
// import dotenv from 'dotenv';
// dotenv.config();

ReactDOM.createRoot(document.getElementById('root')).render
(
    <Provider store={store}>
        <App/>
    </Provider>
)