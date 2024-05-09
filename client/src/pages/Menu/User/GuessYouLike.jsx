import AuthRoute from "@/components/AuthRoute.jsx";
import {useEffect, useState} from "react";
import {getUserTopItems} from "@/apis/userDataAPI.jsx";
import TrackTable from "@/components/TrackTable.jsx";
import Loading from "@/components/Loading/Loading.jsx";

const GuessYouLike = () => {
    const [searchParams, setSearchParams] = useState({
        type: 'tracks',
        limit: 20,
        offset: 0
    })
    const [playlistData, setPlaylistData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserTopItems(searchParams);
                setPlaylistData(response.items)
            } catch (error) {
                console.error('Error fetching Top Items:', error);
            }
        }
        fetchData();
    }, []);
    return (
        <AuthRoute>
            <div className='overflow-y-auto h-full w-full flex flex-col items-center'>
                <div className={"overflow-x-hidden h-full w-full"}>
                    {playlistData.length > 0 ? <TrackTable playListData={playlistData}/> : <Loading/>}
                </div>
            </div>
        </AuthRoute>
    );
};

export default GuessYouLike;
