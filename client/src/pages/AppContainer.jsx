import {useEffect, useState} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Layout, Menu, Button, Avatar} from 'antd';
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import PlayBar from "@/pages/PlayBar/PlayBar.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {
    faClock, faCompactDisc,
    faGear,
    faHeart, faHouse,
    faList,
    faMagnifyingGlass, faMicrophoneLines,
    faUser, faComments
} from "@fortawesome/free-solid-svg-icons";
import SearchForm from "@/components/SearchForm.jsx";
import ToggleDark from "@/components/ToggleDark.jsx";
import {debounce} from "lodash/function";

const {
    Header,
    Sider,
    Content,
    Footer
} = Layout;

const iconColor = {color: "#74C0FC"};

const item = [
    {
        key: '/home',
        icon: <FontAwesomeIcon icon={faHouse} style={iconColor}/>,
        label: 'home'
    },
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
            },
            {
                key: '/setting',
                icon: <FontAwesomeIcon icon={faGear} style={iconColor}/>,
                label: 'Setting'
            }
        ]
    },
    {
        key: '3',
        icon: <FontAwesomeIcon icon={faMagnifyingGlass} style={iconColor}/>,
        label: 'Discovery',
        children: [
            {
                key: '/artist',
                icon: <FontAwesomeIcon icon={faMicrophoneLines} style={iconColor}/>,
                label: 'Artist'
            },
            {
                key: '/album',
                icon: <FontAwesomeIcon icon={faCompactDisc} style={iconColor}/>,
                label: 'Album'
            }
        ]
    },
    {
        key: '/chatWithBot',
        icon: <FontAwesomeIcon icon={faComments} style={iconColor}/>,
        label: 'chatWithBot'
    },
    {
        key: '/groupChat',
        icon: <FontAwesomeIcon icon={faComments} style={iconColor}/>,
        label: 'GroupChat'
    }
]

const AppContainer = () => {
    const [collapsed, setCollapsed] = useState(window.innerWidth < 1024);
    const navigate = useNavigate();
    const location = useLocation();

    const clickHandler = (e) => {
        navigate(e.key, {replace: true})
    }
    const avatarClickHandler = () => {
        navigate('/account', {replace: true})
    }

    useEffect(() => {
        const handleResize = debounce(() => {
            setCollapsed(window.innerWidth < 1280);
        }, 500);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            handleResize.cancel();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Layout className={'bg-transparent rounded-2xl h-[45rem]'}>
            <ToggleDark/>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{
                    background: 'rgba(255,255,255,0)',
                    height: '100 %',
                    borderRadius: '10px',
                }}
                className="">
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={item}
                    onClick={clickHandler}
                    style={{background: "transparent"}}
                    selectedKeys={[location.pathname]}
                />
            </Sider>
            <Layout className={'bg-transparent'}>
                <Header
                    className={'flex-center bg-transparent mt-4'}
                >
                    <Button
                        className={'invisible xl:visible'}
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
                        background: "transparent",
                    }}
                >
                    <div className={'h-[33rem]'}>
                        <Outlet/>
                    </div>
                </Content>
                <Footer className={'bg-transparent h-20'}>
                    <PlayBar/>
                </Footer>
            </Layout>
        </Layout>
    );
};
export default AppContainer;