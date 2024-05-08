import {useEffect, useState} from 'react';
import {searchAPI} from "@/apis/everyoneDataAPI.jsx";
import ArtistComponent from "@/components/ArtistComponent.jsx";

const getRandomSearchTerm = () => {
    const randomTerms = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const randomIndex = Math.floor(Math.random() * randomTerms.length);
    return randomTerms[randomIndex];
};

const ArtistPage = () => {
    const [artists, setArtists] = useState([]);
    const [randomArtists] = useState({
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
        <ArtistComponent artists={artists}/>
    );
};

export default ArtistPage;