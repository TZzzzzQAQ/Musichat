import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setUserProfile} from "@/store/features/userSlice.jsx";
import {useSpotifyAuth} from "@/hooks/useSpotifyAuth.jsx";
import {sendUserDataAPI} from "@/apis/chatGroupAPI.jsx";
import Setting from "@/pages/Menu/User/User.jsx";

const backgroundImageUrl = "https://i.ibb.co/cTxbCWy/spotify-k8mh.png";

function Account() {
    const location = useLocation();
    const userState = useSelector((state) => state.user.profile);
    const dispatch = useDispatch();
    const {redirectToAuthCodeFlow, fetchProfile} = useSpotifyAuth();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const code = query.get("code");
        if (code && Object.keys(userState).length === 0) {
            handlerFetchProfile(code);
        }
    }, [location, userState]);

    const handlerLogin = () => {
        redirectToAuthCodeFlow();
    };

    const handlerFetchProfile = async (code) => {
        try {
            const profile = await fetchProfile(code);
            if (profile?.error?.status === 401) {
                return;
            }
            dispatch(setUserProfile(profile));
            sendUserDataAPI(profile);
        } catch (error) {
            console.error("Failed to fetch profile:", error);
        }
    };

    return (
        <div className="h-full w-full font-poppins">
            {Object.keys(userState).length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full w-full ">
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: `url('${backgroundImageUrl}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    />
                        <button
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                            onClick={handlerLogin}
                        >
                            Sign In
                        </button>
                </div>
            ) : (
                <div className="flex flex-col items-center p-12">
                    <h2 className="text-6xl mb-5 bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-pink-500">Welcome, {userState.display_name}!</h2>
                    <Setting/>
                    <div className="flex items-center mt-12">
                        <div className="text-2xl">
                            <p className="mb-2.5 bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-pink-500">
                                <strong>Name:</strong> {userState.display_name}</p>
                            <p className="mb-2.5 bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-pink-500">
                                <strong>Email:</strong> {userState.email}</p>
                            <p className="mb-2.5 bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-pink-500">
                                <strong>Country:</strong> {userState.country}</p>
                            <p className="mb-2.5 bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-pink-500">
                                <strong>Subscription:</strong> {userState.product}</p>
                            <p className="mb-2.5 bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-pink-500">
                                <strong>Followers:</strong> {userState.followers.total}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}

export default Account;