import ImageCard from "@/components/ImageCard.jsx";
import {useSelector} from "react-redux";
import {NavLink, useLocation} from "react-router-dom";
import TrackTable from "@/components/TrackTable.jsx";

const SearchResult = () => {
    const location = useLocation();
    const dataFromRedux = useSelector(state => state.music.searchResult);
    const someData = location.state?.someData || dataFromRedux || {};

    const artistsItems = someData?.artists?.items || [];
    const albumsItems = someData?.albums?.items || [];
    const tracksItems = someData?.tracks?.items || [];

    const hasData = artistsItems.length || albumsItems.length || tracksItems.length;

    return (
        <>
            {someData.artists && <div className={'grid grid-cols-5 overflow-x-hidden h-full'}>
                {artistsItems.map((item) => (
                    <NavLink to={`/artist/${item.id}`} key={item.id} className='text-lg font-poppins no-underline '>
                    <ImageCard data={item} key={item.id}/>
                    </NavLink>
                ))}
            </div>}
            {someData.albums && <div className={'grid grid-cols-5 overflow-x-hidden h-full'}>
                {albumsItems.map((item) => (
                    <NavLink to={`/album/${item.id}`} key={item.id} className='text-lg font-poppins no-underline '>
                        <ImageCard data={item} artist={false}/>
                    </NavLink>
                ))}
            </div>}
            {someData.tracks && <div className={'overflow-x-hidden h-full'}>
                <TrackTable playListData={tracksItems}/>
            </div>}
            {!hasData && <div className="text-xl font-poppins text-center py-10">Search what you want!</div>}
        </>
    );
};

export default SearchResult;
