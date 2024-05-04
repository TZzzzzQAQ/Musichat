import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setUserProfile} from "@/store/features/userSlice.jsx";
import {useSpotifyAuth} from "@/hooks/useSpotifyAuth.jsx";
import Setting from "@/pages/Menu/User/User.jsx";


function App() {
    const location = useLocation();
    const [profile, setProfile] = useState({});
    const userState = useSelector(state => state.user);
    const dispatch = useDispatch();
    const {redirectToAuthCodeFlow,fetchProfile} = useSpotifyAuth();
    useEffect(() => {
        setProfile(userState);
    }, []);

    useEffect(() => {
        if (Object.keys(userState).length > 0) {
            setProfile(userState);
        }
    }, [userState]);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const code = query.get("code");
        if (code && Object.keys(profile).length === 0) {
            handlerClickProfile();
        }
    }, [location, profile]);

    const handlerClick = () => {
        redirectToAuthCodeFlow();
    };

    const handlerClickProfile = async () => {
        const query = new URLSearchParams(location.search);
        const code = query.get("code");
        try {
            const profile = await fetchProfile(code)
            if (profile?.error?.status === 401) {
                return
            }
            setProfile(profile);
            dispatch(setUserProfile(profile));
        } catch (error) {
            console.error('Failed to fetch profile:', error);
        }
    }
    return (
        <div>
            <header className="App-header">
                <button onClick={handlerClick}>点我登录</button>
                {profile && <div>{JSON.stringify(profile)}</div>}
            </header>
            <Setting/>
        </div>
    )
        ;
}

export default App;
