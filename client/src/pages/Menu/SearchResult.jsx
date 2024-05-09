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
            {someData.artists?.items?.length > 0 && (
                <div className="grid grid-cols-5 overflow-x-hidden h-full">
                    {someData.artists.items.map((item) => (
                        <NavLink to={`/artist/${item.id}`} key={item.id} className="text-lg font-poppins no-underline">
                            <ImageCard data={item}/>
                        </NavLink>
                    ))}
                </div>
            )}

            {someData.albums?.items?.length > 0 && (
                <div className="grid grid-cols-5 overflow-x-hidden h-full">
                    {someData.albums.items.map((item) => (
                        <NavLink to={`/album/${item.id}`} key={item.id} className="text-lg font-poppins no-underline">
                            <ImageCard data={item} artist={false}/>
                        </NavLink>
                    ))}
                </div>
            )}

            {someData.tracks?.items?.length > 0 && (
                <div className="overflow-x-hidden h-full">
                    <TrackTable playListData={someData.tracks.items}/>
                </div>
            )}

            {!someData.artists?.items?.length && !someData.albums?.items?.length && !someData.tracks?.items?.length && (
                <div className="text-xl font-poppins text-center">Sorry we can not find this!</div>
            )}

            {!someData.artists && !someData.albums && !someData.tracks && (
                <div className="text-xl font-poppins text-center">Search what you want!</div>
            )}
        </>

    );
};

// Export SearchResult component for use in other parts of the application
export default SearchResult;
