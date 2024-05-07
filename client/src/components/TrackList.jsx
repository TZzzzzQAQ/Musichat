import {formatTime} from "@/utils/index.jsx";
import {getPlaybackStateAPI, playListAPI} from "@/apis/spotifyPlayAPI.jsx";
import {useState} from "react";
import {getActiveDevice} from "@/utils/activeDevice.jsx";
import {useDispatch} from "react-redux";
import {setNowMusic} from "@/store/features/musicSlice.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCommentDots, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';


const TrackList = ({data: {name, artists, duration_ms, uri,id}}) => {
    const [playUri] = useState({"uris": [uri]})
    const dispatch = useDispatch();
    const handlerClick = async () => {
        try {
            await playListAPI(getActiveDevice(), playUri);
            setTimeout(async () => {
                const response = await getPlaybackStateAPI();
                dispatch(setNowMusic(response));
            }, 1000);
        } catch (err) {
            console.log(err)
        }
    }
    const navigate = useNavigate();

    const handleIconClick = (event) => {
        event.stopPropagation(); // 阻止事件冒泡
        navigate(`/songDetails/${id}`); // 假设 uri 是歌曲的 ID
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
                <FontAwesomeIcon icon={faPlus} style={{color: "#74C0FC",}} />
            </td>
        </tr>

    );
};

export default TrackList;