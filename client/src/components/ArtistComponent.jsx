import {NavLink, useLocation} from "react-router-dom";
import ImageCard from "@/components/ImageCard.jsx";
import Loading from "@/components/Loading/Loading.jsx";

const ArtistComponent = ({artists}) => {
    const location = useLocation(); // Hook to get the current location
    const currentPath = location.pathname; // Get the current path
    return (
        <div className={'h-full'}>
            {artists.length > 0 ?
                <div className={'grid grid-cols-5 overflow-x-hidden h-full mb-8'}>
                    {artists.map((artist) => (
                        <NavLink to={`${currentPath}/${artist.id}`} key={artist.id}>
                            <ImageCard data={artist}/>
                        </NavLink>
                    ))}
                </div> : <Loading></Loading>
            }
        </div>
    );
};

export default ArtistComponent;