import {formatTime} from "@/utils/index.jsx";
import {getPlaybackStateAPI, playListAPI} from "@/apis/spotifyPlayAPI.jsx";
import {useState} from "react";
import {getActiveDevice} from "@/utils/activeDevice.jsx";
import {useDispatch} from "react-redux";
import {setNowMusic} from "@/store/features/musicSlice.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCommentDots, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { playbackQueue } from "../apis/spotifyPlayAPI";
import { requestSpotifyCommon } from "../axios/requestSpotifyCommon";
const TrackList = ({data: {name, artists, duration_ms, uri,id}}) => {
    const [playUri] = useState({"uris": [uri]})// useState hook to store the play URI, initialized with the track's URI
    const dispatch = useDispatch();// Hook to access the Redux store's dispatch method
    const handlerClick = async () => { // Define an asynchronous function to handle the click event for playing the track
        try {
            await playListAPI(getActiveDevice(), playUri);// Play the playlist using the playListAPI and the active device's identifier
            setTimeout(async () => { // Set a timeout to fetch and update the now playing music after 1 second
                const response = await getPlaybackStateAPI();
                dispatch(setNowMusic(response));
            }, 1000);
        } catch (err) {
            console.log(err)
        }
    }
    const navigate = useNavigate();

    const handleIconClick = (event) => {
        event.stopPropagation(); // Blocking event bubbling
        navigate(`/songDetails/${id}`); // Assuming the uri is the ID of the song
      };


      const handlePlusClick = async (event) => {
    event.stopPropagation(); // Prevent event bubbling
    try {
        const device = getActiveDevice(); // Ensure device is retrieved
        await playbackQueue(uri, device);
    } catch (err) {
        console.error("Error adding to queue:", err);
    }
};

    



    return (
        <tr className="underline-animation cursor-pointer font-poppins" onClick={handlerClick}>
            <td className="px-5 py-3 border-b border-gray-200 text-base ">
                <span className="cursor-pointer whitespace-no-wrap">
                {name}
                </span>
            </td>
            <td className="px-5 py-3 border-b border-gray-200 text-base ">
                <span className="inline-block mr-2 last:mr-0">{artists[0].name}</span>
            </td>
            <td className="px-5 py-3 border-b border-gray-200 text-base ">
                <span className="whitespace-no-wrap">
                  {formatTime(duration_ms / 1000)}
                </span>
            </td>
            <td className="px-5 py-3 border-b border-gray-200 text-2xl">
                <FontAwesomeIcon icon={faCommentDots} style={{color: "#74C0FC",marginRight:"1rem"}} onClick={handleIconClick}/>
                <FontAwesomeIcon icon={faPlus} style={{color: "#74C0FC",}} onClick={handlePlusClick}/>
            </td>
        </tr>

    );
};

export default TrackList;
