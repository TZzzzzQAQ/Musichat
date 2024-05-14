import {useEffect, useState} from 'react';
import {searchAPI} from "@/apis/everyoneDataAPI.jsx";
import ArtistComponent from "@/components/ArtistComponent.jsx";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRotateRight} from '@fortawesome/free-solid-svg-icons';

// Function to generate a random search term from the alphabet
const getRandomSearchTerm = () => {
    const randomTerms = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const randomIndex = Math.floor(Math.random() * randomTerms.length); // Get a random index
    return randomTerms[randomIndex]; // Return the letter at the random index
};

// Component to display artists based on a random search term
const ArtistPage = () => {
    const [artists, setArtists] = useState([]);
    const [randomArtists, setRandomArtists] = useState({
        q: getRandomSearchTerm(),
        type: 'artist',
        market: 'NZ',
        limit: 25
    });

    const fetchArtist = async () => {
        setRandomArtists({...randomArtists, q: getRandomSearchTerm()}); // Update the search term with a random letter
        try {
            const response = await searchAPI(randomArtists); // Call the search API with random search parameters
            setArtists(response.artists.items); // Update state with artist data
        } catch (error) {
            console.error('Error fetching token:', error); // Log an error if the API call fails
        }
    };

    useEffect(() => {
        fetchArtist(); // Trigger the fetch function
    }, []); // Empty dependency array means this effect runs only once on component mount

    return (
        <>
            <FontAwesomeIcon icon={faRotateRight} size="xl" style={{color: "#74C0FC",}} onClick={fetchArtist}/>
            <ArtistComponent artists={artists}/>
        </>

    );
};

export default ArtistPage;