import React from 'react';
import {formatTime} from "@/utils";

const TrackList = ({data: {name, artists, duration_ms}}) => {
    console.log()
    return (
        <tr className="hover:bg-gray-100 underline-animation cursor-pointer font-poppins">
            <td className="px-5 py-2 border-b border-gray-200 bg-white text-lg">
                <span className="cursor-pointer text-gray-900 whitespace-no-wrap">
                {name}
                </span>
            </td>
            <td className="px-5 py-2 border-b border-gray-200 bg-white text-lg">
                <span className="inline-block mr-2 last:mr-0">{artists[0].name}</span>
            </td>
            <td className="px-5 py-2 border-b border-gray-200 bg-white text-lg">
                <span className="text-gray-900 whitespace-no-wrap">
                  {formatTime(duration_ms / 1000)}
                </span>
            </td>
        </tr>

    );
};

export default TrackList;