import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageCard from '@/components/ImageCard.jsx';
import { CLIENT_ID, CLIENT_SECRET } from "@/../config.js";

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
        if (searchQuery) {
          fetchArtistsBySearch(token);
        } else {
          fetchRandomArtists(token);
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    const fetchArtistsBySearch = async (token) => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/search', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            q: searchQuery,
            type: 'artist',
            market: 'US',
            limit: 20,
          },
        });

        setArtists(response.data.artists.items);
      } catch (error) {
        console.error('Error fetching artists by search:', error);
      }
    };

    const fetchRandomArtists = async (token) => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/search', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            q: getRandomSearchTerm(),
            type: 'artist',
            market: 'US',
            limit: 20,
          },
        });

        setArtists(response.data.artists.items);
      } catch (error) {
        console.error('Error fetching random artists:', error);
      }
    };

    fetchToken();
  }, [searchQuery]);

  const getRandomSearchTerm = () => {
    const randomTerms = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const randomIndex = Math.floor(Math.random() * randomTerms.length);
    return randomTerms[randomIndex];
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
      <div className={'h-[30rem]'}>
        <div className="search-bar">
          <input
              type="text"
              placeholder="Search artists..."
              value={searchQuery}
              onChange={handleSearch}
          />
        </div>
        {artists.length > 0 ? (
            <div className={'grid grid-cols-4 overflow-x-hidden h-[400px] mb-8'}>
              {artists.map((artist) => (
                  <ImageCard data={artist} key={artist.id}/>
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