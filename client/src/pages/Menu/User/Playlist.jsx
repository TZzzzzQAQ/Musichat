import {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {getPlayListAPI, getPlaylistTracks} from '@/apis/userDataAPI.jsx';

const Playlist = () => {
    const [playlists, setPlaylists] = useState([]);
    const [searchParams] = useState({limit: 50, offset: 0});

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await getPlayListAPI(searchParams);
                const playlistsWithTracks = await Promise.all(
                    response.items.map(async (playlist) => {
                        const tracksResponse = await getPlaylistTracks(playlist.id);
                        const tracks = tracksResponse.items
                            ? tracksResponse.items.map((item) => ({
                                name: item.track.name,
                                artists: item.track.artists,
                                duration_ms: item.track.duration_ms,
                                uri: item.track.uri,
                            }))
                            : [];
                        return {...playlist, tracks};
                    })
                );
                setPlaylists(playlistsWithTracks);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPlaylists();
    }, []);

    return (
        <div className='overflow-y-auto h-full'>
            <h1 className="text-3xl font-poppins font-bold mb-4">Your Playlists</h1>
            {playlists.length > 0 ? (
                <div className={'mb-8'}>
                    {playlists.map((playlist) => (
                        <div key={playlist.id}>
                            <h2 className='text-lg font-poppins font-bold'>{playlist.name}</h2>
                            <img src={playlist.images[0]?.url} alt={playlist.name}
                                 style={{width: '200px', height: '200px'}}/>
                            <NavLink to={`/playlist/${playlist.id}`} className='text-lg font-poppins no-underline'>
                                More...
                            </NavLink>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-xl font-poppins text-center py-10">Loading playlists...</div>
            )}
        </div>
    );
};

// Helper function to convert milliseconds to minutes and seconds format
function millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export default Playlist;