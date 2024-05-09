import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getAlbumsFromIDAPI} from "@/apis/everyoneDataAPI.jsx";
import TrackTable from "@/components/TrackTable.jsx";

// Component to display details of a specific album
const AlbumDetails = () => {
    const {id} = useParams(); // Retrieve the album ID from the URL parameters
    const [album, setAlbum] = useState({}); // State to store album details
    const [tracks, setTracks] = useState([]); // State to store list of tracks in the album

    // Effect hook to fetch album details when the component mounts or the album ID changes
    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const response = await getAlbumsFromIDAPI(id); // API call to fetch album details
                setAlbum(response); // Set album details to state
                setTracks(response.tracks.items); // Set tracks of the album to state
            } catch (error) {
                console.error('Error fetching album:', error); // Log error if API call fails
            }
        };
        fetchAlbum();
    }, [id]); // Dependency array with `id`, re-run the effect if `id` changes

    // Render the album details and track table
    return (
        <div className='overflow-y-auto h-full flex flex-col items-center'>
            <h1 className='text-center pt-4 text-3xl font-poppins font-bold'>{album.name}</h1> {/* Display album name */}
            <img src={album.images && album.images[0].url} alt={album.name}
                 className='h-[200px]'/> {/* Display album cover image */}
            <TrackTable playListData={tracks}/> {/* Component to display list of tracks */}
        </div>
    );
};

export default AlbumDetails;
