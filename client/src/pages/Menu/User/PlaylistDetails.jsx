import AuthRoute from "@/components/AuthRoute.jsx";
import {useEffect, useState} from "react";
import {getPlaylistTracks} from "@/apis/userDataAPI.jsx";
import TrackList from "@/components/TrackList.jsx";
import {useParams} from 'react-router-dom';

const Playlist = () => {
    const [playListData, setPlayListData] = useState([]);
    const {id} = useParams();

    useEffect(() => {
            const fetchPlaylist = async () => {
                try {
                    console.log('Playlist ID from URL:', id);
                    let response = await getPlaylistTracks(id);
                    response=response.items.flatMap(item => {
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
            <div className='overflow-y-auto h-full flex flex-col items-center'>
                <div>
                    {/*<h1 className='text-center pt-4 text-3xl font-poppins font-bold'>{playListData[0]?.name}</h1>*/}
                    {/*<img src={playListData[0]?.images[0]?.url} alt={playListData[0]?.name} className='h-[200px]'/>*/}
                    <table className={'min-w-full leading-normal'}>
                        <thead>
                        <tr>
                            <th className={"px-5 py-3 border-b-2 border-gray-200 text-left text-xl font-poppins text-gray-600 uppercase tracking-wider w-96"}>Track</th>
                            <th className={'px-5 py-3 border-b-2 border-gray-200 text-left text-xl font-poppins text-gray-600 uppercase tracking-wider'}>Singer</th>
                            <th className={'px-5 py-3 border-b-2 border-gray-200 text-left text-xl font-poppins text-gray-600 uppercase tracking-wider w-36'}>Duration</th>
                        </tr>
                        </thead>
                        <tbody>
                        {playListData.map((item) => (
                            <TrackList data={item} key={item.uri}/>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthRoute>
    );
};

// Helper function to convert milliseconds to minutes and seconds format
function millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export default Playlist;