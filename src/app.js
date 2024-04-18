import React from 'react';
import {RouterProvider} from "react-router-dom";
import router from "@/router";

const App = () => {
    return (
        <div className={'overflow-hidden'}>
            <RouterProvider router={router}/>
        </div>
    );
};

export default App;