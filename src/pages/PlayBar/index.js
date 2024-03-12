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

import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {debounce} from "lodash/function";
import src from '@/assets/stay with me.mp3'

library.add(fas, far, fab);

const twoColors = {
    '0%': '#108ee9',
    '100%': '#87d068',
};
const PlayBar = () => {
    const [percent, setPercent] = useState(0); // 初始进度为0
    const [volumePercent, setVolumePercent] = useState(40)
    const [isPlaying, setIsPlaying] = useState(false);

    const progressRef = useRef(null);
    const volumeProgressBar = useRef(null);

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
                        height: '60px'
                    }}
                    className={'avatar'}
                    icon={<UserOutlined/>}
                />
                <div className={'singerDetails'}>
                    <span>Love Story</span>
                    <span>Jack</span>
                </div>
            </div>
            <div className={'musicControlBar'}>
                <div className={'icons'}>
                    <FontAwesomeIcon icon={faShuffle} style={{color: "#74C0FC", cursor: 'pointer'}}/>
                    <FontAwesomeIcon icon={faBackward} style={{color: "#74C0FC", cursor: 'pointer'}}/>
                    {isPlaying &&
                        <FontAwesomeIcon icon={faPause} style={{color: "#74C0FC", cursor: 'pointer'}} onClick={pause}/>}
                    {!isPlaying &&
                        <FontAwesomeIcon icon={faPlay} style={{color: "#74C0FC", cursor: 'pointer'}} onClick={play}/>}
                    <FontAwesomeIcon icon={faForward} style={{color: "#74C0FC", cursor: 'pointer'}}/>
                    <FontAwesomeIcon icon={faArrowsRotate} style={{color: "#74C0FC", cursor: 'pointer'}}/>
                </div>
                <div className={'progressBar'}>
                    <p>
                        1:20
                    </p>
                    <div
                        onClick={musicClickHandler}
                        style={{cursor: 'pointer'}}
                        ref={progressRef}
                    >
                        <Progress percent={Math.round(percent)} strokeColor={twoColors} showInfo={false}/>
                    </div>
                    <p>
                        5:20
                    </p>
                </div>
            </div>
            <div className={'extendControlBar'}>
                <div className={'icons'}>
                    <FontAwesomeIcon icon="fa-regular fa-heart" style={{color: "#74C0FC",}}/>
                    <FontAwesomeIcon icon={faVolumeOff} style={{color: "#74C0FC",}}/>
                    <div
                        onClick={volumeClickHandler}
                        ref={volumeProgressBar}>
                        <Progress
                            percent={volumePercent}
                            strokeColor={twoColors}
                            showInfo={false}/>
                    </div>
                    <FontAwesomeIcon icon={faList} style={{color: "#74C0FC",}}/>
                </div>
            </div>
        </div>
    );
};

export default PlayBar;
