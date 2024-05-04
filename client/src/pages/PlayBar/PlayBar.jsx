import {useEffect, useRef, useState} from 'react';
import {Avatar, Progress} from "antd";
import {
    UserOutlined
} from "@ant-design/icons";
import './index.scss';
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
    const progressRef = useRef(null);
    const volumeProgressBar = useRef(null);
    const [rotation, setRotation] = useState(0);

    const [dimensionsVolume, setDimensionsVolume] = useState({width: 0, left: 0})
    useEffect(() => {
        setIsPlaying(true)
        if (nowMusicFromRedux?.item?.duration_ms) {
            setDurationTime(nowMusicFromRedux.item.duration_ms);
        }
        // 重置当前时间
        setNowTime(1000);
        // 创建一个定时器每秒更新当前时间
        const intervalId = setInterval(() => {
            setNowTime(prevNowTime => {
                // 检查是否已经超过总时长
                if (prevNowTime < durationTime) {
                    return prevNowTime + 1000; // 每次增加1000毫秒
                } else {
                    clearInterval(intervalId); // 停止定时器
                    return prevNowTime; // 保持当前时间不变
                }
            });
        }, 1000);  // 每1000毫秒更新一次
        // 清理函数
        return () => clearInterval(intervalId);
    }, [nowMusicFromRedux, durationTime]);

    useEffect(() => {
        if (volumeProgressBar.current) {
            const {width, left} = volumeProgressBar.current.getBoundingClientRect();
            // 更新状态
            setDimensionsVolume({width, left});
        }
    }, []); // 空依赖数组意味着这个 effect 只在组件挂载时执行 空依赖数组意味着这个 effect 只在组件挂载时执行

    useEffect(() => {
        let intervalId;
        if (isPlaying) {
            // 当音乐播放时，每隔一段时间更新旋转角度
            intervalId = setInterval(() => {
                setRotation((prevRotation) => (prevRotation + 1));
            }, 20); // 每20ms旋转1度
        } else if (!isPlaying && intervalId) {
            // 当音乐暂停时，清除定时器停止旋转
            clearInterval(intervalId);
        }
        return () => clearInterval(intervalId); // 清理函数
    }, [isPlaying]);

    useEffect(() => {
        changeVolume(volumePercent / 100)
    }, [volumePercent]);

    const volumeClickHandler = debounce((e) => {
        const clickX = e.clientX; // 获取点击的X坐标
        const newPercent = ((clickX - dimensionsVolume.left) / dimensionsVolume.width) * 100; // 计算新的进度百分比
        setVolumePercent(() => newPercent); // 更新进度
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
    const changeVolume = () => {

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
                console.log('Ready with Device ID', device_id);
                setActiveDevice(device_id)
            });
            player.connect();
        };
    }, []);

    return (
        <div className={'playBar'}>
            <div className={'songDetails'}>
                <Avatar
                    style={{
                        width: '60px',
                        height: '60px',
                        transform: `rotate(${rotation}deg)`, // 应用旋转角度
                        transition: 'transform 0.2s linear', // 平滑旋转效果
                        backgroundImage: `url(${nowMusicFromRedux?.item?.album?.images[2]?.url}`,
                        backgroundSize: 'cover', // 确保背景图像覆盖整个元素
                        backgroundPosition: 'center', // 确保图片以其中心为中心显示
                        backgroundRepeat: 'no-repeat' // 防止背景图像重复
                    }}
                />
                <div className={'singerDetails overflow-hidden max-w-28'}>
                    <span>{nowMusicFromRedux?.item?.name}</span>
                    <span>{nowMusicFromRedux?.item?.artists[0].name}</span>
                </div>
            </div>
            <div className={'musicControlBar'}>
                <div className={'icons'}>
                    <FontAwesomeIcon icon={faShuffle} style={{...iconColor, cursor: 'pointer'}}/>
                    <FontAwesomeIcon icon={faBackward} style={{...iconColor, cursor: 'pointer'}}/>
                    {isPlaying &&
                        <FontAwesomeIcon icon={faPause} style={{...iconColor, cursor: 'pointer'}} onClick={pause}/>}
                    {!isPlaying &&
                        <FontAwesomeIcon icon={faPlay} style={{...iconColor, cursor: 'pointer'}} onClick={play}/>}
                    <FontAwesomeIcon icon={faForward} style={{...iconColor, cursor: 'pointer'}}/>
                    <FontAwesomeIcon icon={faArrowsRotate} style={{...iconColor, cursor: 'pointer'}}/>
                </div>
                <div className={'progressBar'}>
                    <p>{formatTime(nowTime / 1000)}</p>
                    <div
                        style={{cursor: 'pointer'}}
                        ref={progressRef}
                    >
                        <Progress percent={Math.round(nowTime / durationTime * 100)} strokeColor={twoColors}
                                  showInfo={false}/>
                    </div>
                    <p>{formatTime(durationTime / 1000)}</p>
                </div>
            </div>
            <div className={'extendControlBar'}>
                <div className={'icons'}>
                    <FontAwesomeIcon icon={faHeart} style={iconColor}/>
                    <FontAwesomeIcon icon={faVolumeOff} style={iconColor}/>
                    <div
                        onClick={volumeClickHandler}
                        ref={volumeProgressBar}>
                        <Progress
                            percent={volumePercent}
                            strokeColor={twoColors}
                            showInfo={false}/>
                    </div>
                    <FontAwesomeIcon icon={faList} style={iconColor}/>
                </div>
            </div>
        </div>
    );
};

export default PlayBar;
