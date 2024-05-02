import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import TrackList from "@/components/TrackList.jsx";
import {getTopTracksAPI} from "@/apis/everyoneDataAPI.jsx";


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
            <table className={'min-w-full leading-normal'}>
                <thead>
                <tr>
                    <th className={"px-5 py-3 border-b-2 border-gray-200 text-left text-xl font-poppins text-gray-600 uppercase tracking-wider w-96"}>Top
                        Tracks
                    </th>
                    <th className={'px-5 py-3 border-b-2 border-gray-200 text-left text-xl font-poppins text-gray-600 uppercase tracking-wider'}>Singer</th>
                    <th className={'px-5 py-3 border-b-2 border-gray-200 text-left text-xl font-poppins text-gray-600 uppercase tracking-wider w-36'}>Duration</th>
                </tr>
                </thead>
                <tbody>
                {tracks.map((item) => (
                    <TrackList data={item} key={item.id}/>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ArtistDetail;
