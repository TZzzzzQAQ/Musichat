import {useEffect, useRef, useState} from 'react';
import {Avatar, Progress} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBackward,
    faForward,
    faList,
    faPause,
    faPlay,
    faVolumeOff,
    faShuffle,
    faSync,
    faSyncAlt
} from "@fortawesome/free-solid-svg-icons";
import {faHeart} from "@fortawesome/free-regular-svg-icons"
import {debounce} from "lodash/function";
import {formatTime, getUserToken} from "@/utils/index.jsx";
import {setActiveDevice} from "@/utils/activeDevice.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getPlaybackStateAPI} from "@/apis/spotifyPlayAPI.jsx";
import {playRepeat, playShuffle} from '../../apis/spotifyPlayAPI';
import {setNowMusic} from "@/store/features/musicSlice.jsx";
import {Popover} from "antd";
import {getUserQueue} from "@/apis/spotifyPlayAPI.jsx";


const iconColor = {color: "#74C0FC"};
const twoColors = {
    '0%': '#108ee9',
    '100%': '#87d068',
};

const PlayBar = () => {
    const [volumePercent, setVolumePercent] = useState(50)
    const [isPlaying, setIsPlaying] = useState(false);
    const nowMusicFromRedux = useSelector(state => state.music.nowMusic);
    const dataFromRedux = useSelector(state => state.user)
    const [player, setPlayer] = useState(undefined);
    const [nowTime, setNowTime] = useState(0)
    const [durationTime, setDurationTime] = useState(0)
    const [rotation, setRotation] = useState(0);
    const [dimensionsVolume, setDimensionsVolume] = useState({width: 0, left: 0})
    const dispatch = useDispatch()

    const progressRef = useRef(null);
    const volumeProgressBar = useRef(null);

    const [repeat, setRepeat] = useState('off')
    const [shuffle, setShuffle] = useState('false')


    const [queuedTracks, setQueuedTracks] = useState([]);

    async function fetchQueuedTracks() {
        try {
            const response = await getUserQueue();
            setQueuedTracks([...new Set(response.queue)]);
        } catch (e) {
            console.log(e)
        }

    }

    function handlePopoverClick() {
        fetchQueuedTracks();
    }

    useEffect(() => {
        setIsPlaying(true);
        if (nowMusicFromRedux?.item?.duration_ms) {
            setDurationTime(nowMusicFromRedux.item.duration_ms);
        }
        setNowTime(0);
    }, [nowMusicFromRedux]);

    // init spotify
    useEffect(() => {
        if (dataFromRedux.profile) {
            window.onSpotifyWebPlaybackSDKReady = () => {
                const player = new window.Spotify.Player({
                    name: 'Web Playback SDK',
                    getOAuthToken: cb => {
                        cb(getUserToken());
                    },
                    volume: 0.5
                });
                setPlayer(player);
                player.addListener('ready', ({device_id}) => {
                    setActiveDevice(device_id)
                });
                player.connect()
                player.addListener('player_state_changed', async (state) => {
                    if (!state) return;
                    const {position} = state;
                    if (position === 0) {
                        setIsPlaying(false);
                        const response = await getPlaybackStateAPI();
                        dispatch(setNowMusic(response));
                    }
                });
            };
        }
    }, []);

    // init timer
    useEffect(() => {
        let intervalId;
        if (isPlaying) {
            intervalId = setInterval(() => {
                setNowTime(prevNowTime => {
                    if (prevNowTime < durationTime - 1000) {
                        return prevNowTime + 1000;
                    } else {
                        clearInterval(intervalId);
                        return durationTime;
                    }
                });
            }, 1000);
        } else {
            if (intervalId) {
                clearInterval(intervalId);
            }
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isPlaying, durationTime]);

    // init volume progressbar
    useEffect(() => {
        if (volumeProgressBar.current) {
            const {width, left} = volumeProgressBar.current.getBoundingClientRect();
            setDimensionsVolume({width, left});
        }
    }, []);

    // init rotate avatar
    useEffect(() => {
        let intervalId;
        if (isPlaying) {
            intervalId = setInterval(() => {
                setRotation((prevRotation) => (prevRotation + 1));
            }, 20);
        } else if (!isPlaying && intervalId) {
            clearInterval(intervalId);
        }
        return () => clearInterval(intervalId);
    }, [isPlaying]);

    const volumeClickHandler = debounce((e) => {
        const clickX = e.clientX;
        const newPercent = ((clickX - dimensionsVolume.left) / dimensionsVolume.width) * 100;
        setVolumePercent(() => newPercent);
        player.setVolume(newPercent / 100).then()
    }, 200)


    const toggleRepeat = debounce(async () => {
        let newRepeatState;
        switch (repeat) {
            case 'off':
                newRepeatState = 'context';
                if (shuffle === 'true') {
                    setShuffle('false');
                    await playShuffle('false');
                }
                break;
            case 'track':
                newRepeatState = 'off';
                break;
            default:
                newRepeatState = 'off';
                break;
        }
        try {
            await playRepeat(newRepeatState);
            setRepeat(newRepeatState);
        } catch (error) {
            console.error('Error setting repeat mode:', error);
        }
    }, 200, {leading: true, trailing: false});


    const toggleShuffle = debounce(async () => {
        let newshuffleState;
        switch (shuffle) {
            case 'true':
                newshuffleState = 'false';
                break;
            case 'false':
                newshuffleState = 'true';
                if (repeat !== 'off') {
                    setRepeat('off');
                    await playRepeat('off');
                }
                break;
            default:
                newshuffleState = 'false';
                break;
        }
        try {
            await playShuffle(newshuffleState);
            setShuffle(newshuffleState);
        } catch (error) {
            console.error('Error setting repeat mode:', error);
        }
    }, 200, {leading: true, trailing: false});


    const play = debounce(async () => {
        await player.togglePlay();
        setIsPlaying(prevState => !prevState)
    }, 200);
    const pause = debounce(async () => {
        await player.togglePlay();
        setIsPlaying(prevState => !prevState)
    }, 200);
    const previousTrack = debounce(async () => {
        await player.previousTrack()
        setTimeout(async () => {
            const response = await getPlaybackStateAPI();
            dispatch(setNowMusic(response));
        }, 1000);
    }, 200)
    const nextTrack = debounce(async () => {
        await player.nextTrack()
        setTimeout(async () => {
            const response = await getPlaybackStateAPI();
            dispatch(setNowMusic(response));
        }, 1000);
    }, 200)
    const handleProgressClick = debounce(async (e) => {
        const progressBar = progressRef.current;
        const clickX = e.clientX - progressBar.getBoundingClientRect().left;
        const progressBarWidth = progressBar.clientWidth;
        const clickPercentage = clickX / progressBarWidth;
        const seekTime = clickPercentage * durationTime;
        console.log(seekTime)
        console.log(durationTime)
        await player.seek(seekTime)
        setNowTime(seekTime);
    }, 200);


    return (
        <div className={'w-full h-full flex justify-between items-center font-poppins'}>
            <div className={'flex items-center justify-center gap-4'}>
                {nowMusicFromRedux?.item?.album?.images[0]?.url &&
                    <Avatar
                        style={{
                            width: '60px',
                            height: '60px',
                            transform: `rotate(${rotation}deg)`,
                            transition: 'transform 0.2s linear',
                            backgroundImage: `url(${nowMusicFromRedux.item.album.images[0].url}`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    />}
                <div className="overflow-hidden w-60 xl:w-72 flex flex-col">
                    <div className={`whitespace-nowrap ${isPlaying ? 'animate-marquee' : ''} text-xl font-bold`}>
                        <span>
                        {nowMusicFromRedux?.item?.name}
                        </span>
                    </div>
                    <span
                        className={'text-base font-bold'}>
                        {nowMusicFromRedux?.item?.artists[0].name}
                    </span>
                </div>
            </div>
            <div className={'h-full flex flex-col'}>
                <div className={'flex items-center justify-center gap-8 text-2xl'}>
                    <FontAwesomeIcon icon={faBackward} style={{...iconColor, cursor: 'pointer'}}
                                     onClick={previousTrack}/>
                    {isPlaying &&
                        <FontAwesomeIcon icon={faPause} style={{...iconColor, cursor: 'pointer'}} onClick={pause}/>}
                    {!isPlaying &&
                        <FontAwesomeIcon icon={faPlay} style={{...iconColor, cursor: 'pointer'}} onClick={play}/>}
                    <FontAwesomeIcon icon={faForward} style={{...iconColor, cursor: 'pointer'}} onClick={nextTrack}/>
                </div>
                <div className={'flex items-center justify-center gap-4'}>
                    <p className={'font-bold w-12'}>{formatTime(nowTime / 1000)}</p>
                    <div
                        className={'w-72 cursor-pointer'}
                        ref={progressRef} onClick={handleProgressClick}
                    >
                        <Progress percent={Math.round(nowTime / durationTime * 100)} strokeColor={twoColors}
                                  showInfo={false}/>
                    </div>
                    <p className={'font-bold w-12'}>{formatTime(durationTime / 1000)}</p>
                </div>
            </div>
            <div className={'flex flex-row mr-4'}>
                <div className={'flex justify-center items-center text-xl xl:text-2xl xl:gap-4 gap-2'}>
                    <FontAwesomeIcon
                        icon={shuffle === 'true' ? faShuffle : faShuffle}
                        style={{...iconColor, cursor: 'pointer'}}
                        onClick={toggleShuffle}
                        pulse={shuffle === 'true'}
                    />
                    <FontAwesomeIcon
                        icon={repeat === 'context' ? faSyncAlt : repeat === 'track' ? faSync : faSync}
                        style={{...iconColor, cursor: 'pointer'}}
                        onClick={toggleRepeat}
                        spin={repeat !== 'off'}
                    />

                    <FontAwesomeIcon icon={faHeart} style={iconColor}/>
                    <Popover
                        trigger="click"
                        placement="topRight"
                        content={() => (
                            <div className="p-4 w-64 h-48 overflow-auto">
                                <h3 className="text-xl font-bold mb-2">Queued Tracks</h3>
                                <ul className="list-disc pl-5">
                                    {queuedTracks?.map((track, index) => (
                                        <li key={index} className="text-sm py-1">
                                            {track.name} - {track.artists[0].name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    >
                        <button onClick={handlePopoverClick}>
                            <FontAwesomeIcon icon={faList} style={iconColor}/>
                        </button>
                    </Popover>
                    <FontAwesomeIcon icon={faVolumeOff} style={iconColor}/>
                    <div
                        className={'w-24 mb-2.5'}
                        onClick={volumeClickHandler}
                        ref={volumeProgressBar}>
                        <Progress
                            percent={volumePercent}
                            strokeColor={twoColors}
                            showInfo={false}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayBar;