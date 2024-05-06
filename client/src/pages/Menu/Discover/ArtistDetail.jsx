import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getTopTracksAPI} from "@/apis/everyoneDataAPI.jsx";
import TrackTable from "@/components/TrackTable.jsx";


const ArtistDetail = () => {
    const {id} = useParams();
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
            const fetchTopAlbum = async () => {
                try {
                    const response = await getTopTracksAPI(id);
                    setTracks(response.tracks);
                } catch (error) {
                    console.error('Error fetching album:', error);
                }
            };
            fetchTopAlbum();
        },
        [id]);

    return (
        <div className='overflow-y-auto h-full flex flex-col items-center'>
            <TrackTable playListData={tracks}/>
        </div>
    );
};

export default ArtistDetail;
