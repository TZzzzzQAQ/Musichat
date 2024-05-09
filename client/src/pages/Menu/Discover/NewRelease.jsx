// Import the useEffect and useState hooks from the React library
import {useEffect, useState} from 'react';
// Import the ImageCard component
import ImageCard from '@/components/ImageCard.jsx';
// Import the NavLink component for routing purposes
import {NavLink} from 'react-router-dom';
// Import the getNewReleasesAPI function to fetch data from the API
import {getNewReleasesAPI} from "@/apis/everyoneDataAPI.jsx";
// Import the Loading component to display loading state
import Loading from "@/components/Loading/Loading.jsx";

// Define the AlbumPage component
const AlbumPage = () => {
    // Use useState to define the albums state, initially an empty array
    const [albums, setAlbums] = useState([]);
    // Use useState to define the searchParams state, containing parameters needed for the API request
    const [searchParams] = useState({
        type: 'album',
        limit: 10,
        market: 'nz'
    })
    // Use the useEffect hook to handle the data fetching logic
    useEffect(() => {
        // Define the asynchronous function fetchAlbums to call the API and fetch album data
        const fetchAlbums = async () => {
            try {
                // Call the API and set the response data to the albums state
                const response = await getNewReleasesAPI(searchParams)
                setAlbums(response.albums.items);
            } catch (error) {
                // Catch and log any errors
                console.error('Error fetching albums:', error);
            }
        };
        // Execute the fetchAlbums function
        fetchAlbums();
    }, [searchParams]);// useEffect depends on searchParams, it re-executes when searchParams change

    // JSX structure returned by the component
    return (
        <div className='overflow-y-auto h-full'>
            {albums.length > 0 ? (
                <div className={'mb-8'}>
                    {albums.map((album) => (
                        <div className='flex' key={album.id}>
                            <ImageCard data={album} artist={false} showname={false}/>
                            <div className='ml-4 mt-10'>
                                <h2 className='text-lg font-poppins font-bold'>{album.name}</h2>
                                <p className='text-lg font-poppins'>{album.artists[0].name}</p>
                                <p className='text-lg font-poppins'>{album.release_date}</p>
                                <NavLink to={`/album/${album.id}`} className='text-lg font-poppins no-underline '>
                                    More...
                                </NavLink>
                            </div>
                        </div>
                    ))}
                </div>
            ) : <Loading/>}
        </div>
    );
};

// Export the AlbumPage component
export default AlbumPage;
