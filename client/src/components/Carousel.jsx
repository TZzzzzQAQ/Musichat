import {useEffect, useState} from 'react';
import {Carousel} from 'antd';
import axios from 'axios';
import {CLIENT_ID, CLIENT_SECRET} from '@/../config.js';

const contentStyle = {
    height: '400px',
    color: '#fff',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
};

const ContentCarousel = () => {
    const [topTracks, setTopTracks] = useState([]);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const response = await axios.post('https://accounts.spotify.com/api/token', null, {
                    params: {
                        grant_type: 'client_credentials',
                        client_id: CLIENT_ID,
                        client_secret: CLIENT_SECRET,
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });

                const token = response.data.access_token;
                fetchTopTracks(token);
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };

        const fetchTopTracks = async (token) => {
            try {
                const response = await axios.get('https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF', {
                    headers: {
                        Authorization: `Bearer ${token}`,
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
                    <div style={{...contentStyle, backgroundImage: `url(${track.image})`, backgroundSize: 'cover'}}>
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