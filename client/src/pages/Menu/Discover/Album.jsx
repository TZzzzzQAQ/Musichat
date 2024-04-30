import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageCard from '@/components/ImageCard.jsx';
import { CLIENT_ID, CLIENT_SECRET } from "@/../config.js";
import { NavLink } from 'react-router-dom';



const AlbumPage = () => {
    const [albums, setAlbums] = useState([]);
    const [region, setRegion] = useState('us');

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
                fetchAlbums(token);
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };

        const fetchAlbums = async (token) => {
            try {
                const response = await axios.get('https://api.spotify.com/v1/browse/new-releases', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        type: 'album',
                        limit: 10,
                        market: region,
                    },
                });

                setAlbums(response.data.albums.items);
            } catch (error) {
                console.error('Error fetching albums:', error);
            }
        };
        fetchToken();
    }, [region]);





    const handleRegionChange = (e) => {
        setRegion(e.target.value);

    };

    return (
        <div className='overflow-y-auto h-[400px]'>
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
                            <ImageCard data={album} showname={false} />
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
                    {region ? 'No albums found.' : 'Loading albums...'}
                </div>
            )}
        </div>
    );
};

export default AlbumPage;