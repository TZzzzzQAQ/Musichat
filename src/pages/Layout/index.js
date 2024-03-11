import React from 'react';
import './index.scss'
import AppContainer from "src/pages/AppContainer";

const Layout = () => {
    return (
        <div className={'box'}>
            <div className={'appContainer'}>
                <AppContainer/>
            </div>
        </div>
    );
};

export default Layout;
