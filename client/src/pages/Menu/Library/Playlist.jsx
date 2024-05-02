import AuthRoute from "@/components/AuthRoute.jsx";
import {useEffect, useState} from "react";
import {playListAPI} from "@/apis/userDataAPI.jsx";

const Playlist = () => {
    const [searchParams, setSearchParams] = useState({
        limit: 10,
        offset: 0
    })
    const [playListData, setPlayListData] = useState({})
    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const response = await playListAPI(searchParams);
                setPlayListData(JSON.stringify(response))
            } catch (error) {
                console.log(error)
            } finally {

            }

        }
        fetchPlaylist();
    }, []);
    return (
        <AuthRoute>
            <div>

            </div>
        </AuthRoute>
    );
};

export default Playlist;
