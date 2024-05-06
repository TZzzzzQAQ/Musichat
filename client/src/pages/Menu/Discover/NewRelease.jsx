import {useEffect, useState} from 'react';
import ImageCard from '@/components/ImageCard.jsx';
import {NavLink} from 'react-router-dom';
import {getNewReleasesAPI} from "@/apis/everyoneDataAPI.jsx";
import Loading from "@/components/Loading/Loading.jsx";

const AlbumPage = () => {
    const [albums, setAlbums] = useState([]);
    const [searchParams] = useState({
        type: 'album',
        limit: 10,
        market: 'nz'
    })
    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await getNewReleasesAPI(searchParams)
                setAlbums(response.albums.items);
            } catch (error) {
                console.error('Error fetching albums:', error);
            }
        };
        fetchAlbums();
    }, [searchParams]);

    return (
        <div className='overflow-y-auto h-full'>
            {albums.length > 0 ? (
                <div className={'mb-8'}>
                    {albums.map((album) => (
                        <div className='flex' key={album.id}>
                            <ImageCard data={album} artist={false} showname={false}/>
                            <div className='ml-4 mt-10'>
                                <h2 className='text-lg font-poppins font-bold'>{album.name}</h2>
                                <p className='text-lg font-poppins'>{album.artists[0].name}</p>
                                <p className='text-lg font-poppins'>{album.release_date}</p>
                                <NavLink to={`/album/${album.id}`} className='text-lg font-poppins no-underline '>
                                    More...
                                </NavLink>
                            </div>
                        </div>
                    ))}
                </div>
            ) : <Loading/>}
        </div>
    );
};

export default AlbumPage;