import React, {useState} from 'react';
import {Form, Input, notification, Select} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFaceFrown} from "@fortawesome/free-solid-svg-icons";
import {searchAPI} from "@/apis/search.jsx";
import {setSearchResult} from "@/store/features/musicSlice.jsx";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const {Search} = Input;
const options = [
    {
        value: 'album',
        label: 'Album',
    },
    {
        value: 'artist',
        label: 'Artist',
    },
    {
        value: 'track',
        label: 'Track',
    }
]
const iconColor = {color: "#74C0FC"};

const SearchForm = () => {
    const [api, contextHolder] = notification.useNotification();
    const [isLoading, setIsLoading] = useState(false);
    const [offsetNumber, setOffsetNumber] = useState(0)
    const [searchData, setSearchData] = useState({
        q: 'Taylor Swift',
        type: 'artist',
        market: 'NZ',
        limit: 20,
        offset: offsetNumber
    })

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const handleSelectChange = (value) => {
        setSearchData(prevState => {
            return {
                ...prevState,
                type: value
            }
        })
    }
    const handleSearchChange = ({target: {value}}) => {
        setSearchData(prevState => {
            return {
                ...prevState,
                q: value
            }
        })
    }
    const onSearch = async (value, _e) => {
        setIsLoading(true);
        let res;
        if (value === '') {
            api.open({
                message: 'Warning',
                description:
                    'You have searched nothing. What about Taylor Swift? ^_^',
                icon: (
                    <FontAwesomeIcon icon={faFaceFrown} style={iconColor}/>
                ),
            });
            setIsLoading(false);
            return;
        }
        try {
            res = await searchAPI(searchData);
            dispatch(setSearchResult(JSON.parse(JSON.stringify(res))));
        } catch (error) {
            console.error('请求错误', error);
        } finally {
            setIsLoading(false);
            navigate('/searchResult', {replace: true, state: {someData: JSON.parse(JSON.stringify(res))}})
        }
    }
    return (
        <div>
            {contextHolder}
            <Form className={"flex-center gap-4 mx-4"}>
                <Search
                    value={searchData.q}
                    onChange={handleSearchChange}
                    placeholder="Press Enter to Search"
                    enterButton="Search"
                    onSearch={onSearch}
                    size="large"
                    loading={isLoading}
                    style={{width: '600px'}}
                />
                <Select className={'w-24'} size={'large'} options={options}
                        onChange={handleSelectChange}
                        defaultValue={'Artist'}/>
            </Form>
        </div>
    );
};

export default SearchForm;