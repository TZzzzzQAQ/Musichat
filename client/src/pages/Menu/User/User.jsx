import {Select} from "antd";
import {useDispatch} from "react-redux";
import {setBackgroundTheme} from "@/store/features/themeSlice.jsx";

const options = [
    {
        value: 'bg-dust-red',
        label: 'Dust Red',
    },
    {
        value: 'bg-volcano',
        label: 'Volcano',
    },
    {
        value: 'bg-sunset-orange',
        label: 'Sunset Orange',
    },
    {
        value: 'bg-calendula-gold',
        label: 'Calendula Gold',
    },
    {
        value: 'bg-sunrise-yellow',
        label: 'Sunrise Yellow',
    },
    {
        value: 'bg-polar-green',
        label: 'Polar Green'
    },
    {
        value: 'bg-cyan',
        label: 'Cyan'
    },
    {
        value: 'bg-daybreak-blue',
        label: 'Daybreak Blue'
    },
    {
        value: 'bg-geek-blue',
        label: 'Geek Blue'
    }, {
        value: 'bg-golden-purple',
        label: 'Golden Purple'
    }, {
        value: 'bg-magenta',
        label: 'Magenta'
    }
]


const Setting = () => {
    const dispatch = useDispatch();
    const handleChange = (value) => {
        dispatch(setBackgroundTheme(value))
    };

    return (
        <div>
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
        </div>
    );
};

export default Setting;
