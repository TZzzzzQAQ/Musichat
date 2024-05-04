import {createBrowserRouter} from 'react-router-dom'

import Browse from "@/pages/Menu/Discover/Browse.jsx";
import Layout from "@/pages/Layout/Layout.jsx";
import Account from "@/pages/Menu/User/Account.jsx";
import Setting from "@/pages/Menu/User/User.jsx";
import Recent from "@/pages/Menu/User/Recent.jsx"
import Favourite from "@/pages/Menu/User/Favourite.jsx"
import Playlist from "@/pages/Menu/User/Playlist.jsx"
import Artist from "@/pages/Menu/Discover/Artist.jsx";
import Album from "@/pages/Menu/Discover/Album.jsx";
import SearchResult from "@/pages/Menu/SearchResult.jsx";
import ChatWithBot from "@/pages/Menu/ChatWithBot.jsx";
import GroupChat from "@/pages/Menu/GroupChat.jsx";
import AlbumDetails from "@/pages/Menu/Discover/AlbumDetails.jsx";
import ArtistDetail from '../pages/Menu/Discover/ArtistDetail';


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
                element: <Album></Album>,
            },
            {
                path: 'album/:id',
                element: <AlbumDetails/>
            },
            {
                path: '/artist',
                element: <Artist />
            },
            {
                path: 'artist/:id',
                element: <ArtistDetail/>
            },
            {
                path: '/searchResult',
                element: <SearchResult/>
            },
            {
                path: '/chatWithBot',
                element: <ChatWithBot/>
            },
            {
                path: '/groupChat',
                element: <GroupChat/>
            }]
    }
], {
    basename: '/Musichat'
})

export default router;