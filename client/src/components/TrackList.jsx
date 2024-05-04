import {formatTime} from "@/utils/index.jsx";
import {getPlaybackStateAPI, playListAPI} from "@/apis/spotifyPlayAPI.jsx";
import {useState} from "react";
import {getActiveDevice} from "@/utils/activeDevice.jsx";
import {useDispatch} from "react-redux";
import {setNowMusic} from "@/store/features/musicSlice.jsx";

const TrackList = ({data: {name, artists, duration_ms, uri}}) => {
    const [playUri, setPlayUri] = useState({"uris": [uri]})
    const dispatch = useDispatch();
    const handlerClick = async () => {
        try {
            await playListAPI(getActiveDevice(), playUri);
            setTimeout(async () => {
                const response = await getPlaybackStateAPI();
                dispatch(setNowMusic(response));
            }, 1000);
        } catch (err) {

        }
    }
    return (
        <tr className="underline-animation cursor-pointer font-poppins" onClick={handlerClick}>
            <td className="px-5 py-3 border-b border-gray-200 text-base">
                <span className="cursor-pointer whitespace-no-wrap">
                {name}
                </span>
            </td>
            <td className="px-5 py-3 border-b border-gray-200 text-base">
                <span className="inline-block mr-2 last:mr-0">{artists[0].name}</span>
            </td>
            <td className="px-5 py-3 border-b border-gray-200 text-base">
                <span className="whitespace-no-wrap">
                  {formatTime(duration_ms / 1000)}
                </span>
            </td>
        </tr>

    );
};

export default TrackList;