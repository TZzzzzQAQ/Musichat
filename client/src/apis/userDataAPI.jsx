import {requestSpotifyLogin} from "@/axios/requestSpotifyLogin.jsx";
import axios from 'axios';
import {getUserToken} from "@/utils/tokenForUser.jsx";

export function getPlayListAPI(params) {  // Defines a function to fetch playlists from Spotify.
    return requestSpotifyLogin({  // Uses the Spotify login request handler.
        method: 'GET',  // Specifies the request method as GET.
        url: '/playlists',  // Sets the endpoint URL for fetching playlists.
        params  // Passes the query parameters to the request.
    })
}

export function getRecentPlaylistsAPI(params) {  // Defines a function to fetch the user's recently played playlists.
    return requestSpotifyLogin({  // Uses the Spotify login request handler.
        method: 'GET',  // Specifies the request method as GET.
        url: '/player/recently-played',  // Sets the endpoint URL for fetching recently played playlists.
        params  // Passes the query parameters to the request.
    })
}

export function getPlaylistTracks(playlist_id, params) {  // Defines a function to fetch tracks from a specific playlist.
    return axios.create({  // Creates a new axios instance with specific configurations.
        baseURL: 'https://api.spotify.com/v1',  // Sets the base URL for the API.
        timeout: 5000,  // Sets a timeout limit of 5000 milliseconds for the request.
        headers: {  // Sets the headers for the request.
            Authorization: `Bearer ${getUserToken()}`  // Includes the user's authentication token in the Authorization header.
        }
    })({
        method: 'GET',  // Specifies the request method as GET.
        url: `/playlists/${playlist_id}/tracks`,  // Sets the endpoint URL for fetching tracks from a specific playlist.
        params  // Passes the query parameters to the request.
    })
        .then(response => {  // Handles the response after a successful request.
            return response.data;  // Returns the data from the response.
        })
        .catch(error => {  // Handles errors in the request.
            console.error('Error:', error);  // Logs the error to the console.
            throw error;  // Rethrows the error for further handling.
        });
}


export function getPlaylistFromIDAPI(id) {  // Defines a function to fetch a playlist by its ID.
    console.log('Playlist ID passed to getPlaylistFromIDAPI:', id);  // Logs the playlist ID to the console.
    return requestSpotifyLogin({  // Uses the Spotify login request handler.
        url: `playlists/${id}`,  // Sets the endpoint URL for fetching a specific playlist by ID.
        method: 'GET'  // Specifies the request method as GET.
    })
        .catch(error => {  // Handles errors in the request.
            if (error.response && error.response.status === 404) {  // Checks if the error is a 404 (Not Found) error.
                console.error('Playlist not found. Please check the playlist ID.');  // Logs a specific error message for 404 errors.
            } else {
                console.error('Error fetching playlist:', error);  // Logs a general error message for other types of errors.
            }
            throw error;  // Rethrows the error for further handling.
        });
}

export function getUserTopItems(params) {  // Defines a function to fetch the user's top tracks.
    return requestSpotifyLogin({  // Uses the Spotify login request handler.
        url: `/top/tracks`,  // Sets the endpoint URL for fetching top tracks.
        method: 'GET',  // Specifies the request method as GET.
        params  // Passes the query parameters to the request.
    })
}

export function getUserFollowedArtistsAPI(params) {  // Defines a function to fetch the artists followed by the user.
    return requestSpotifyLogin({  // Uses the Spotify login request handler.
        url: `/following`,  // Sets the endpoint URL for fetching followed artists.
        method: 'GET',  // Specifies the request method as GET.
        params  // Passes the query parameters to the request.
    })
}
