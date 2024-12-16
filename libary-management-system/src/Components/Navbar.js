import React, { useState, useEffect, useContext } from 'react';
import { Layout, Input, Menu, Button, Switch, Modal, List, Drawer, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../CSS/navbar.css'; // Custom CSS file
import { UserContext } from '../Context/UserContext';  // Import UserContext
import { useSearch } from '../Context/SearchContext'; 
import Cookies from 'js-cookie'; // Import js-cookie
import { SettingOutlined, MenuOutlined } from '@ant-design/icons'; // Import settings cog icon


// Assets
import logo from '../Assets/logo.png';
import axios from 'axios';

const { Header } = Layout;
const { Search } = Input;

function Navbar() {
  const { setUserId, setUserName, userName } = useContext(UserContext);  // Destructure userName and setUserName
  const [isToggled, setIsToggled] = useState(false);
  const [users, setUsers] = useState([]); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loginText, setLoginText] = useState("Login");
  const [isSettingsVisible, setIsSettingsVisible] = useState(false); // For settings modal visibility
  const [drawerVisible, setDrawerVisible] = useState(false); //for hamburger menu on smaller screens
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  //mobile view state on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  // Initialize toggle state from localStorage
  useEffect(() => {
    const savedToggleState = localStorage.getItem('sliderState');
    if (savedToggleState !== null) {
      setIsToggled(savedToggleState === 'true');
    }

    // Check cookies to set the logged-in user on page load
    const storedUserName = Cookies.get('userName');
    const storedUserId = Cookies.get('userId');

    if (storedUserName && storedUserId) {
      // Set the user details from cookies to context and update login button text
      setUserName(storedUserName);
      setUserId(storedUserId);
      setLoginText(storedUserName);
    }
  }, [setUserName, setUserId]); // Only update when the component mounts

  const handleToggle = (checked) => {
    setIsToggled(checked);
    localStorage.setItem('sliderState', checked); // Save state to localStorage
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const fetchUsers = async () => {
    await axios.get("http://localhost:8080/api/users")
      .then(res => {
        setUsers(res.data); 
      })
      .catch(err => console.log(err));
  };

  const handleLogin = async (userId, userName) => {
    console.log("User ID:", userId);

    // Store user details in cookies for persistence across pages
    Cookies.set('userId', userId, { expires: 7 });
    Cookies.set('userName', userName, { expires: 7 });

    // Update the context with the userId and userName
    setUserId(userId);
    setUserName(userName);

    // Update the login button text
    setLoginText(userName);
  };

  const handleLogout = () => {
    // Remove cookies on logout
    Cookies.remove('userId');
    Cookies.remove('userName');

    // Reset context values to logged-out state
    setUserId(null);
    setUserName(null);

    // Reset login button text
    setLoginText("Login");
    setIsSettingsVisible(false); 
  };

  const showSettingsModal = () => {
    setIsSettingsVisible(true);
  };

  const handleCancelSettings = () => {
    setIsSettingsVisible(false);
  };

  // Navbar search 
  const { searchValue, setSearchValue } = useSearch(); // Get searchValue and setSearchValue
  const navigate = useNavigate();

  const onSearch = (value) => {
    navigate(`/browse-media?search=${value}`);
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <Layout>
      {/* Top Navbar */}
      <Header className="navbar-header">
        <div className="navbar-top">
          {/* Left: Logo and Title */}
          <div className="navbar-left">
            <a href="Homepage" className="navbar-home-link">
              <img src={logo} alt="AML Logo" className="navbar-logo" />
              <span className="navbar-title">AML</span>
            </a>
          </div>  

          {/* Right: Search Bar and Login Button */}
          <div className="navbar-right">
          {isMobileView && (
          <Button
          className='hamburger-button'
          icon={<MenuOutlined />}
          onClick={toggleDrawer}
          />

            )}
            {!isMobileView && (
              <>
            <Search
              placeholder="Search"
              className="navbar-search"
              style={{ width: 250 }}
              value={searchValue} // Controlled input
              onChange={(e) => setSearchValue(e.target.value)} // Update search value
              onSearch={onSearch}
            />
              <Button type="primary" className="navbar-login" onClick={() => {
              showModal();
              fetchUsers();
            }}>
              {loginText} {/* Display the user's name if logged in */}
            </Button>
          {/* Settings Icon next to Login Button */}
          <SettingOutlined
            className="settings-icon"
            style={{ fontSize: '24px', color: '#white', marginLeft: '10px', cursor: 'pointer' }}
            onClick={showSettingsModal} // Open the settings modal
            data-testid="settings-icon"
          />
          </>
            )}
              
          </div>
        </div>
      </Header>

      {/* Secondary Navbar */}
      <div className="secondary-navbar">
        <div style={{ flexGrow: 1 }}>
          <Menu mode="horizontal" className="secondary-menu">
            <Menu.Item key="browse-media">
              <a href="/browse-media">Browse Media</a>
            </Menu.Item>
            <Menu.Item key="manage-media">
              <a href="/manage-media">Manage Media</a>
            </Menu.Item>
            {isToggled && (
              <Menu.Item key="manage-inventory">
                <a href="/manage-inventory">Manage Inventory</a>
              </Menu.Item>
            )}
          </Menu>
        </div>
        <div className="toggle-container">
          <Switch
            checked={isToggled}
            onChange={handleToggle}
            checkedChildren="On"
            unCheckedChildren="Off"
          />
          <span className="toggle-description">
            {isToggled
              ? 'Branch Manager Mode Enabled'
              : 'Branch Manager Mode Disabled'}
          </span>
        </div>
      </div>

      {/* Drawer for small screens */}
      <Drawer
      title='Menu'
      placement='right'
      onClose={toggleDrawer}
      visible={drawerVisible}
      >

        {/* Search bar in Drawer */}
        <div className='drawer-search-section' style={{ marginTop: '20px' }}>
          <Input.Search
          placeholder='Search'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSearch={onSearch}
          enterButton
          className='drawer-search-bar'
          />
        </div>

        <Menu mode='vertical'>
          <Menu.Item key={'browse-media-mobile'}>
            <a href='/browse-media'>Browse Media</a>
          </Menu.Item>
          <Menu.Item key={'manage-media-mobile'}>
            <a href='/manage-media'>Manage Media</a>
          </Menu.Item>
          {isToggled && (
            <Menu.Item key={'manage-inventory-mobile'}>
              <a href='/manage-inventory'>Manage Inventory</a>
            </Menu.Item>
          )}
        </Menu>

        {/* Login and Settings for hamburger menu */}
        <div className='drawer-login-section' style={{ marginTop: '20px' }}>
          <Button type='primary' block onClick={() => {
            showModal();
            fetchUsers();
          }}>
            {loginText}
          </Button>
          <Button
          type='default'
          block
          style={{ marginTop: '10px' }}
          icon={<SettingOutlined />}
          onClick={showSettingsModal}
          >
            Settings
          </Button>
        </div>

        {/* BM toggle */}
        <div className='drawer-toggle-section' style={{ marginTop: '20px' }}>
          <Typography.Text>Branch Manager Mode</Typography.Text>
          <Switch
          checked={isToggled}
          onChange={handleToggle}
          checkedChildren='On'
          unCheckedChildren='Off'
          style={{ marginLeft: '10px' }}
          />
        </div>
      </Drawer>

      {/* Login Modal */}
        <Modal
          title="Select User to Login"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <List
            itemLayout="horizontal"
            dataSource={users}
            renderItem={(user) => (
          <List.Item onClick={() => {
            handleLogin(user._id, `${user.first_name} ${user.last_name}`);
            setIsModalVisible(false); 
          }} className="user-item">
            <List.Item.Meta
              title={`${user.first_name} ${user.last_name}`}
              description={user.email}
            />
          </List.Item>
            )}
          />
        </Modal>
        {/* Settings Modal for Logout */}
      <Modal
        title="Settings"
        visible={isSettingsVisible}
        onCancel={handleCancelSettings}
        footer={null}
      >
        <Button
          type="primary" danger onClick={handleLogout} block className="logout-btn"  
          >Logout
        </Button>
      </Modal>
    </Layout>
  );
}

export default Navbar;
