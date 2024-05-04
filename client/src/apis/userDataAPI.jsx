import {requestSpotifyLogin} from "@/axios/requestSpotifyLogin.jsx";
import axios from 'axios';
import { getUserToken } from "@/utils/tokenForUser.jsx";

export function getPlayListAPI(params) {
    return requestSpotifyLogin({
        method: 'GET',
        url: '/playlists',
        params
    })
}

export function getRecentPlaylistsAPI(params) {
    return requestSpotifyLogin({
        method: 'GET',
        url: 'player/recently-played',
        params
    })
}

export function getPlaylistTracks(playlist_id, params) {
    return axios.create({
      baseURL: 'https://api.spotify.com/v1',
      timeout: 5000,
      headers: {
        Authorization: `Bearer ${getUserToken()}`
      }
    })({
      method: 'GET',
      url: `/playlists/${playlist_id}/tracks`,
      params
    })
    .then(response => {
      console.log('Response data:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
  }

  
export function getPlaylistFromIDAPI(id) {
    console.log('Playlist ID passed to getPlaylistFromIDAPI:', id);
    return requestSpotifyLogin({
      url: `playlists/${id}`,
      method: 'GET'
    })
    .catch(error => {
      if (error.response && error.response.status === 404) {
        console.error('Playlist not found. Please check the playlist ID.');
      } else {
        console.error('Error fetching playlist:', error);
      }
      throw error;
    });
}