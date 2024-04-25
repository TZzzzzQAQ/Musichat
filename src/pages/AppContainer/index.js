import React, {useState} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Layout, Menu, Button, theme, Avatar} from 'antd';
import './index.scss'
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import PlayBar from "@/pages/PlayBar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {
    faClock, faCompactDisc,
    faGear,
    faHeart, faHouse,
    faList,
    faMagnifyingGlass, faMicrophoneLines,
    faRecordVinyl,
    faUser, faComments
} from "@fortawesome/free-solid-svg-icons";
import SearchForm from "@/components/SearchForm";

const {
    Header,
    Sider,
    Content,
    Footer
} = Layout;

const iconColor = {color: "#74C0FC"};

const item = [
    {
        key: '1',
        icon: <FontAwesomeIcon icon={faUser} style={iconColor}/>,
        label: 'User',
        children: [
            {
                key: '/account',
                icon: <FontAwesomeIcon icon={faUser} style={iconColor}/>,
                label: 'Account',
            },
            {
                key: '/setting',
                icon: <FontAwesomeIcon icon={faGear} style={iconColor}/>,
                label: 'Setting'
            }
        ]
    },
    {
        key: '2',
        icon: <FontAwesomeIcon icon={faRecordVinyl} style={iconColor}/>,
        label: 'Library',
        children: [
            {
                key: '/recent',
                icon: <FontAwesomeIcon icon={faClock} style={iconColor}/>,
                label: 'Recent'
            },
            {
                key: '/favourite',
                icon: <FontAwesomeIcon icon={faHeart} style={iconColor}/>,
                label: 'Favourite'
            }, {
                key: '/playlist',
                icon: <FontAwesomeIcon icon={faList} style={iconColor}/>,
                label: 'Playlist'
            }
        ]
    },
    {
        key: '3',
        icon: <FontAwesomeIcon icon={faMagnifyingGlass} style={iconColor}/>,
        label: 'Discovery',
        children: [
            {
                key: '/home',
                icon: <FontAwesomeIcon icon={faHouse} style={iconColor}/>,
                label: 'Home'
            }, {
                key: '/artist',
                icon: <FontAwesomeIcon icon={faMicrophoneLines} style={iconColor}/>,
                label: 'Artist'
            }, {
                key: '/album',
                icon: <FontAwesomeIcon icon={faCompactDisc} style={iconColor}/>,
                label: 'Album'
            }, {
                key: '/searchResult',
                icon: <FontAwesomeIcon icon={faMagnifyingGlass} style={iconColor}/>,
                label: 'Search'
            }
        ]
    },
    {
        key: '/chatRoom',
        icon: <FontAwesomeIcon icon={faComments} style={iconColor}/>,
        label: 'ChatRoom'
    }
]


const AppContainer = () => {
    const [collapsed, setCollapsed] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    const clickHandler = (e) => {
        navigate(e.key, {replace: true})
    }
    const avatarClickHandler = () => {
        navigate('/account', {replace: true})
    }

    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{
                    background: colorBgContainer,
                    height: '100 %',
                    borderRadius: '10px',
                }}
                className="custom-sider">
                <div className="demo-logo-vertical"/>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={item}
                    onClick={clickHandler}
                    selectedKeys={[location.pathname]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        background: colorBgContainer,
                        margin: '16px',
                        padding: '0px 12px',
                        borderRadius: borderRadiusLG,
                    }}
                    className={'flex-center'}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            ...iconColor,
                            fontSize: '16px',
                            width: '32px',
                            height: '32px',
                        }}
                    />
                    <SearchForm/>
                    <Avatar
                        style={{
                            ...iconColor,
                            cursor: 'pointer',
                            width: '50px',
                            height: '50px',
                            border: 'none'
                        }}
                        icon={<UserOutlined/>}
                        onClick={avatarClickHandler}
                    />
                </Header>
                <Content
                    style={{
                        margin: '16px',
                        padding: 16,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet/>
                </Content>
                <Footer style={{
                    background: colorBgContainer,
                    margin: '16px',
                    padding: '0px 10px',
                    height: '80px',
                    borderRadius: borderRadiusLG,
                }}>
                    <PlayBar/>
                </Footer>
            </Layout>
        </Layout>
    );
};
export default AppContainer;