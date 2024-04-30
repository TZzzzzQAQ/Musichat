import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CLIENT_ID, CLIENT_SECRET } from "@/../config.js";
import { OPENAI_API_KEY } from "@/../config.js";





const AlbumDetails = () => {
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
                fetchAlbum(token);
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };

        const fetchAlbum = async (token) => {
            try {
                const response = await axios.get(`https://api.spotify.com/v1/albums/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setAlbum(response.data);
                setTracks(response.data.tracks.items);
            } catch (error) {
                console.error('Error fetching album:', error);
            }
        };

        fetchToken();
    },
        [id]);
    
    const artist = album.artists && album.artists[0].name;
    const input = `Tell me some information about ${artist} `;
    const [bot, setBot] = useState("");


    const sendMessage = async () => {
        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: "gpt-4-turbo",
                messages: [{ role: "user", content: input }]
            }, {
                headers: {
                    'Authorization': 'Bearer ' + OPENAI_API_KEY,
                }
            });
            const botMessage = response.data.choices[0].message.content;
            setBot(botMessage);
        } catch (error) {
            console.error('Failed to send message: ', error);
        }
    };


    return (
        <div className='overflow-y-auto h-[400px] flex flex-col items-center'>
            <h1 className='text-center pt-4 text-3xl font-poppins font-bold'>{album.name}</h1>
            <img src={album.images && album.images[0].url} alt={album.name} className='h-[200px]' />
            <ul className='text-center font-extralight'>
                {tracks.map((track) => (
                    <li key={track.id}> 《{track.name}》 </li>
                ))}
            </ul>
            <button className='text-center pt-4 text-3xl font-poppins font-bold' onClick={sendMessage}>Tell me something about {artist}</button>

            <div>
                <div>
                    {bot}
                </div>
            </div>
        </div>
    );
};

export default AlbumDetails;
