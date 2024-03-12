import React, {useState} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';

import {Layout, Menu, Button, theme, Avatar} from 'antd';
import './index.scss'
import {Outlet, useNavigate} from "react-router-dom";
import SearchBar from "@/components/SearchBar/SearchBar";
import PlayBar from "src/pages/PlayBar";

const {
    Header,
    Sider,
    Content,
    Footer
} = Layout;

const item = [
    {
        key: '1',
        icon: <UserOutlined/>,
        label: 'User',
        children: [
            {
                key: '/account',
                icon: <UserOutlined/>,
                label: 'Account',
            },
            {
                key: '/setting',
                icon: <UserOutlined/>,
                label: 'Setting'
            }
        ]
    },
    {
        key: '2',
        icon: <VideoCameraOutlined/>,
        label: 'Library',
        children: [
            {
                key: '/recent',
                icon: <VideoCameraOutlined/>,
                label: 'Recent'
            },
            {
                key: '/favourite',
                icon: <VideoCameraOutlined/>,
                label: 'Favourite'
            }, {
                key: '/playlist',
                icon: <VideoCameraOutlined/>,
                label: 'Playlist'
            }
        ]
    },
    {
        key: '3',
        icon: <UploadOutlined/>,
        label: 'Discovery',
        children: [
            {
                key: '/home',
                icon: <VideoCameraOutlined/>,
                label: 'Home'
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
                            fontSize: '16px',
                            width: 32,
                            height: 32,
                        }}
                    />
                    <SearchBar/>
                    <Avatar
                        style={{
                            backgroundColor: '#87d068',
                        }}
                        icon={<UserOutlined/>}
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