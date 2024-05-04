import React from 'react';
import axios from 'axios';
import AuthRoute from "@/components/AuthRoute.jsx";
import { useEffect, useState } from "react";
import { playListAPI, getPlaylistTracks } from "@/apis/userDataAPI.jsx";
import TrackList from "@/components/TrackList.jsx";
import {getPlaylistFromIDAPI} from "@/apis/userDataAPI.jsx";
import {useParams} from 'react-router-dom';

const Playlist = () => {
  const [searchParams] = useState({ limit: 50, offset: 0 });
  const [playListData, setPlayListData] = useState([]);
  const {id} = useParams();
  const [playlist,  setPlaylist] = useState({});
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchPlaylist = async () => {
        try {
            console.log('Playlist ID from URL:', id);
            const response = await getPlaylistFromIDAPI(id);
            setPlaylist(response);
            setTracks(response.tracks.items);
        } catch (error) {
            console.error('Error fetching Playlist:', error);
        }
    };
    fetchPlaylist();
    },
        [id]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await playListAPI(searchParams);
        const playlistsWithTracks = await Promise.all(
          response.items.map(async (playlist) => {
            const tracksResponse = await getPlaylistTracks(playlist.id);
            const tracks = tracksResponse.items ? tracksResponse.items.map((item) => ({
              name: item.track.name,
              artists: item.track.artists,
              duration_ms: item.track.duration_ms,
              uri: item.track.uri,
            })) : [];
            return { ...playlist, tracks };
          })
        );
        setPlayListData(playlistsWithTracks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlaylist();
  }, []);

return (
    <AuthRoute>
        <div className='overflow-y-auto h-full flex flex-col items-center'>
            <div>
                <h1 className='text-center pt-4 text-3xl font-poppins font-bold'>{playListData[0]?.name}</h1>
                <img src={playListData[0]?.images[0]?.url} alt={playListData[0]?.name} className='h-[200px]' />
                <table className={'min-w-full leading-normal'}>
                    <thead>
                        <tr>
                            <th className={"px-5 py-3 border-b-2 border-gray-200 text-left text-xl font-poppins text-gray-600 uppercase tracking-wider w-96"}>Track</th>
                            <th className={'px-5 py-3 border-b-2 border-gray-200 text-left text-xl font-poppins text-gray-600 uppercase tracking-wider'}>Singer</th>
                            <th className={'px-5 py-3 border-b-2 border-gray-200 text-left text-xl font-poppins text-gray-600 uppercase tracking-wider w-36'}>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playListData[0]?.tracks.map((item) => (
                            <TrackList data={item} key={item.uri} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </AuthRoute>
);
};

// Helper function to convert milliseconds to minutes and seconds format
function millisToMinutesAndSeconds(millis) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export default Playlist;