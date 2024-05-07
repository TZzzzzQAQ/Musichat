import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "@/store/features/userSlice.jsx";
import { useSpotifyAuth } from "@/hooks/useSpotifyAuth.jsx";
import { sendUserDataAPI } from "@/apis/chatGroupAPI.jsx";
import Setting from "@/pages/Menu/User/User.jsx";
import {removeActiveDevice } from '@/utils/activeDevice.jsx';
import { removeUserToken } from '@/utils/tokenForUser.jsx';

const backgroundImageUrl = "https://i.ibb.co/cTxbCWy/spotify-k8mh.png";;

const BackgroundImage = () => (
    <div
      className="absolute inset-0 bg-contain bg-center bg-no-repeat filter blur-[7px] z-[-1] overflow-hidden"
      style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
    />
  );

const LoginHeader = ({ onLogin }) => {
  const [loginText, setLoginText] = useState("Login to Your Account");

  const handleClick = () => {
    setLoginText("Login in progress... ");
    setTimeout(() => {
      onLogin();
    }, 1000);
  };

  return (
    <h2
      className="text-[40px] font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 cursor-pointer transition duration-300 ease-in-out hover:opacity-80"
      onClick={handleClick}
    >
      {loginText}
    </h2>
  );
};

function Account() {
  const location = useLocation();
  const userState = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  const { redirectToAuthCodeFlow, fetchProfile } = useSpotifyAuth();

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
  const handleLogout = () => {
    removeUserToken();
    removeActiveDevice();
    dispatch(setUserProfile({}));
    window.location.href = '/Musichat/account';
  };

  return (
    <div className="h-full">
      {Object.keys(userState).length === 0 ? (
        <div className="relative flex flex-col items-center justify-center h-full overflow-hidden">
          <BackgroundImage />
          <LoginHeader onLogin={handlerLogin} />
          
        </div>
      ) : (
        <div className="flex flex-col items-center p-12">
                    <h2 className="text-6xl mb-5 bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-pink-500">Welcome, {userState.display_name}!</h2>
                    <Setting/>
                    <button
                        className="mt-6 px-6 py-3 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition duration-300"
                        onClick={handleLogout}
                                                >
                            Logout
                    </button>
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