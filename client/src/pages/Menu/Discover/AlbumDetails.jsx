import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import TrackList from "@/components/TrackList.jsx";
import {getAlbumsFromIDAPI} from "@/apis/everyoneDataAPI.jsx";
import TrackTable from "@/components/TrackTable.jsx";


const AlbumDetails = () => {
    const {id} = useParams();
    const [album, setAlbum] = useState({});
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
            const fetchAlbum = async () => {
                try {
                    const response = await getAlbumsFromIDAPI(id);
                    setAlbum(response);
                    setTracks(response.tracks.items);
                } catch (error) {
                    console.error('Error fetching album:', error);
                }
            };
            fetchAlbum();
        },
        [id]);
    
    return (
        <div className='overflow-y-auto h-full flex flex-col items-center'>
            <h1 className='text-center pt-4 text-3xl font-poppins font-bold'>{album.name}</h1>
            <img src={album.images && album.images[0].url} alt={album.name} className='h-[200px]'/>
            <TrackTable playListData={tracks}/>
            <button className='text-center pt-4 text-3xl font-poppins font-bold' onClick={sendMessage}>Tell me something
                about {artist}</button>
            <div>
                {bot}
            </div>
        </div>
    );
};

export default AlbumDetails;
