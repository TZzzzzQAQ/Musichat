import AuthRoute from "@/components/AuthRoute.jsx";
import {useEffect, useState} from "react";
import {getPlaylistTracks} from "@/apis/userDataAPI.jsx";
import {useParams} from 'react-router-dom';
import TrackTable from "@/components/TrackTable.jsx";

const Playlist = () => {
    const [playListData, setPlayListData] = useState([]);
    const {id} = useParams();

    useEffect(() => {
            const fetchPlaylist = async () => {
                try {
                    let response = await getPlaylistTracks(id);
                    response = response.items.flatMap(item => {
                        return item.track
                    })
                    setPlayListData(response);
                } catch (error) {
                    console.error('Error fetching Playlist:', error);
                }
            };
            fetchPlaylist();
        },
        [id]);

    return (
        <AuthRoute>
            <div className='overflow-y-auto h-full w-full flex flex-col items-center'>
                <div className={"overflow-x-hidden h-full w-full"}>
                    <TrackTable playListData={playListData}/>
                </div>
            </div>
        </AuthRoute>
    );
};

export default Playlist;