import {useEffect, useState} from 'react';
import {searchAPI} from "@/apis/everyoneDataAPI.jsx";
import ArtistComponent from "@/components/ArtistComponent.jsx";

// Function to generate a random search term from the alphabet
const getRandomSearchTerm = () => {
    const randomTerms = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const randomIndex = Math.floor(Math.random() * randomTerms.length); // Get a random index
    return randomTerms[randomIndex]; // Return the letter at the random index
};

// Component to display artists based on a random search term
const ArtistPage = () => {
    const [artists, setArtists] = useState([]); // State for storing artist data
    const [randomArtists] = useState({ // State for storing search parameters, initialized once
        q: getRandomSearchTerm(), // Random search term
        type: 'artist', // Search type
        market: 'US', // Market for the search
        limit: 25 // Number of results to fetch
    });

    useEffect(() => {
        const fetchArtist = async () => {
            try {
                const response = await searchAPI(randomArtists); // Call the search API with random search parameters
                setArtists(response.artists.items); // Update state with artist data
            } catch (error) {
                console.error('Error fetching token:', error); // Log an error if the API call fails
            }
        };
        fetchArtist(); // Trigger the fetch function
    }, []); // Empty dependency array means this effect runs only once on component mount

    return (
        <ArtistComponent artists={artists}/> // Render ArtistComponent with the fetched artists
    );
};

export default ArtistPage;