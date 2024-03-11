import React, {useState} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import {Layout, Menu, Button, theme} from 'antd';
import './index.scss'
import ContentCarousel from "@/components/Carousel";
import {Outlet, useNavigate} from "react-router-dom";

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
                key: '4',
                icon: <UserOutlined/>,
                label: 'Account',
            },
            {
                key: '5',
                icon: <UserOutlined/>,
                label: 'Logout'
            }, {
                key: '6',
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
                key: '7',
                icon: <VideoCameraOutlined/>,
                label: 'Recent'
            },
            {
                key: '8',
                icon: <VideoCameraOutlined/>,
                label: 'Favourite'
            }, {
                key: '9',
                icon: <VideoCameraOutlined/>,
                label: 'Playlist'
            }
        ]
    },
    {
        key: '/browse',
        icon: <UploadOutlined/>,
        label: 'Home',
    },
]
const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const clickHandler = (e) => {
        // navigate(e.key, {replace: true})
    }
    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{
                    background: colorBgContainer,
                    height: '100 %'
                }}>
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
                        margin: '24px 16px',
                        padding: '0px 10px'
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
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet/>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    全银河系最强听歌APP
                </Footer>
            </Layout>
        </Layout>
    );
};
export default App;