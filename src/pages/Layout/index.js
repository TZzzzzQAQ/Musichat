import React, {useState} from 'react';
import './index.scss'
import AppContainer from "src/pages/AppContainer";
import {ConfigProvider, theme} from "antd";
import {faLightbulb} from '@fortawesome/free-solid-svg-icons';
import {faLightbulb as faLightbulbRegular} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useSelector} from "react-redux";
import MobileOptimization from "@/components/MobileOptimization";


const Layout = () => {
    const className = useSelector((state) => state.theme.backgroundTheme);
    const primary = useSelector(state => state.theme.playerColor)
    const [isDaylight, setIsDaylight] = useState(true);

    const lightHandler = () => {
        setIsDaylight(prevState => !prevState)
    }
    return (
        <div className={`box Dust_Red ${className} dynamic-gradient`}>
            <div className={`switch ${isDaylight ? 'white' : 'black'} invisible xl:visible`}>
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
            <MobileOptimization/>
            <div className={'appContainer invisible xl:visible'}>
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
