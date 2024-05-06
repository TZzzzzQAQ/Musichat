import AppContainer from "@/pages/AppContainer.jsx";
import {ConfigProvider, theme} from "antd";
import {useSelector} from "react-redux";
import MobileOptimization from "@/components/MobileOptimization.jsx";

const Layout = () => {
    const className = useSelector((state) => state.theme.backgroundTheme);
    const primary = useSelector(state => state.theme.playerColor);
    const isDaylight = useSelector(state => state.theme.isDaylight);


    const backgroundClass = isDaylight ? className : 'bg-darkbg';

    return (
        <div className={`box ${backgroundClass} animate-gradient-bg pt-6 h-screen w-screen bg-large-300`}>
            <MobileOptimization/>
            <div
                className={'shadow-2xl appContainer invisible lg:visible max-w-[90rem] mx-auto p-2 rounded-xl bg-white/30 backdrop-blur-2xl'}>
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