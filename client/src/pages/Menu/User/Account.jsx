import {fetchProfile, redirectToAuthCodeFlow} from "@/apis/spotifyProfile.jsx";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setUserProfile} from "@/store/features/userSlice.jsx";


function App() {
    const location = useLocation();
    const [profile, setProfile] = useState({});
    const userState = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (userState) {
            setProfile(userState);
        }
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            const query = new URLSearchParams(location.search);
            const code = query.get("code");
            if (code) {
                try {
                    const profile = await fetchProfile(code)
                    setProfile(profile);
                    dispatch(setUserProfile(profile));
                } catch (error) {
                    console.error('Failed to fetch profile:', error);
                }
            }
        };
        fetchData();
    }, [location]);

    const handlerClick = () => {
        redirectToAuthCodeFlow();
    };

    return (
        <div>
            <header className="App-header">
                <button onClick={handlerClick}>点我登录</button>
                {profile && <div>{JSON.stringify(profile)}</div>}
                {/*    profile是一个对象里面有用户的所有信息,可以用来做Account页面*/}
            </header>
        </div>
    )
        ;
}

export default App;
