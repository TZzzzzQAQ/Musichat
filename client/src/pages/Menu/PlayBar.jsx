import { useEffect, useRef, useState } from 'react';
import { Avatar, Progress, Popover } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBackward,
    faForward,
    faList,
    faPause,
    faPlay,
    faVolumeOff,
    faShuffle,
    faSync
} from '@fortawesome/free-solid-svg-icons';
import { debounce } from 'lodash/function';
import { formatTime, getUserToken } from '@/utils/index.jsx';
import { setActiveDevice } from '@/utils/activeDevice.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getPlaybackStateAPI } from '@/apis/spotifyPlayAPI.jsx';
import { playRepeat, playShuffle } from '@/apis/spotifyPlayAPI';
import { setNowMusic } from '@/store/features/musicSlice.jsx';

const iconColor = { color: '#74C0FC' };
const twoColors = {
    '0%': '#108ee9',
    '100%': '#87d068',
};

const QueuedTracksList = ({ queuedTracks }) => {
    return (
        <div>
            <h3>Queued Tracks</h3>
            <ul>
                {queuedTracks.map((track, index) => (
                    <li key={index}>
                        {track.name} - {track.artists[0].name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const PlayBar = () => {
    const [volumePercent, setVolumePercent] = useState(50);
    const [isPlaying, setIsPlaying] = useState(false);
    const nowMusicFromRedux = useSelector(state => state.music.nowMusic);
    const dataFromRedux = useSelector(state => state.user);
    const [player, setPlayer] = useState(undefined);
    const [nowTime, setNowTime] = useState(0);
    const [durationTime, setDurationTime] = useState(0);
    const [rotation, setRotation] = useState(0);
    const [dimensionsVolume, setDimensionsVolume] = useState({ width: 0, left: 0 });
    const dispatch = useDispatch();

    const progressRef = useRef(null);
    const volumeProgressBar = useRef(null);

    const [repeat, setRepeat] = useState('off');
    const [shuffle, setShuffle] = useState('false');
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);
    const [queuedTracks, setQueuedTracks] = useState([]);

    const handlePopoverVisibleChange = (visible) => {
        setIsPopoverVisible(visible);
    };

    useEffect(() => {
        setIsPlaying(true);
        if (nowMusicFromRedux?.item?.duration_ms) {
            setDurationTime(nowMusicFromRedux.item.duration_ms);
        }
        setNowTime(0);
    }, [nowMusicFromRedux]);

    // Initialize Spotify Web Playback SDK
    useEffect(() => {
        if (dataFromRedux.profile) {
            console.log("no user data")
            window.onSpotifyWebPlaybackSDKReady = () => {
                const player = new window.Spotify.Player({
                    name: 'Web Playback SDK',
                    getOAuthToken: cb => {
                        cb(getUserToken());
                    },
                    volume: 0.5
                });
                setPlayer(player);
                player.addListener('ready', ({ device_id }) => {
                    setActiveDevice(device_id);
                });
                player.connect();
                player.addListener('player_state_changed', async (state) => {
                    if (!state) return;
                    const { position, duration } = state;

                    if (position === 0 && !isPlaying) {
                        const response = await getPlaybackStateAPI();
                        dispatch(setNowMusic(response));
                    }

                    if (repeat === 'track' && position >= duration - 1000) {
                        await player.seek(0);
                        setNowTime(0);
                    }
                });
            };
        }
    }, [dataFromRedux.profile, dispatch, isPlaying, player, repeat]);

    // Initialize timer for track progress
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

    // Initialize volume progress bar dimensions
    useEffect(() => {
        if (volumeProgressBar.current) {
            const { width, left } = volumeProgressBar.current.getBoundingClientRect();
            setDimensionsVolume({ width, left });
        }
    }, []);

    // Initialize rotate avatar
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
        player.setVolume(newPercent / 100).then();
    }, 200);

    const toggleRepeat = debounce(async () => {
        let newRepeatState;
        switch (repeat) {
            case 'off':
                newRepeatState = 'track';
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
    }, 200, { leading: true, trailing: false });

    const toggleShuffle = debounce(async () => {
        let newShuffleState;
        switch (shuffle) {
            case 'true':
                newShuffleState = 'false';
                break;
            case 'false':
                newShuffleState = 'true';
                if (repeat !== 'off') {
                    setRepeat('off');
                    await playRepeat('off');
                }
                break;
            default:
                newShuffleState = 'false';
                break;
        }
        try {
            await playShuffle(newShuffleState);
            setShuffle(newShuffleState);
        } catch (error) {
            console.error('Error setting shuffle mode:', error);
        }
    }, 200, { leading: true, trailing: false });

    const play = debounce(async () => {
        await player.togglePlay();
        setIsPlaying(prevState => !prevState);
    }, 200);

    const pause = debounce(async () => {
        await player.togglePlay();
        setIsPlaying(prevState => !prevState);
    }, 200);

    const previousTrack = debounce(async () => {
        await player.previousTrack();
        setTimeout(async () => {
            const response = await getPlaybackStateAPI();
            dispatch(setNowMusic(response));
        }, 1000);
    }, 200);

    const nextTrack = debounce(async () => {
        if (repeat === 'track') {
            await player.seek(0);
            setNowTime(0);
        } else {
            await player.nextTrack();
            setTimeout(async () => {
                const response = await getPlaybackStateAPI();
                dispatch(setNowMusic(response));
            }, 1000);
        }
    }, 200);

    const handleProgressClick = debounce(async (e) => {
        const progressBar = progressRef.current;
        const clickX = e.clientX - progressBar.getBoundingClientRect().left;
        const progressBarWidth = progressBar.clientWidth;
        const clickPercentage = clickX / progressBarWidth;
        const seekTime = clickPercentage * durationTime;
        await player.seek(seekTime)

        setNowTime(seekTime);
    }, 200);

    const handlePlusClick = async (uri) => {
        try {
            console.log('Adding to queue', uri); // Check URI
            const device = getActiveDevice(); // Ensure device is fetched
            console.log('Device ID:', device); // Log device ID
            await playbackQueue(uri, device); // Call function to add to playback queue
            console.log('Track added to queue'); // Confirm function call
            setQueuedTracks([...queuedTracks, { uri }]); // Update queued tracks state
        } catch (err) {
            console.error('Error adding to queue:', err);
        }
    };

    return (
        <div className={'w-full h-full flex justify-between items-center font-poppins'}>
            <div className={'flex items-center justify-center gap-4'}>
                {nowMusicFromRedux?.item?.album?.images[0]?.url && (
                    <Avatar
                        style={{
                            width: '60px',
                            height: '60px',
                            transform: `rotate(${rotation}deg)`,
                            transition: 'transform 0.2s linear',
                            backgroundImage: `url(${nowMusicFromRedux.item.album.images[0].url})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    />
                )}
                <div className="overflow-hidden w-60 xl:w-72 flex flex-col">
                    <div className={`whitespace-nowrap ${isPlaying ? 'animate-marquee' : ''} text-xl font-bold`}>
                        <span>{nowMusicFromRedux?.item?.name}</span>
                    </div>
                    <span className={'text-base font-bold'}>
                        {nowMusicFromRedux?.item?.artists[0].name}
                    </span>
                </div>
            </div>
            <div className={'h-full flex flex-col'}>
                <div className={'flex items-center justify-center gap-8 text-2xl'}>
                    <FontAwesomeIcon icon={faBackward} style={{ ...iconColor, cursor: 'pointer' }} onClick={previousTrack} />
                    {isPlaying ? (
                        <FontAwesomeIcon icon={faPause} style={{ ...iconColor, cursor: 'pointer' }} onClick={pause} />
                    ) : (
                        <FontAwesomeIcon icon={faPlay} style={{ ...iconColor, cursor: 'pointer' }} onClick={play} />
                    )}
                    <FontAwesomeIcon icon={faForward} style={{ ...iconColor, cursor: 'pointer' }} onClick={nextTrack} />
                </div>
                <div className={'flex items-center justify-center gap-4'}>
                    <p className={'font-bold w-12'}>{formatTime(nowTime / 1000)}</p>
                    <div className={'w-72 cursor-pointer'} ref={progressRef} onClick={handleProgressClick}>
                        <Progress
                            percent={Math.round((nowTime / durationTime) * 100)}
                            strokeColor={twoColors}
                            showInfo={false}
                        />
                    </div>
                    <p className={'font-bold w-12'}>{formatTime(durationTime / 1000)}</p>
                </div>
            </div>
            <div className={'flex flex-row mr-4'}>
                <div className={'flex justify-center items-center text-xl xl:text-2xl xl:gap-4 gap-2'}>
                    <FontAwesomeIcon
                        icon={faShuffle}
                        style={{ ...iconColor, cursor: 'pointer' }}
                        onClick={toggleShuffle}
                        pulse={shuffle === 'true'}
                    />
                    <FontAwesomeIcon
                        icon={faSync}
                        style={{ ...iconColor, cursor: 'pointer' }}
                        onClick={toggleRepeat}
                        pulse={repeat === 'track'}
                    />
                    <Popover
                        content={<QueuedTracksList queuedTracks={queuedTracks} />}
                        trigger="click"
                        visible={isPopoverVisible}
                        onVisibleChange={handlePopoverVisibleChange}
                    >
                        <FontAwesomeIcon icon={faList} style={iconColor} />
                    </Popover>
                    <FontAwesomeIcon icon={faVolumeOff} style={iconColor} />
                    <div className={'w-24 mb-2.5'} onClick={volumeClickHandler} ref={volumeProgressBar}>
                        <Progress percent={volumePercent} strokeColor={twoColors} showInfo={false} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayBar;
