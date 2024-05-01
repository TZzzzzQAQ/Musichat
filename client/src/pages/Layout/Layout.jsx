import { useState } from 'react';
import './index.scss'
import AppContainer from "@/pages/AppContainer.jsx";
import { ConfigProvider, theme } from "antd";
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb as faLightbulbRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import MobileOptimization from "@/components/MobileOptimization.jsx";


const Layout = () => {
    const className = useSelector((state) => state.theme.backgroundTheme);
    const primary = useSelector(state => state.theme.playerColor)
    const [isDaylight, setIsDaylight] = useState(true);

    const lightHandler = () => {
        setIsDaylight(prevState => !prevState)
    }
    const backgroundClass = isDaylight ? className : 'darkbg';

    return (
        <div className={`box Dust_Red ${backgroundClass} dynamic-gradient`}>
            <div className={`switch ${isDaylight ? 'white' : 'black'} invisible xl:visible`}>
                {!isDaylight ?
                    <FontAwesomeIcon
                        icon={faLightbulb}
                        style={{ color: "#74C0FC", cursor: "pointer" }}
                        onClick={lightHandler} /> :
                    <FontAwesomeIcon
                        icon={faLightbulbRegular}
                        style={{ color: "#74C0FC", cursor: "pointer" }}
                        onClick={lightHandler} />
                }
            </div>
            <MobileOptimization />
            <div
                className={'shadow-2xl appContainer invisible xl:visible max-w-[90rem] mx-auto p-2 rounded-xl bg-white/30 backdrop-blur-2xl h-[46rem]'}>
                <ConfigProvider
                    theme={{
                        algorithm: isDaylight ? theme.defaultAlgorithm : theme.darkAlgorithm,
                        token: {
                            colorPrimary: primary,
                        },
                    }}
                >
                    <AppContainer />
                </ConfigProvider>
            </div>
        </div>
    );
};

export default Layout;