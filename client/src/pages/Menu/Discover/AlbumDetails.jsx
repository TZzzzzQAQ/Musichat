import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {OPENAI_API_KEY} from "@/../config.js";
import TrackList from "@/components/TrackList.jsx";
import {getAlbumsFromIDAPI} from "@/apis/everyoneDataAPI.jsx";
import TrackTable from "@/components/TrackTable.jsx";


const AlbumDetails = () => {
    const {id} = useParams();
    const [album, setAlbum] = useState({});
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
            const fetchAlbum = async () => {
                try {
                    const response = await getAlbumsFromIDAPI(id);
                    setAlbum(response);
                    setTracks(response.tracks.items);
                } catch (error) {
                    console.error('Error fetching album:', error);
                }
            };
            fetchAlbum();
        },
        [id]);

    const artist = album.artists && album.artists[0].name;
    const input = `Tell me some information about ${artist} `;
    const [bot, setBot] = useState("");

    const sendMessage = async () => {
        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: "gpt-4-turbo",
                messages: [{role: "user", content: input}]
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
        <div className='overflow-y-auto h-full flex flex-col items-center'>
            <h1 className='text-center pt-4 text-3xl font-poppins font-bold'>{album.name}</h1>
            <img src={album.images && album.images[0].url} alt={album.name} className='h-[200px]'/>
            <TrackTable playListData={tracks}/>
            <button className='text-center pt-4 text-3xl font-poppins font-bold' onClick={sendMessage}>Tell me something
                about {artist}</button>
            <div>
                {bot}
            </div>
        </div>
    );
};

export default AlbumDetails;
