import React from 'react'
import ReactDOM from 'react-dom/client'
import "normalize.css"
import './index.scss'
import {Provider} from 'react-redux';
import {store} from "@/store/store";
import App from "@/app";
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';

library.add(fas, far, fab);


ReactDOM.createRoot(document.getElementById('root')).render
(
    <Provider store={store}>
        <App/>
    </Provider>
)