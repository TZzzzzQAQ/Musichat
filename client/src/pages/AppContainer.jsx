// Import necessary hooks and components from React, ant-design, font-awesome, lodash, and react-router-dom libraries
import {useEffect, useState} from 'react';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import {Layout, Menu, Button, Avatar} from 'antd';
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import PlayBar from "@/pages/Menu/PlayBar.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// Import specific icons from FontAwesome
import {faCompactDisc, faHeart, faHouse, faList, faMagnifyingGlass, faMicrophoneLines, faUser, faComments, faRobot} from "@fortawesome/free-solid-svg-icons";
import SearchForm from "@/components/SearchForm.jsx";  // Custom search form component
import ToggleDark from "@/components/ToggleDark.jsx";  // Custom toggle for dark mode
import {debounce} from "lodash/function";  // Debounce function from lodash to limit function executions
import {useSelector} from "react-redux";  // Hook to access redux store state

const {Header, Sider, Content, Footer} = Layout;  // Destructure specific components from antd Layout

const iconColor = {color: "#74C0FC"};  // Define a constant for icon color style

// Define navigation menu items with icons and labels
const item = [
    {
        key: '/home', icon: <FontAwesomeIcon icon={faHouse} style={iconColor}/>, label: 'home'
    },
    {
        key: '1', icon: <FontAwesomeIcon icon={faUser} style={iconColor}/>, label: 'User',
        children: [
            {key: '/account', icon: <FontAwesomeIcon icon={faUser} style={iconColor}/>, label: 'Account'},
            {key: '/favourite', icon: <FontAwesomeIcon icon={faHeart} style={iconColor}/>, label: 'Guess You Like'},
            {key: '/playlist', icon: <FontAwesomeIcon icon={faList} style={iconColor}/>, label: 'Playlist'},
            {key: '/yourFollow', icon: <FontAwesomeIcon icon={faUser} style={iconColor}/>, label: 'Your Follow'}
        ]
    },
    {
        key: '3', icon: <FontAwesomeIcon icon={faMagnifyingGlass} style={iconColor}/>, label: 'Discovery',
        children: [
            {key: '/artist', icon: <FontAwesomeIcon icon={faMicrophoneLines} style={iconColor}/>, label: 'RandomArtist'},
            {key: '/newRelease', icon: <FontAwesomeIcon icon={faCompactDisc} style={iconColor}/>, label: 'NewRelease'},
            {key: '/searchResult', icon: <FontAwesomeIcon icon={faCompactDisc} style={iconColor}/>, label: 'SearchResult'}
        ]
    },
    {key: '/chatWithBot', icon: <FontAwesomeIcon icon={faRobot} style={iconColor}/>, label: 'chatWithBot'},
    {key: '/groupChat', icon: <FontAwesomeIcon icon={faComments} style={iconColor}/>, label: 'GroupChat'}
]

// Define the main container component
const AppContainer = () => {
    const [collapsed, setCollapsed] = useState(window.innerWidth < 1024);  // State for sidebar collapsed status
    const navigate = useNavigate();  // Hook to handle navigation
    const location = useLocation();  // Hook to get location object
    const dataFromRedux = useSelector(state => state.user)  // Retrieve user data from redux store
    const [url, setUrl] = useState('')  // State to hold the avatar image URL

    // Handler for navigation menu click events
    const clickHandler = (e) => {
        navigate(e.key, {replace: true})
    }

    // Handler for clicking the avatar
    const avatarClickHandler = () => {
        navigate('/account', {replace: true})
    }

    // UseEffect for handling resize events with debounce
    useEffect(() => {
        const handleResize = debounce(() => {
            setCollapsed(window.innerWidth < 1280);
        }, 500);
        window.addEventListener('resize', handleResize);
        return () => {
            handleResize.cancel();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // UseEffect to update the avatar URL based on redux state changes
    useEffect(() => {
        if (dataFromRedux.profile?.images?.length > 1) {
            setUrl(dataFromRedux.profile.images[1].url);
        }
    }, [dataFromRedux]);

    // Component layout using antd components
    return (
        <Layout className={'bg-transparent rounded-2xl h-[45rem]'}>
            <Layout className={'bg-transparent rounded-2xl'}>
                <ToggleDark/>  // Dark mode toggle component
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    style={{background: 'rgba(255,255,255,0)', height: '100%', borderRadius: '10px'}}
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
                            style={{...iconColor, fontSize: '16px', width: '32px', height: '32px'}}
                        />
                        <SearchForm/>  // Search form component
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
                            <Outlet/>  // Placeholder for nested routes
                        </div>
                    </Content>
                </Layout>

            </Layout>
            <Layout className={'bg-transparent'}>
                <Footer className={'bg-transparent h-20'}>
                    <PlayBar/>  // Custom component for playback controls
                </Footer>
            </Layout>
        </Layout>
    );
};
export default AppContainer;  // Export the AppContainer component
