import React, {useState} from 'react';
import './index.scss'
import AppContainer from "src/pages/Menu/AppContainer";
import {ConfigProvider, theme, Select} from "antd";
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

library.add(fas, far, fab);
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
    },
    {
        value: 'Polar_Green',
        label: 'Polar Green'
    },
    {
        value: 'Cyan',
        label: 'Cyan'
    },
    {
        value: 'Daybreak_Blue',
        label: 'Daybreak Blue'
    },
    {
        value: 'Geek_Blue',
        label: 'Geek Blue'
    }, {
        value: 'Golden_Purple',
        label: 'Golden Purple'
    }, {
        value: 'Magenta',
        label: 'Magenta'
    }
]
const Layout = () => {
    const [className, setClassName] = useState('box Dust_Red');
    const [primary, setPrimary] = React.useState('#a0d911');
    const [isDaylight, setIsDaylight] = useState(true);
    const handleChange = (value) => {
        setClassName(() => `${value}`)
    };
    const lightHandler = () => {
        setIsDaylight(prevState => !prevState)
    }
    return (
        <div className={`box ${className} dynamic-gradient`}>
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
            <Select
                defaultValue="Dust Red"
                style={{
                    width: 120,
                    position: "absolute",
                    bottom: 0,
                    right: 0
                }}
                onChange={handleChange}
                options={options}
            />
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
