import AuthRoute from "@/components/AuthRoute.jsx";
import {useEffect, useState} from "react";
import {getRecentPlaylistsAPI} from "@/apis/userDataAPI.jsx";

const Recent = () => {

    const [searchParams] = useState({
        limit: 50,
        after: Date.now()
    })
    const [recentPlaylist, setRecentPlaylist] = useState({})
    useEffect(() => {
        const fetchRecentPlaylist = async () => {
            try {
                const response = await getRecentPlaylistsAPI(searchParams);
                setRecentPlaylist(response.items)
            } catch (error) {
                console.log(error)
            }
        }
        fetchRecentPlaylist();
    }, []);
    return (
        <AuthRoute>
            <div>
                {JSON.stringify(recentPlaylist)}
            </div>
        </AuthRoute>
    );
};

export default Recent;
