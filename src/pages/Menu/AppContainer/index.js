import React, {useState} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faList, fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {Layout, Menu, Button, theme, Avatar} from 'antd';
import './index.scss'
import {Outlet, useNavigate} from "react-router-dom";
import SearchBar from "@/components/SearchBar/SearchBar";
import PlayBar from "src/pages/PlayBar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

library.add(fas, far, fab);

const {
    Header,
    Sider,
    Content,
    Footer
} = Layout;
const iconColor = {color: "#74C0FC",};
const item = [
    {
        key: '1',
        icon: <FontAwesomeIcon icon="fa-solid fa-user" style={iconColor}/>,
        label: 'User',
        children: [
            {
                key: '/account',
                icon: <FontAwesomeIcon icon="fa-solid fa-user" style={iconColor}/>,
                label: 'Account',
            },
            {
                key: '/setting',
                icon: <FontAwesomeIcon icon="fa-solid fa-gear" style={iconColor}/>,
                label: 'Setting'
            }
        ]
    },
    {
        key: '2',
        icon: <FontAwesomeIcon icon="fa-solid fa-record-vinyl" style={iconColor}/>,
        label: 'Library',
        children: [
            {
                key: '/recent',
                icon: <FontAwesomeIcon icon="fa-solid fa-clock" style={iconColor}/>,
                label: 'Recent'
            },
            {
                key: '/favourite',
                icon: <FontAwesomeIcon icon="fa-solid fa-heart" style={iconColor}/>,
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
        icon: <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" style={iconColor}/>,
        label: 'Discovery',
        children: [
            {
                key: '/home',
                icon: <FontAwesomeIcon icon="fa-solid fa-house" style={iconColor}/>,
                label: 'Home'
            }, {
                key: '/artist',
                icon: <FontAwesomeIcon icon="fa-solid fa-microphone-lines" style={iconColor}/>,
                label: 'Artist'
            }, {
                key: '/album',
                icon: <FontAwesomeIcon icon="fa-solid fa-compact-disc" style={iconColor}/>,
                label: 'Album'
            }
        ]
    },
]
const AppContainer = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()
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
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        background: colorBgContainer,
                        margin: '16px',
                        padding: '0px 12px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: borderRadiusLG,
                    }}
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
                    <SearchBar/>
                    <Avatar
                        style={{
                            ...iconColor,
                            cursor: 'pointer',
                            width: '50px',
                            height: '45.65px',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        icon={<UserOutlined/>}
                        onClick={avatarClickHandler}
                    />
                </Header>
                <Content
                    style={{
                        margin: '16px',
                        padding: 24,
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