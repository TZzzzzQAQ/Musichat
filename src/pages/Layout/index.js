import React, {useState} from 'react';
import './index.scss'
import AppContainer from "src/pages/Menu/AppContainer";
import {ConfigProvider, theme} from "antd";
import {useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Layout = () => {
    const className = useSelector((state) => state.theme.backgroundTheme);
    const primary = useSelector(state => state.theme.playerColor)
    const [isDaylight, setIsDaylight] = useState(true);

    const lightHandler = () => {
        setIsDaylight(prevState => !prevState)
    }
    return (
        <div className={`box Dust_Red ${className} dynamic-gradient`}>
            <div className={`switch ${isDaylight ? 'white' : 'black'}`}>
                {!isDaylight ?
                    <FontAwesomeIcon
                        icon="fa-solid fa-lightbulb"
                        style={{color: "#74C0FC", cursor: "pointer"}}
                        onClick={lightHandler}/> :
                    <FontAwesomeIcon
                        icon="fa-regular fa-lightbulb"
                        style={{color: "#74C0FC", cursor: "pointer"}}
                        onClick={lightHandler}/>
                }
            </div>
            <div className={'appContainer'}>
                <ConfigProvider
                    theme={{
                        algorithm: isDaylight ? theme.defaultAlgorithm : theme.darkAlgorithm,
                        token: {
                            colorPrimary: primary,
                        },
                    }}
                >
                    <AppContainer/>
                </ConfigProvider>
            </div>
        </div>
    );
};

export default Layout;
