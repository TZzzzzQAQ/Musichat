import {formatTime} from "@/utils/index.jsx";

const TrackList = ({data: {name, artists, duration_ms}}) => {
    return (
        <tr className="underline-animation cursor-pointer font-poppins">
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