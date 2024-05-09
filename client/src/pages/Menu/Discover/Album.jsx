import {useEffect, useState} from 'react';
import ImageCard from '@/components/ImageCard.jsx';
import {NavLink} from 'react-router-dom';
import {getNewReleasesAPI} from "@/apis/everyoneDataAPI.jsx";

// Define the PlaylistPage component
const PlaylistPage = () => {
    // Initialize the playlist state and search parameters state using the useState hook
    const [playlist, setPlaylist] = useState([]);
    const [searchParams] = useState({
        type: 'Playlist',
        limit: 10,
        market: 'nz'
    })
    // Use the useEffect hook to handle the API request to fetch new release playlists data
    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await getNewReleasesAPI(searchParams)
                setPlaylist(response.albums.items);
            } catch (error) {
                console.error('Error fetching playlists:', error);
            }
        };
        fetchPlaylists();
    }, [searchParams]);

    // JSX structure returned by the component
    return (
        <div className='overflow-y-auto h-full'>
            <h1 className="text-3xl font-poppins font-bold mb-4">New Releases</h1>
            <p className="text-lg font-poppins mb-4 text-black">Select a region:</p>
            {playlist.length > 0 ? (
                <div className={'mb-8'}>
                    {playlist.map((playlist) => (
                        <div className='flex' key={playlist.id}>
                            <ImageCard data={playlist} artist={false} showname={false}/>
                            <div className='ml-4 mt-10'>
                                <h2 className='text-lg font-poppins font-bold'>{playlist.name}</h2>
                                <p className='text-lg font-poppins'>{playlist.artists[0].name}</p>
                                <p className='text-lg font-poppins'>{playlist.release_date}</p>
                                <NavLink to={`/playlist/${playlist.id}`} className='text-xl font-poppins '>
                                    More...
                                </NavLink>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-xl font-poppins text-center py-10">
                    {searchParams.market ? 'No playlists found.' : 'Loading playlists...'}
                </div>
            )}
        </div>
    );
};

// Export the PlaylistPage component
export default PlaylistPage;
