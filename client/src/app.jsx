import {useEffect} from 'react';
import {RouterProvider} from "react-router-dom";
import router from "@/router/index.jsx";
import {setEveryoneToken} from "@/utils/tokenForEveryone.jsx";
import {getEveryoneTokenAPI} from "@/apis/getEveryoneTokenAPI.jsx";
import {setActiveDevice} from "@/utils/activeDevice.jsx";
import {getActiveDeviceAPI} from "@/apis/spotifyPlayAPI.jsx";

const App = () => {
    useEffect(() => {
        getEveryoneTokenAPI().then(data => {
            setEveryoneToken(data);
        })
        getActiveDeviceAPI().then((data) => {
            setActiveDevice(data.devices[0].id)
        })
    }, []);
    return (
        <div className={'overflow-hidden'}>
            <RouterProvider router={router}/>
        </div>
    );
};

export default App;