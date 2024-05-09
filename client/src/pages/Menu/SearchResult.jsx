// Import required components and hooks
import ImageCard from "@/components/ImageCard.jsx";
import {useSelector} from "react-redux";
import {NavLink, useLocation} from "react-router-dom";
import TrackTable from "@/components/TrackTable.jsx";

// SearchResult component to display search results from a music database
const SearchResult = () => {
    const location = useLocation(); // Hook to access the current route location and state
    const dataFromRedux = useSelector(state => state.music.searchResult);// Access search results stored in Redux
    // Use location state or Redux data as fallback, initialize with empty object if neither is available
    const someData = location.state?.someData || dataFromRedux || {};

    // Extract artist, album, and track data from the search results
    const artistsItems = someData?.artists?.items || [];
    const albumsItems = someData?.albums?.items || [];
    const tracksItems = someData?.tracks?.items || [];

    // Boolean to check if there is any data to display
    const hasData = artistsItems.length || albumsItems.length || tracksItems.length;

    // Component rendering based on available data
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
            {!hasData && <div className="text-xl font-poppins text-center py-10 ">Search what you want!</div>}
        </>
    );
};

// Export SearchResult component for use in other parts of the application
export default SearchResult;
