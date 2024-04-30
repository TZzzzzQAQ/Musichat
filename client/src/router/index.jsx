import {createBrowserRouter} from 'react-router-dom'

import Browse from "@/pages/Menu/Discover/Browse.jsx";
import Layout from "@/pages/Layout/Layout.jsx";
import Account from "@/pages/Menu/User/Account.jsx";
import Setting from "@/pages/Menu/User/User.jsx";
import Recent from "@/pages/Menu/Library/Recent.jsx"
import Favourite from "@/pages/Menu/Library/Favourite.jsx"
import Playlist from "@/pages/Menu/Library/Playlist.jsx"
import Artist from "@/pages/Menu/Discover/Artist.jsx";
import Album from "@/pages/Menu/Discover/Album.jsx";
import SearchResult from "@/pages/Menu/SearchResult.jsx";
import ChatWithBot from "@/pages/Menu/ChatWithBot.jsx";
import AlbumDetails from "@/pages/Menu/Discover/AlbumDetails.jsx";
import Albums from "@/pages/Menu/Discover/Albums.jsx";


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
                element: <Albums></Albums>,
                children: [
                    {
                        index: true,
                        element: <Album></Album>},
                    {
                        path: ':id',
                        element: <AlbumDetails/>
                    }
                ]
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
                path: '/chatWithBot',
                element: <ChatWithBot/>
            }]
    }
], {
    basename: '/Musichat'
})

export default router;