import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getTopTracksAPI} from "@/apis/everyoneDataAPI.jsx";
import TrackTable from "@/components/TrackTable.jsx";

// Component to display the top tracks of a specific artist
const ArtistDetail = () => {
    const {id} = useParams(); // Extract the artist ID from the URL parameters
    const [tracks, setTracks] = useState([]); // State to hold the list of tracks

    useEffect(() => {
        // Asynchronous function to fetch the top tracks of an artist
        const fetchTopAlbum = async () => {
            try {
                const response = await getTopTracksAPI(id); // API call to fetch top tracks using artist ID
                setTracks(response.tracks); // Update state with the fetched tracks
            } catch (error) {
                console.error('Error fetching album:', error); // Log an error if the API call fails
            }
        };
        fetchTopAlbum(); // Execute the fetch function
    }, [id]); // Dependency array contains `id`, so the effect re-runs if `id` changes

    // Render the component, displaying the tracks in a TrackTable
    return (
        <div className='overflow-y-auto h-full flex flex-col items-center'>
            <TrackTable playListData={tracks}/> // TrackTable component to display tracks
        </div>
    );
};

export default ArtistDetail; // Export the component for use in other parts of the app
