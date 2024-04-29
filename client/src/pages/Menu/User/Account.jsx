import {Card} from "antd";
import {fetchProfile, redirectToAuthCodeFlow} from "@/apis/spotifyProfile.js";
import {useLocation} from "react-router-dom";

function App() {
    const location = useLocation();

    return (
        <div className="App">
            <header className="App-header">
                <button onClick={() => redirectToAuthCodeFlow()}>登录</button>
                <button onClick={() => {
                    const query = new URLSearchParams(location.search);
                    const code = query.get('code');
                    fetchProfile(code)
                }}>简介
                </button>
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
    );
}

export default App;
