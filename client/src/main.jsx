import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import {Provider} from 'react-redux';
import {store} from "@/store/store.jsx";
import App from "@/app.jsx";

ReactDOM.createRoot(document.getElementById('root')).render
(
    <Provider store={store}>
        <App/>
    </Provider>
)