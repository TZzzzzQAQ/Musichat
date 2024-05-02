import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLightbulb} from "@fortawesome/free-solid-svg-icons";
import {faLightbulb as faLightbulbRegular} from "@fortawesome/free-regular-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {setIsDaylight as setIsDaylightRedux} from "@/store/features/themeSlice.jsx";

const ToggleDark = () => {
    const isDaylightFromRedux = useSelector(state => state.theme.isDaylight);
    const [isDaylight, setIsDaylight] = useState(isDaylightFromRedux);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setIsDaylightRedux(isDaylight));
    }, [isDaylight]);

    const lightHandler = () => {
        setIsDaylight(prevState => !prevState);
    };
    return (
        <div>
            <div
                className={`switch ${isDaylight ? 'white' : 'black'} invisible lg:visible text-4xl absolute bottom-4 left-4 z-10`}>
                {!isDaylight ?
                    <FontAwesomeIcon
                        icon={faLightbulb}
                        style={{color: "#74C0FC", cursor: "pointer"}}
                        onClick={lightHandler}/> :
                    <FontAwesomeIcon
                        icon={faLightbulbRegular}
                        style={{color: "#74C0FC", cursor: "pointer"}}
                        onClick={lightHandler}/>
                }
            </div>

        </div>
    );
};

export default ToggleDark;