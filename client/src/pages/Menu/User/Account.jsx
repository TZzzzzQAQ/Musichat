import {Card} from "antd";
import {fetchProfile, redirectToAuthCodeFlow} from "@/apis/spotifyProfile.jsx";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

function App() {
    const location = useLocation();
    const [profile, setProfile] = useState({})
    useEffect(() => {
        const fetchData = async () => {
            const query = new URLSearchParams(location.search);
            const code = query.get("code");
            if (code) {
                try {
                    setProfile(await fetchProfile(code));
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
            <Card title="After Login">
                <ul>
                    <li>
                        你可以修改背景颜色.
                    </li>
                    <li>
                        可以保存你喜欢的歌曲.
                    </li>
                    <li>
                        可以访问最近听歌的记录.
                    </li>
                </ul>
            </Card>
        </div>
    )
        ;
}

export default App;
