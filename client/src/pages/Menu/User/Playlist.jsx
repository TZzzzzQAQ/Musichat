import {useEffect, useState} from 'react';
import {getPlayListAPI, getPlaylistTracks} from '@/apis/userDataAPI.jsx';
import AuthRoute from "@/components/AuthRoute.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import {getPlaybackStateAPI, playListAPI} from "@/apis/spotifyPlayAPI.jsx";
import {getActiveDevice} from "@/utils/activeDevice.jsx";
import {setNowMusic} from "@/store/features/musicSlice.jsx";
import {useDispatch} from "react-redux";
import Loading from "@/components/Loading/Loading.jsx";
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();

    const handlePlayAndNavigate = (e, playlist) => {
        e.preventDefault(); // Prevent the default navigation behavior
        play(e, playlist.uri); // Play the track
        navigate(`/playlist/${playlist.id}`); // Navigate to the playlist details page
    };

    return (
        <AuthRoute>
            <div className='overflow-y-auto h-full w-full px-4 md:px-10'>
                {playlists.length > 0 ?
                    <div className='grid grid-cols-3 2xl:grid-cols-4 gap-4'>
                        {playlists.map((playlist) => (
                            <div key={playlist.id} onClick={(e) => handlePlayAndNavigate(e, playlist)} className="cursor-pointer">
                                <div
                                    className="bg-white rounded-lg p-5 hover:shadow-2xl hover:bg-cyan-400 transition duration-300 ease-in-out">
                                    <div className={'flex justify-between items-center '}>
                                        <h2 className='text-lg font-bold text-gray-700'>{playlist.name}</h2>
                                        <FontAwesomeIcon className={'text-3xl hover:shadow-2xl'} icon={faPlay}
                                                         style={{...iconColor}} onClick={(e) => play(e, playlist.uri)} />
                                    </div>
                                    <img src={playlist.images[0]?.url} alt={playlist.name}
                                         className="w-52 h-52 rounded-full mx-auto my-3 duration-300 ease-in-out hover:scale-110"/>
                                </div>
                            </div>
                        ))}
                    </div>
                    : <Loading />}
            </div>
        </AuthRoute>
    );
};
export default Playlist;