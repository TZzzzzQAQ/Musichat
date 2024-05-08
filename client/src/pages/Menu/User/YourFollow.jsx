import {useEffect, useState} from "react";
import {getUserFollowedArtistsAPI} from "@/apis/userDataAPI.jsx";
import ArtistComponent from "@/components/ArtistComponent.jsx";

const YourFollow = () => {
    const [searchData] = useState({
        type: 'artist',
        limit: '50'
    })
    const [artists, setArtists] = useState([])

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await getUserFollowedArtistsAPI(searchData);
                setArtists(response.artists.items)
            } catch (error) {
                console.log(error)
            }
        }
        fetch();
    }, []);

    return (
        <ArtistComponent artists={artists}/>
    );
};

export default YourFollow;