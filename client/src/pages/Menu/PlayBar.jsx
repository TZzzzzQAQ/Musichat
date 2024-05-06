import {useEffect, useRef, useState} from 'react';
import {Avatar, Progress} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowsRotate,
    faBackward,
    faForward,
    faList,
    faPause, faPlay,
    faShuffle,
    faVolumeOff
} from "@fortawesome/free-solid-svg-icons";
import {faHeart} from "@fortawesome/free-regular-svg-icons"
import {debounce} from "lodash/function";
import {formatTime, getUserToken} from "@/utils/index.jsx";
import {setActiveDevice} from "@/utils/activeDevice.jsx";
import {useSelector} from "react-redux";

const iconColor = {color: "#74C0FC"};
const twoColors = {
    '0%': '#108ee9',
    '100%': '#87d068',
};

const PlayBar = () => {
    const [volumePercent, setVolumePercent] = useState(50)
    const [isPlaying, setIsPlaying] = useState(false);
    const nowMusicFromRedux = useSelector(state => state.music.nowMusic);
    const [player, setPlayer] = useState(undefined);
    const [nowTime, setNowTime] = useState(0)
    const [durationTime, setDurationTime] = useState(0)
    const [rotation, setRotation] = useState(0);
    const [dimensionsVolume, setDimensionsVolume] = useState({width: 0, left: 0})
    const progressRef = useRef(null);
    const volumeProgressBar = useRef(null);

    useEffect(() => {
        setIsPlaying(true)
        if (nowMusicFromRedux?.item?.duration_ms) {
            setDurationTime(nowMusicFromRedux.item.duration_ms);
        }
        setNowTime(0);
        const intervalId = setInterval(() => {
            setNowTime(prevNowTime => {
                if (prevNowTime < durationTime - 500) {
                    return prevNowTime + 1000;
                } else {
                    clearInterval(intervalId);
                    return prevNowTime;
                }
            });
        }, 1000);
        return () => clearInterval(intervalId);
    }, [nowMusicFromRedux, durationTime]);

    useEffect(() => {
        if (volumeProgressBar.current) {
            const {width, left} = volumeProgressBar.current.getBoundingClientRect();
            setDimensionsVolume({width, left});
        }
    }, []);

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
        player.setVolume(newPercent / 100)
    })

    const play = () => {
        player.togglePlay();
        setIsPlaying(prevState => !prevState)
    };
    const pause = () => {
        player.togglePlay();
        setIsPlaying(prevState => !prevState)
    };

    useEffect(() => {
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
            player.connect();
        };
    }, []);

    return (
        <div className={'w-full h-full flex justify-between items-center font-poppins'}>
            <div className={'flex items-center justify-center gap-4'}>
                <Avatar
                    style={{
                        width: '60px',
                        height: '60px',
                        transform: `rotate(${rotation}deg)`,
                        transition: 'transform 0.2s linear',
                        backgroundImage: `url(${nowMusicFromRedux?.item?.album?.images[2]?.url}`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                />
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
                    <FontAwesomeIcon icon={faBackward} style={{...iconColor, cursor: 'pointer'}}/>
                    {isPlaying &&
                        <FontAwesomeIcon icon={faPause} style={{...iconColor, cursor: 'pointer'}} onClick={pause}/>}
                    {!isPlaying &&
                        <FontAwesomeIcon icon={faPlay} style={{...iconColor, cursor: 'pointer'}} onClick={play}/>}
                    <FontAwesomeIcon icon={faForward} style={{...iconColor, cursor: 'pointer'}}/>
                </div>
                <div className={'flex items-center justify-center gap-4'}>
                    <p className={'font-bold w-12'}>{formatTime(nowTime / 1000)}</p>
                    <div
                        className={'w-72 cursor-pointer'}
                        ref={progressRef}
                    >
                        <Progress percent={Math.round(nowTime / durationTime * 100)} strokeColor={twoColors}
                                  showInfo={false}/>
                    </div>
                    <p className={'font-bold w-12'}>{formatTime(durationTime / 1000)}</p>
                </div>
            </div>
            <div className={'flex flex-row mr-4'}>
                <div className={'flex justify-center items-center text-xl xl:text-2xl xl:gap-4 gap-2'}>
                    <FontAwesomeIcon icon={faShuffle} style={{...iconColor, cursor: 'pointer'}}/>
                    <FontAwesomeIcon icon={faArrowsRotate} style={{...iconColor, cursor: 'pointer'}}/>
                    <FontAwesomeIcon icon={faHeart} style={iconColor}/>
                    <FontAwesomeIcon icon={faList} style={iconColor}/>
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
