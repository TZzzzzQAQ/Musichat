import Playlist from '../pages/Menu/User/Playlist';
import { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import axios from 'axios';
import { getEveryoneToken } from "@/utils/index.jsx";


// Define the styles as JavaScript objects
const contentStyle = {
  height: '50%', // Decreased height
  width: '100%', // Use full width of the carousel container
  color: '#fff',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  transition: 'transform 0.5s ease-in-out',
};

const overlayStyle = {
  background: 'rgba(0, 0, 0, 0.6)', // Slightly darker overlay
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1rem',
  transition: 'background 0.5s ease-in-out',
};

const textStyle = {
  margin: '0',
  padding: '0.5rem 1rem',
  fontFamily: "'Poppins', sans-serif",
};

const headingStyle = {
  ...textStyle,
  fontSize: '2rem', // Decreased font size
  fontWeight: 800,
  textTransform: 'uppercase',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Text shadow for better readability
};

const paragraphStyle = {
  ...textStyle,
  fontSize: '1.25rem', // Decreased font size
  textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)', // Text shadow for better readability
};

const linkStyle = {
  display: 'block',
  margin: '1rem auto',
  padding: '0.5rem 1rem',
  fontSize: '1.25rem', // Decreased font size
  color: '#1DB954',
  textAlign: 'center',
  textDecoration: 'none',
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 'bold',
};

// Custom styles for the Playlist component

const customStyles = {
    grid: 'grid grid-cols-2 md:grid-cols-3 gap-1 px-1',
    cardLink: 'text-sm text-decoration-none',
    card: 'rounded-md p-0.5 hover:shadow-md transition duration-200 ease-in-out bg-transparent',
    cardHeader: 'flex justify-between items-center',
    title: 'text-xs font-semibold text-gray-600',
    icon: 'text-xs hover:shadow-md',
    image: 'w-8 h-8 rounded-full mx-auto my-0.5 duration-200 ease-in-out hover:scale-105',
};


  
  
  

const ContentCarousel = () => {
    const [topTracks, setTopTracks] = useState([]);
  
    useEffect(() => {
      const fetchToken = async () => {
        try {
          const response = await axios.get('https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF', {
            headers: {
              Authorization: `Bearer ${getEveryoneToken()}`,
            },
          });
  
          const tracks = response.data.tracks.items.slice(0, 4).map((item) => ({
            id: item.track.id,
            name: item.track.name,
            artists: item.track.artists.map((artist) => artist.name).join(', '),
            image: item.track.album.images[0].url,
          }));
          setTopTracks(tracks);
        } catch (error) {
          console.error('Error fetching top tracks:', error);
        }
      };
  
      fetchToken();
    }, []);
  
    return (
      <div style={{ marginTop: '-20px' }}>
        <style>
          {`
            .carousel-content:hover {
              transform: scale(1.05);
            }
            .carousel-overlay {
              background: rgba(0, 0, 0, 0.6);
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              padding: 1rem;
              transition: background 0.5s ease-in-out;
            }
            .carousel-content:hover .carousel-overlay {
              background: rgba(0, 0, 0, 0.7);
            }
          `}
        </style>
        <a href="/top-artists" style={{ ...linkStyle, marginTop: '-35px' }}>Top Artists</a>
        <Carousel dotPosition={'left'} autoplay effect={'fade'}>
          {topTracks.map((track) => (
            <div key={track.id}>
              <div
                style={{ ...contentStyle, backgroundImage: `url(${track.image})` }}
                className="carousel-content"
              >
                <div className="carousel-overlay" style={overlayStyle}>
                  <h2 style={headingStyle}>{track.name}</h2>
                  <p style={paragraphStyle}>{track.artists}</p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
        <h2 style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.5rem', fontWeight: 'bold' }}> {/* Adjusted margin-top */}
          Your Playlists
        </h2>
        <Playlist styles={customStyles} style={{ marginTop: '20px' }} /> {/* Adjusted margin-top */}
      </div>
    );
  };
  
  export default ContentCarousel;
  