import {useEffect, useState} from 'react';
import ImageCard from '@/components/ImageCard.jsx';
import {NavLink} from 'react-router-dom';
import {searchAPI} from "@/apis/everyoneDataAPI.jsx";
import Loading from "@/components/Loading/Loading.jsx";

const getRandomSearchTerm = () => {
    const randomTerms = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const randomIndex = Math.floor(Math.random() * randomTerms.length);
    return randomTerms[randomIndex];
};

const ArtistPage = () => {
    const [artists, setArtists] = useState([]);
    const [randomArtists, setRandomArtists] = useState({
        q: getRandomSearchTerm(),
        type: 'artist',
        market: 'US',
        limit: 25
    })
    useEffect(() => {
        const fetchArtist = async () => {
            try {
                const response = await searchAPI(randomArtists);
                setArtists(response.artists.items);
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };
        fetchArtist();
    }, []);

    return (
        <div className={'h-full'}>
            {artists.length > 0 ?
                <div className={'grid grid-cols-5 overflow-x-hidden h-full mb-8'}>
                    {artists.map((artist) => (
                        <NavLink to={`${artist.id}`} key={artist.id}>
                            <ImageCard data={artist}/>
                        </NavLink>
                    ))}
                </div> : <Loading></Loading>
            }
        </div>
    );
};

export default ArtistPage;