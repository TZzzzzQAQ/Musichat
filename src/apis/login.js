import axios from 'axios';
import {client_id, client_secret} from "../config";

const getAccessToken = async () => {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', client_id);
    params.append('client_secret', client_secret);

    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return response.data.access_token; // The token you need for future requests
    } catch (error) {
        console.error('Error retrieving Spotify token', error);
        throw error;
    }
};

export default getAccessToken;