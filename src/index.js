import React from 'react'
import ReactDOM from 'react-dom/client'
import "normalize.css"
import './index.scss'
import {Provider} from 'react-redux';
import {store} from "@/store/store";
import App from "@/app";

ReactDOM.createRoot(document.getElementById('root')).render
(
    <Provider store={store}>
        <App/>
    </Provider>
)