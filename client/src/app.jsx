import {useEffect} from 'react';
import {RouterProvider} from "react-router-dom";
import router from "@/router/index.jsx";
import {setEveryoneToken} from "@/utils/tokenForEveryone.jsx";
import {getEveryoneTokenAPI} from "@/apis/accountsApi.jsx";

const App = () => {
    useEffect(() => {
        getEveryoneTokenAPI().then(data => {
            setEveryoneToken(data);
        });
    }, []);
    return (
        <div className={'overflow-hidden'}>
            <RouterProvider router={router}/>
        </div>
    );
};

export default App;