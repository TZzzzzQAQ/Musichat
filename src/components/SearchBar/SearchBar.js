import React, {useState} from 'react';
import {Input} from 'antd';
import './SearchBar.scss'

const {Search} = Input;
const App = () => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <div className={'searchBarContainer'}>
            <Search
                placeholder="input search text"
                enterButton="Search"
                size="large"
                loading={isLoading}
                style={{width: '600px'}}
            />
        </div>
    )
};
export default App;