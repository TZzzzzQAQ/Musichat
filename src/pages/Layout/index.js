import React, {useState} from 'react';
import './index.scss'
import AppContainer from "src/pages/Menu/AppContainer";
import {ConfigProvider, theme, Select} from "antd";

const options = [
    {
        value: 'Dust_Red',
        label: 'Dust Red',
    },
    {
        value: 'Volcano',
        label: 'Volcano',
    },
    {
        value: 'Sunset_Orange',
        label: 'Sunset Orange',
    },
    {
        value: 'Calendula_Gold',
        label: 'Calendula Gold',
    },
    {
        value: 'Sunrise_Yellow',
        label: 'Sunrise Yellow',
    }

]
const Layout = () => {
    const [className, setClassName] = useState('box');
    // const [primary, setPrimary] = React.useState('#1677ff');
    const handleChange = (value) => {
        setClassName(() => `box ${value}`)
    };
    return (
        <div className={className}>
            <Select
                defaultValue=""
                style={{
                    width: 120,
                    position: "absolute",
                    top: 0,
                    left: 0
                }}
                onChange={handleChange}
                options={options}
            />
            <div className={'appContainer'}>
                <ConfigProvider
                    theme={{
                        // algorithm: theme.darkAlgorithm,
                        algorithm: theme.defaultAlgorithm,
                        token: {
                            // colorPrimary: primary,
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
