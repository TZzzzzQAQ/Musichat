import {CLIENT_ID, CLIENT_SECRET} from "../../config.js";

const fetchAccessToken = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    return data.access_token;
};

const searchTrack = async (track, artist) => {
    const accessToken = await fetchAccessToken(); // 确保你已经获取了 Access Token
    const query = encodeURIComponent(`${track} artist:${artist}`); // 格式化查询字符串
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const data = await response.json();
    return data.tracks.items; // 这将返回一个包含搜索结果的数组
};

export default  searchTrack ;

