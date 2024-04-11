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
import SearchResult from "@/pages/SearchResult";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '/home',
                element: <Browse></Browse>
            },
            {
                path: '/account',
                element: <Account></Account>
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
            },
            {
                path: '/searchResult',
                element: <SearchResult/>
            }]
    }
],{
    basename:'/Musichat'
})

export default router;