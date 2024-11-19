import React, { useState, useEffect } from 'react';
import { Anchor, Layout, Input, Drawer, Button, Menu, Switch } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import '../CSS/navbar.css';

//Assets
import logo from '../Assets/logo.png';
import AnchorLink from 'antd/es/anchor/AnchorLink';

const { Header } = Layout;
const { Search } = Input;

function Navbar() {

  {/*Function to handle search */}

  const handleSearch = (value) => {
    console.log("Search Input:", value);

    //search logic to be added here
  };

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isToggled, setIsToggled] = useState(false);

  {/* Slider Button Initial State */}

  useEffect(() => {
    const savedToggleState = localStorage.getItem('sliderState');
    if (savedToggleState !== null) {
      setIsToggled(savedToggleState === 'true');
    }}, []);

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  const handleToggle = (checked) => {
    setIsToggled(checked);
    localStorage.setItem('sliderState', checked); //save slider state to localStorage
    console.log('Toggle Status:', checked ? 'On' : 'Off');
  };

  return (
    <Layout>
      <Header className="navbar-header fixed-header">
        <div
          style={{
            display: 'flex',
            alignItems: 'center', 
            justifyContent: 'flex-start',
            width: '70%',
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{
              height: '70px',
              marginRight: '20px', 
            }}
          />
          <span
            style={{
              color: 'white',
              fontSize: '30px',
              fontWeight: 'bold',
            }}
          >
            Advanced Media Library
          </span>

          {/* Search Bar */}
        <Search
        placeholder="Search Media"
        allowClear
        enterButton
        onSearch={handleSearch}
        style={{
          width: '30%',
         // marginRight: '20px',
          marginLeft: '50px',
        }}
        />
        </div>

        <Anchor
          direction="horizontal"
          className="navbar-container"
        >
          <Anchor.Link
            key="home"
            href="/homepage"
            title="Home"
            className="navbar-link" 
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/homepage';
            }}
          />
          <Anchor.Link
            key="browse-media"
            href="/browse-media"
            title="Browse Media"
            className="navbar-link"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/browse-media';
            }}
          />
          <Anchor.Link
            key="manage-media"
            href="/manage-media"
            title="Manage Media"
            className="navbar-link" 
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/manage-media';
            }}
          />

          {/* Render Manage Inventory on toggle state */}

          {isToggled && (
          <Anchor.Link
            key="manage-inventory"
            href="/manage-inventory"
            title="Manage Inventory"
            className="navbar-link"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/manage-inventory';
            }}
          />
          )}
        </Anchor>
        {/* Hamburger Menu Btn */}

        <Button
        type="text"
        icon={<MenuOutlined style={{ fontSize: '24px', color: 'white' }} />}
        onClick={showDrawer}
        style={{ marginLeft: 'auto '}}
        />

        {/* Drawer Component */}

        <Drawer
        title={<span style={{color: 'white' }}>Menu</span>}
        placement='right'
        onClose={closeDrawer}
        visible={isDrawerVisible}
        bodyStyle={{ backgroundColor: '#124E78', color: 'white' }}
        drawerStyle={{ backgroundColor: '#124E78' }}

        >
          <Anchor direction='vertical' className='navbar-container'>
            <Anchor.Link
            key="home"
            href='/homepage'
            title="Home"
            className='drawer-link'
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/homepage';
            }}/>
            <Anchor.Link
            key="browse-media"
            href='/browse-media'
            title="Browse Media"
            className='drawer-link'
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/browse-media';
            }}/>
            <Anchor.Link
            key="manage-media"
            href='/manage-media'
            title="Manage Media"
            className='drawer-link'
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/manage-media';
            }}/>

            {/* Render Manage Inventory on toggle state */}

            {isToggled && (
            <Anchor.Link
            key="manage-inventory"
            href='/manage-inventory'
            title="Manage Inventory"
            className='drawer-link'
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/manage-inventory';
            }}/>
          )}
          </Anchor>

          {/* Toggle Slider */}

          <div style={{ marginTop: '20px', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Switch
            checked={isToggled}
            onChange={handleToggle}
            checkedChildren="On"
            unCheckedChildren="Off"
            style={{
              backgroundColor: isToggled ? '#4CAF50' : '#D9D9D9',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
            }}
            />
            <span className='slider-description'>
              {isToggled ? 'Branch Manager Mode Enabled' : 'Branch Manager Mode Disabled'}
            </span>
          </div>
        </Drawer>
      </Header>
    </Layout>
  );
}

export default Navbar;