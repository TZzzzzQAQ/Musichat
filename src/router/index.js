import {createBrowserRouter} from 'react-router-dom'

import Login from '@/pages/Login'
import Browse from "@/pages/Browse";
import Layout from "@/pages/Layout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [{
            path: '/Browse',
            element: <Browse></Browse>
        }]
    },
    {
        path: '/login',
        element: <Login/>,
    },
])

export default router;