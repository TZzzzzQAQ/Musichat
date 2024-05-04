import {useEffect, useState} from 'react';
import {Carousel} from 'antd';
import axios from 'axios';
import {getEveryoneToken} from "@/utils/index.jsx";

const contentStyle = {
    height: '33rem',
    width: '33rem',
    color: '#fff',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    backgroundSize: 'cover', // 确保背景图像覆盖整个元素
    backgroundPosition: 'center', // 确保图片以其中心为中心显示
    backgroundRepeat: 'no-repeat' // 防止背景图像重复
};

const ContentCarousel = () => {
    const [topTracks, setTopTracks] = useState([]);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const response = await axios.get('https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF', {
                    headers: {
                        Authorization: `Bearer ${getEveryoneToken()}`,
                    },
                });

                const tracks = response.data.tracks.items.slice(0, 4).map((item) => ({
                    id: item.track.id,
                    name: item.track.name,
                    artists: item.track.artists.map((artist) => artist.name).join(', '),
                    image: item.track.album.images[0].url,
                }));
                setTopTracks(tracks);
            } catch (error) {
                console.error('Error fetching top tracks:', error);
            }
        };

        fetchToken();
    }, []);

    return (
        <Carousel dotPosition={'left'} autoplay effect={'fade'}>
            {topTracks.map((track) => (
                <div key={track.id}>
                    <div style={{...contentStyle, backgroundImage: `url(${track.image})`, backgroundSize: 'auto'}}>
                        <div style={{
                            background: 'rgba(0, 0, 0, 0.5)',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}>
                            <h2 style={{fontSize: '24px', marginBottom: '10px'}}>{track.name}</h2>
                            <p style={{fontSize: '16px'}}>{track.artists}</p>
                        </div>
                    </div>
                </div>
            ))}
        </Carousel>
    );
};

export default ContentCarousel;