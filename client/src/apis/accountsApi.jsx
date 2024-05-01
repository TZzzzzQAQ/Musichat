import {CLIENT_ID, CLIENT_SECRET} from "../../config.js";
import {requestSpotifyVerify} from "@/utils/requestSpotifyVerify.jsx";

export const getEveryoneTokenAPI = async () => {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', CLIENT_ID);
    params.append('client_secret', CLIENT_SECRET);

    try {
        const response = await requestSpotifyVerify.post('/token', params)
        return response.access_token;
    } catch (error) {
        console.error('Failed to retrieve token:', error);
    }
}
