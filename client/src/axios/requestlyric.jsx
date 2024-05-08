import axios from 'axios';

const fetchLyrics = async (artist, title) => {
    const API_KEY = 'YOUR_API_KEY';
    const API_ENDPOINT = `'https://api.spotify.com/v1/playlist/37i9dQZEVXbMDoHDwVN2tF`;

    try {
        const response = await axios.get(API_ENDPOINT, {
            params: {
                apikey: API_KEY
            }
        });
        return response.data.lyrics; // 根据API的实际响应结构调整
    } catch (error) {
        console.error("Error fetching lyrics:", error);
        return "Lyrics not found."; // 处理错误情况
    }
}