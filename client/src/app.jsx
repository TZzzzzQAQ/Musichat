import React, {useEffect} from 'react';
import {RouterProvider} from "react-router-dom";
import router from "@/router/index.jsx";
import getAccessToken from "@/apis/loginForEveryone.jsx";
import {setToken} from "@/utils/token.jsx";

const App = () => {
    useEffect(() => {
        getAccessToken().then(data => {
            setToken(data);
        });
    }, []);
    return (
        <div className={'overflow-hidden'}>
            <RouterProvider router={router}/>
        </div>
    );
};

export default App;