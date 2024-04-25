import React, {useEffect} from 'react';
import {RouterProvider} from "react-router-dom";
import router from "@/router";
import getAccessToken from "@/apis/loginForEveryone";
import {getToken, setToken} from "@/utils/token";

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