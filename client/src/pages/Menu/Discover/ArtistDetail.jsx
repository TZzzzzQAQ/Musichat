import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CLIENT_ID, CLIENT_SECRET } from "@/../config.js";
import TrackList from "@/components/TrackList.jsx";


const ArtistDetail = () => {
    const { id } = useParams();
    const [album, setAlbum] = useState({});
    const [tracks, setTracks] = useState([]);

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
                TopAlbum(token);
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };

        const TopAlbum = async (token) => {
            try {
                const response = await axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks`,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setTracks(response.data.tracks);
                
            } catch (error) {
                console.error('Error fetching album:', error);
            }
        };

        fetchToken();
    },
        [id]);
    
    

    


    return (
        <div className='overflow-y-auto h-[400px] flex flex-col items-center'>
            <table className={'min-w-full leading-normal'}>
                <thead>
                    <tr>
                        <th className={"px-5 py-3 border-b-2 border-gray-200 text-left text-xl font-poppins text-gray-600 uppercase tracking-wider w-96"}>Top Tracks</th>
                        <th className={'px-5 py-3 border-b-2 border-gray-200 text-left text-xl font-poppins text-gray-600 uppercase tracking-wider'}>Singer</th>
                        <th className={'px-5 py-3 border-b-2 border-gray-200 text-left text-xl font-poppins text-gray-600 uppercase tracking-wider w-36'}>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {tracks.map((item) => (
                        <TrackList data={item} key={item.id} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ArtistDetail;
