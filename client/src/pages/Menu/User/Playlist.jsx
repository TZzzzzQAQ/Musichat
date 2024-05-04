import AuthRoute from "@/components/AuthRoute.jsx";
import {useEffect, useState} from "react";
import {playListAPI} from "@/apis/userDataAPI.jsx";

const Playlist = () => {
    const [searchParams] = useState({
        limit: 50,
        offset: 0
    })
    const [playListData, setPlayListData] = useState({})
    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const response = await playListAPI(searchParams);
                setPlayListData(response.items)
            } catch (error) {
                console.log(error)
            }
        }
        fetchPlaylist();
    }, []);
    return (
        <AuthRoute>
            {JSON.stringify(playListData)}
        </AuthRoute>
    );
};

export default Playlist;
