import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "@/store/features/userSlice.jsx";
import { useSpotifyAuth } from "@/hooks/useSpotifyAuth.jsx";
import { sendUserDataAPI } from "@/apis/chatGroupAPI.jsx";
import "./Account.css";
import Setting from "@/pages/Menu/User/User.jsx";
const backgroundImageUrl = "https://i.ibb.co/cTxbCWy/spotify-k8mh.png";

const BackgroundImage = () => (
  <div
    className="background-image"
    style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
  />
);

const LoginHeader = ({ onLogin }) => {
    const [loginText, setLoginText] = useState("Login to Your Account");
  
    const handleClick = () => {
      setLoginText("Signing in...");
      setTimeout(() => {
        onLogin();
      }, 1000);
    };
  
    return (
      <h2 className="login-header" onClick={handleClick}>
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

  return (
    <div className="account-page">
      {Object.keys(userState).length === 0 ? (
        <div className="login-container">
          <BackgroundImage />
          <LoginHeader onLogin={handlerLogin} />
        </div>
      ) : (
        <div className="profile-container">
          <h2>Welcome, {userState.display_name}!</h2>
           <Setting />
          <div className="profile-info">
            <img
              src={userState.images[0]?.url || "default-avatar.png"}
              alt="Profile"
              className="profile-avatar"
            />
            <div className="profile-details">
              <p>
                <strong>Name:</strong> {userState.display_name}
              </p>
              <p>
                <strong>Email:</strong> {userState.email}
              </p>
              <p>
                <strong>Country:</strong> {userState.country}
              </p>
              <p>
                <strong>Spotify ID:</strong> {userState.id}
              </p>
              <p>
                <strong>Subscription:</strong> {userState.product}
              </p>
              <p>
                <strong>Followers:</strong> {userState.followers.total}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;