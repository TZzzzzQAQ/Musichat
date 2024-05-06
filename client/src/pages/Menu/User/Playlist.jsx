import {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {getPlayListAPI, getPlaylistTracks} from '@/apis/userDataAPI.jsx';
import AuthRoute from "@/components/AuthRoute.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import {getPlaybackStateAPI, playListAPI} from "@/apis/spotifyPlayAPI.jsx";
import {getActiveDevice} from "@/utils/activeDevice.jsx";
import {setNowMusic} from "@/store/features/musicSlice.jsx";
import {useDispatch} from "react-redux";

const iconColor = {color: "#00FFA7"};

const Playlist = () => {
    const [playlists, setPlaylists] = useState([]);
    const [searchParams] = useState({limit: 50, offset: 0});
    const dispatch = useDispatch();
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
    const play = async (e, uri) => {
        e.preventDefault()
        await playListAPI(getActiveDevice(), {
            context_uri: uri,
            offset: {position: 0},
            position_ms: 0
        })
        setTimeout(async () => {
            const response = await getPlaybackStateAPI();
            dispatch(setNowMusic(response));
        }, 1000);
    }
    return (
        <AuthRoute>
            <div className='overflow-y-auto h-full w-full px-4 md:px-10'>
                <h1 className="text-3xl font-bold mb-4 text-gray-800">Your Playlists</h1>
                <div className='grid grid-cols-3 2xl:grid-cols-4 gap-4'>
                    {playlists.length > 0 ? (
                        playlists.map((playlist) => (
                            <NavLink key={playlist.id} to={`/playlist/${playlist.id}`}>
                                <div
                                    className="bg-white rounded-lg p-5 hover:shadow-2xl hover:bg-cyan-400 transition duration-300 ease-in-out">
                                    <div className={'flex justify-between items-center'}>
                                        <h2 className='text-lg font-bold text-gray-700'>{playlist.name}</h2>
                                        <FontAwesomeIcon className={'text-3xl hover:shadow-2xl'} icon={faPlay}
                                                         style={{...iconColor}}
                                                         onClick={(e) => play(e, playlist.uri)}/>
                                    </div>
                                    <img src={playlist.images[0]?.url} alt={playlist.name}
                                         className="w-52 h-52 rounded-full mx-auto my-3"/>
                                </div>
                            </NavLink>
                        ))
                    ) : (
                        <div className="text-xl text-gray-600 text-center py-10">Loading playlists...</div>
                    )}
                </div>
            </div>
        </AuthRoute>
    );
};

export default Playlist;