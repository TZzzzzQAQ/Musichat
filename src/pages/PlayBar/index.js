import React, {useEffect, useRef, useState} from 'react';
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
import src from '@/assets/stay with me.mp3'
import {formatTime} from "@/utils";

const iconColor = {color: "#74C0FC"};
const twoColors = {
    '0%': '#108ee9',
    '100%': '#87d068',
};
const PlayBar = () => {
    const [percent, setPercent] = useState(0); // 初始进度为0
    const [volumePercent, setVolumePercent] = useState(40)
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentMusicTime, setCurrentMusicTime] = useState(0)
    const [durationMusicTime, setDurationMusicTime] = useState(0)
    const progressRef = useRef(null);
    const volumeProgressBar = useRef(null);
    const [rotation, setRotation] = useState(0);
    // 定义状态来存储宽度和左边距
    const [dimensions, setDimensions] = useState({width: 0, left: 0});
    const [dimensionsVolume, setDimensionsVolume] = useState({width: 0, left: 0})

    useEffect(() => {
        if (progressRef.current) {
            const {width, left} = progressRef.current.getBoundingClientRect();
            // 更新状态
            setDimensions({width, left});
        }
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

        setVolumePercent(prevState => prevState = newPercent); // 更新进度
    })
    const musicClickHandler = debounce((e) => {
        const clickX = e.clientX;
        const newPercent = ((clickX - dimensions.left) / dimensions.width) * 100;

        const audio = audioRef.current;
        audio.currentTime = (newPercent / 100) * audio.duration;
        setPercent(prevState => prevState = newPercent);
    })

    const audioRef = useRef(null);
    const play = () => {
        audioRef.current.play();
        setIsPlaying(prevState => !prevState)
    };
    const pause = () => {
        audioRef.current.pause();
        setIsPlaying(prevState => !prevState)
    };
    const changeVolume = (volumePercent) => {
        audioRef.current.volume = volumePercent
    };

    const updateProgress = () => {
        if (audioRef) {
            const audio = audioRef.current;
            const value = (audio.currentTime / audio.duration) * 100;
            setPercent(value);
            setCurrentMusicTime(audio.currentTime)
            setDurationMusicTime(audio.duration)
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        audio.addEventListener('timeupdate', updateProgress);
        // 组件卸载时移除事件监听
        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
        };
    }, []);
    return (
        <div className={'playBar'}>
            <audio
                id="audioPlayer"
                src={src}
                ref={audioRef}>
            </audio>
            <div className={'songDetails'}>
                <Avatar
                    style={{
                        width: '60px',
                        height: '60px',
                        transform: `rotate(${rotation}deg)`, // 应用旋转角度
                        transition: 'transform 0.2s linear', // 平滑旋转效果
                    }}
                    icon={<UserOutlined/>}
                />
                <div className={'singerDetails'}>
                    <span>Stay with me</span>
                    <span>Jack</span>
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
                    <p>
                        {formatTime(currentMusicTime)}
                    </p>
                    <div
                        onClick={musicClickHandler}
                        style={{cursor: 'pointer'}}
                        ref={progressRef}
                    >
                        <Progress percent={Math.round(percent)} strokeColor={twoColors} showInfo={false}/>
                    </div>
                    <p>
                        {formatTime(durationMusicTime)}
                    </p>
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
