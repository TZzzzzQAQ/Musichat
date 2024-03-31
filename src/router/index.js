import {createBrowserRouter} from 'react-router-dom'

import Browse from "src/pages/Discover/Browse";
import Layout from "@/pages/Layout";
import Account from "@/pages/User/Account";
import Setting from "@/pages/User/Setting";
import Recent from "@/pages/Library/Recent";
import Favourite from "@/pages/Library/Favourite";
import Playlist from "@/pages/Library/Playlist";
import Artist from "@/pages/Discover/Artist";
import Album from "@/pages/Discover/Album";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '/home',
                element: <Browse></Browse> //This is Home!
            },
            {
                path: '/account',
                element: <Account></Account> //This is Home!
            },
            {
                path: '/setting',
                element: <Setting></Setting>
            },
            {
                path: '/recent',
                element: <Recent></Recent>
            },
            {
                path: '/favourite',
                element: <Favourite></Favourite>
            },
            {
                path: '/playlist',
                element: <Playlist></Playlist>
            },
            {
                path: '/album',
                element: <Album></Album>
            },
            {
                path: '/artist',
                element: <Artist></Artist>
            }]
    }
])

export default router;