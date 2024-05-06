import TrackList from "@/components/TrackList.jsx";

const TrackTable = ({playListData}) => {
    return (
        <table className={'min-w-full leading-normal'}>
            <thead>
            <tr>
                <th className={"w-[32rem] xl:w-[40rem] px-5 py-3 border-b-2 border-gray-200 text-left text-xl font-poppins text-gray-600 uppercase tracking-wider"}>Track</th>
                <th className={'w-80 xl:w-96 px-5 py-3 border-b-2 border-gray-200 text-left text-xl font-poppins text-gray-600 uppercase tracking-wider'}>Singer</th>
                <th className={'xl:px-5 py-3 border-b-2 border-gray-200 text-left text-xl font-poppins text-gray-600 uppercase tracking-wider'}>Duration</th>
            </tr>
            </thead>
            <tbody>
            {playListData.map((item) => (
                <TrackList data={item} key={item.id}/>
            ))}
            </tbody>
        </table>
    );
};

export default TrackTable;