import {useState} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Layout, Menu, Button, theme, Avatar} from 'antd';
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import PlayBar from "@/pages/PlayBar/PlayBar.jsx";
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
import SearchForm from "@/components/SearchForm.jsx";

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
        icon: <FontAwesomeIcon icon={faMagnifyingGlass} style={iconColor} />,
        label: 'Discovery',
        children: [
          {
            key: 'search',
            icon: <FontAwesomeIcon icon={faMagnifyingGlass} style={iconColor} />,
            label: 'Search',
            children: [
              {
                key: '/artist',
                icon: <FontAwesomeIcon icon={faMicrophoneLines} style={iconColor} />,
                label: 'Artist'
              },
              {
                key: '/album',
                icon: <FontAwesomeIcon icon={faCompactDisc} style={iconColor} />,
                label: 'Album'
              }
            ]
          }
        ]
    },
    {
        key: '/chatWithBot',
        icon: <FontAwesomeIcon icon={faComments} style={iconColor}/>,
        label: 'chatWithBot'
    }
]


const AppContainer = () => {
    const [collapsed, setCollapsed] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const {
        token: {borderRadiusLG},
    } = theme.useToken();

    const clickHandler = (e) => {
        navigate(e.key, {replace: true})
    }
    const avatarClickHandler = () => {
        navigate('/account', {replace: true})
    }

    return (
        <Layout className={'bg-transparent rounded-2xl'}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{
                    background: 'rgba(255,255,255,0)',
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
                    style={{background: "transparent"}}
                    selectedKeys={[location.pathname]}
                />
            </Sider>
            <Layout className={'bg-transparent'}>
                <Header
                    className={'flex-center bg-transparent mt-4'}
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
                        background: "transparent",
                    }}
                >
                    <div className={'h-[30rem]'}>
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