import {createBrowserRouter} from 'react-router-dom'

import Browse from "@/pages/Menu/Discover/Browse";
import Layout from "@/pages/Layout";
import Account from "@/pages/Menu/User/Account";
import Setting from "@/pages/Menu/User/Setting";
import Recent from "@/pages/Menu/Library/Recent"
import Favourite from "@/pages/Menu/Library/Favourite"
import Playlist from "@/pages/Menu/Library/Playlist"
import Artist from "@/pages/Menu/Discover/Artist";
import Album from "@/pages/Menu/Discover/Album";
import SearchResult from "src/pages/Menu/SearchResult";
import ChatRoom from "@/pages/Menu/ChatRoom";

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
            },
            {
                path: '/chatRoom',
                element: <ChatRoom/>
            }]
    }
], {
    basename: '/Musichat'
})

export default router;