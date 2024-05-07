import {useEffect, useState} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import {Layout, Menu, Button, Avatar} from 'antd';
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import PlayBar from "@/pages/Menu/PlayBar.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {
    faCompactDisc,
    faHeart, faHouse,
    faList,
    faMagnifyingGlass, faMicrophoneLines,
    faUser, faComments, faRobot
} from "@fortawesome/free-solid-svg-icons";
import SearchForm from "@/components/SearchForm.jsx";
import ToggleDark from "@/components/ToggleDark.jsx";
import {debounce} from "lodash/function";
import {useSelector} from "react-redux";

const {Header, Sider, Content, Footer} = Layout;

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
                key: '/favourite',
                icon: <FontAwesomeIcon icon={faHeart} style={iconColor}/>,
                label: 'GuessYouLike'
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
                key: '/artist',
                icon: <FontAwesomeIcon icon={faMicrophoneLines} style={iconColor}/>,
                label: 'RandomArtist'
            },
            {
                key: '/newRelease',
                icon: <FontAwesomeIcon icon={faCompactDisc} style={iconColor}/>,
                label: 'NewRelease'
            },
            {
                key: '/searchResult',
                icon: <FontAwesomeIcon icon={faCompactDisc} style={iconColor}/>,
                label: 'SearchResult'
            }
        ]
    },
    {
        key: '/chatWithBot',
        icon: <FontAwesomeIcon icon={faRobot} style={iconColor}/>,
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
    const dataFromRedux = useSelector(state => state.user)
    const [url, setUrl] = useState('')

    const clickHandler = (e) => {
        navigate(e.key, {replace: true})
    }
    const avatarClickHandler = () => {
        navigate('/account', {replace: true})
    }
    useEffect(() => {
        avatarClickHandler()
    }, []);
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
    useEffect(() => {
        if (dataFromRedux.profile?.images?.length > 1) {
            setUrl(dataFromRedux.profile.images[1].url);
        }
    }, [dataFromRedux]);

    return (
        <Layout className={'bg-transparent rounded-2xl h-[45rem]'}>
            <Layout className={'bg-transparent rounded-2xl'}>
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
                        className={'flex justify-between items-center bg-transparent mt-4'}
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
                                border: 'none',
                                backgroundSize: 'cover',
                                backgroundImage: `url(${url})`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }}
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
                </Layout>

            </Layout>
            <Layout className={'bg-transparent'}>
                <Footer className={'bg-transparent h-20'}>
                    <PlayBar/>
                </Footer>
            </Layout>
        </Layout>
    );
};
export default AppContainer;