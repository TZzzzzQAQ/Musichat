import {useEffect, useState} from 'react';
import ImageCard from '@/components/ImageCard.jsx';
import {NavLink} from 'react-router-dom';
import {getNewReleasesAPI} from "@/apis/everyoneDataAPI.jsx";



const AlbumPage = () => {
    const [albums, setAlbums] = useState([]);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useState({
        type: 'album',
        limit: 10,
        market: 'us'
    })
    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await getNewReleasesAPI(searchParams)
                setAlbums(response.albums.items);
                setError(null); 
            } catch (error) {
                setError(`Error fetching albums: ${error.message}`);
                setAlbums([]); // clear albums
            }
        };
        fetchAlbums();
    }, [searchParams]);

    const handleRegionChange = (e) => {
        setSearchParams(prevState => {
            return {
                ...prevState,
                region: e.target.value,
            }
        })
    };

    return (
        <div className='overflow-y-auto h-full'>
            <h1 className="text-3xl font-poppins font-bold mb-4">New Releases</h1>
            <p className="text-lg font-poppins mb-4 text-black">Select a region:</p>
            <select onChange={handleRegionChange} className='border border-gray-300 rounded-md p-3'>
                <option value="US">United States</option>
                <option value="NZ">New Zealand</option>
                <option value="JP">Japan</option>
            </select>

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
            ) : (
                <div className="text-xl font-poppins text-center py-10">
                    {searchParams.market ? 'No albums found.' : 'Loading albums...'}
                </div>
            )}
        </div>
    );
};

export default AlbumPage;