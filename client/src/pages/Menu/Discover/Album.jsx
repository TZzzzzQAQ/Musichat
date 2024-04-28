import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { VITE_CLIENT_ID, VITE_CLIENT_SECRET } from '../../../../env.js';
import ImageCard from '@/components/ImageCard.jsx';

const AlbumPage = () => {
  const [albums, setAlbums] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.post('https://accounts.spotify.com/api/token', null, {
          params: {
            grant_type: 'client_credentials',
            client_id: VITE_CLIENT_ID,
            client_secret: VITE_CLIENT_SECRET,
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
        const response = await axios.get('https://api.spotify.com/v1/search', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            q: searchQuery || 'Taylor Swift', // 如果搜索词为空,使用默认搜索词"Taylor Swift"
            type: 'album',
            market: 'US',
            limit: 20,
          },
        });

        setAlbums(response.data.albums.items);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchToken();
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <div className="search-bar">
        <input type="text" placeholder="Search albums..." value={searchQuery} onChange={handleSearch} />
      </div>
      {albums.length > 0 ? (
        <div className={'grid grid-cols-4 overflow-x-hidden h-[400px] mb-8'}>
          {albums.map((album) => (
            <ImageCard data={album} key={album.id} />
          ))}
        </div>
      ) : (
        <div className="text-xl font-poppins text-center py-10">
          {searchQuery ? 'No albums found.' : 'Loading albums...'}
        </div>
      )}
    </div>
  );
};

export default AlbumPage;
