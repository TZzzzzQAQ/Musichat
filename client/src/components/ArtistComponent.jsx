import {NavLink} from "react-router-dom";
import ImageCard from "@/components/ImageCard.jsx";
import Loading from "@/components/Loading/Loading.jsx";

const ArtistComponent = ({artists}) => {
    console.log(artists.length)
    return (
        <div className={'h-full'}>
            {artists.length > 0 ?
                <div className={'grid grid-cols-5 overflow-x-hidden h-full mb-8'}>
                    {artists.map((artist) => (
                        <NavLink to={`${artist.id}`} key={artist.id}>
                            <ImageCard data={artist}/>
                        </NavLink>
                    ))}
                </div> : <Loading></Loading>
            }
        </div>
    );
};

export default ArtistComponent;