import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageCard from '@/components/ImageCard.jsx';
import {CLIENT_ID, CLIENT_SECRET} from "@/../config.js";

const ArtistPage = () => {
  const [artists, setArtists] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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
        fetchArtists(token);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    const fetchArtists = async (token) => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/search', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            q: searchQuery || 'Taylor Swift', // 如果搜索词为空,使用默认搜索词"Taylor Swift"
            type: 'artist',
            market: 'US',
            limit: 20,
          },
        });

        setArtists(response.data.artists.items);
      } catch (error) {
        console.error('Error fetching artists:', error);
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
        <input type="text" placeholder="Search artists..." value={searchQuery} onChange={handleSearch} />
      </div>
      {artists.length > 0 ? (
        <div className={'grid grid-cols-4 overflow-x-hidden h-[400px] mb-8'}>
          {artists.map((artist) => (
            <ImageCard data={artist} key={artist.id} />
          ))}
        </div>
      ) : (
        <div className="text-xl font-poppins text-center py-10">
          {searchQuery ? 'No artists found.' : 'Loading artists...'}
        </div>
      )}
    </div>
  );
};

export default ArtistPage;