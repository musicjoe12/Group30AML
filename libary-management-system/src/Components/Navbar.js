import React, { useState } from 'react';
import { Anchor, Layout, Input, Drawer, Button, Menu } from 'antd';
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

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
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

        {/* Hamburger Menu Btn */}

        <Button
        type="text"
        icon={<MenuOutlined style={{ fontSize: '24px', color: 'white' }} />}
        onClick={showDrawer}
        style={{ marginLeft: 'auto '}}
        />

        {/* Drawer Component */}

        <Drawer
        title='Menu'
        placement='right'
        onClose={closeDrawer}
        visible={isDrawerVisible}>
          <Anchor direction='vertical' className='navbar-container'>
            <Anchor.Link
            key="home"
            href='/homepage'
            title="Home"
            className='navbar-link'
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/homepage';
            }}/>
            <Anchor.Link
            key="browse-media"
            href='/browse-media'
            title="Browse Media"
            className='navbar-link'
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/browse-media';
            }}/>
            <Anchor.Link
            key="manage-media"
            href='/manage-media'
            title="Manage Media"
            className='navbar-link'
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/manage-media';
            }}/>
            <Anchor.Link
            key="manage-inventory"
            href='/manage-inventory'
            title="Manage Inventory"
            className='navbar-link'
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/manage-inventory';
            }}/>
          </Anchor>
        </Drawer>

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
        </Anchor>
      </Header>
    </Layout>
  );
}

export default Navbar;