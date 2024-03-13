import React, {useState} from 'react';
import {Input} from 'antd';
import './SearchBar.scss'

const {Search} = Input;
const App = () => {
    const [isLoading, setIsLoading] = useState(false);
    const onSearch = (value, _e, info) => {
        setIsLoading(prevState => !prevState)
    }
    return (
        <div className={'searchBarContainer'}>
            <Search
                placeholder="input search text"
                enterButton="Search"
                onSearch={onSearch}
                size="large"
                loading={isLoading}
                style={{width: '600px'}}
            />
        </div>
    )
};
export default App;