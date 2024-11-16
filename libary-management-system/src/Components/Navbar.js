import React from 'react';
import { Anchor, Layout } from 'antd';
import '../CSS/navbar.css';

//Assets
import logo from '../Assets/logo.png';

const { Header } = Layout;

function Navbar() {
  return (
    <Layout>
      <Header className="navbar-header fixed-header">
        <div
          style={{
            display: 'flex',
            alignItems: 'center', 
            justifyContent: 'flex-start',
            width: '100%',
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
              fontSize: '40px',
              fontWeight: 'bold',
            }}
          >
            Advanced Media Library
          </span>
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