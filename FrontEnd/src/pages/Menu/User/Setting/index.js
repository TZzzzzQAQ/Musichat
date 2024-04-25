import React, {useEffect, useState} from 'react';
import {ColorPicker, Select} from "antd";
import {useDispatch} from "react-redux";
import {setBackgroundTheme} from "FrontEnd/src/store/features/themeSlice";
import {setPlayerColor} from "@/store/features/themeSlice";

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


const Setting = () => {
    const dispatch = useDispatch();
    const handleChange = (value) => {
        dispatch(setBackgroundTheme(value))
    };

    const [pickerColor, setPickerColor] = useState('#a0d911');

    useEffect(() => {
        dispatch(setPlayerColor(pickerColor));
    }, [pickerColor]);

    return (
        <div className={''}>
            <div className={"flex items-center"}>
                <div>
                    Change Your Background Theme:
                </div>
                <Select
                    className={"mx-4"}
                    defaultValue="Dust Red"
                    style={{
                        width: 120,
                        bottom: 0,
                        right: 0
                    }}
                    onChange={handleChange}
                    options={options}
                />
            </div>
            <div className={"flex items-center my-4"}>
                <div>
                    Change Your Player Theme:
                </div>
                <ColorPicker onChange={(color) => setPickerColor(color.toHexString())} value={pickerColor} showText
                             className={"mx-4"}/>
            </div>
        </div>
    );
};

export default Setting;
