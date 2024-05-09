import Playlist from '../pages/Menu/User/Playlist';
import {useEffect, useState} from 'react';
import {getFeaturedPlaylistsAPI} from "@/apis/everyoneDataAPI.jsx";
import {Carousel} from "antd";

const contentStyle = {
    margin: 0,
    height: '24rem',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
};

const ContentCarousel = () => {
    const [featuredData, setFeaturedData] = useState([])
    const [searchData] = useState({
        limit:10
    })
    useEffect(() => {
        const fetchData = async () => {
            const response = await getFeaturedPlaylistsAPI(searchData);
            setFeaturedData(response.playlists.items)
        }
        fetchData()
    }, []);

    return (
        <div className={'w-full h-full overflow-y-auto'}>
            <Carousel arrows dotPosition="left" infinite={true} autoplay>
                {featuredData.length > 0 && featuredData.map((item) => (
                    <div key={item.id}>
                        <div style={{...contentStyle, backgroundImage: `url(${item.images[0].url})`, backgroundSize: 'auto'}}>
                            <div style={{
                                background: 'rgba(0, 0, 0, 0.5)',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <h2 className={'text-2xl font-poppins font-extrabold uppercase'}>{item.name}</h2>
                                <p className={'text-xl font-poppins'}>{item.artists}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>

            <div className={'font-poppins text-2xl font-extrabold'}>
                Your Playlists
            </div>
            <Playlist/>
        </div>
    );
};

export default ContentCarousel;
  