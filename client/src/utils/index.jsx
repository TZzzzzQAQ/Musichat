// Unified transit module function
import {requestSpotifyCommon} from '@/axios/requestSpotifyCommon.jsx'
import {formatTime} from "@/utils/formateTime.jsx";
import {setEveryoneToken, getEveryoneToken, removeEveryoneToken} from "@/utils/tokenForEveryone.jsx";
import {setUserToken,getUserToken,removeUserToken} from "@/utils/tokenForUser.jsx";

export {requestSpotifyCommon, formatTime, setEveryoneToken, getEveryoneToken, removeEveryoneToken,setUserToken,getUserToken,removeUserToken}