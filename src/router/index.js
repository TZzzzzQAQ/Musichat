import {createBrowserRouter} from 'react-router-dom'

import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import Browse from "@/pages/Browse";

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