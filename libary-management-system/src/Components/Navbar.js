import React, { useState, useEffect } from 'react';
import { Layout, Input, Menu, Button, Switch, Modal, Form, List, Avatar, Input as AntInput } from 'antd';
import '../CSS/navbar.css'; // Custom CSS file


// Assets
import logo from '../Assets/logo.png';
import axios from 'axios';

const { Header } = Layout;
const { Search } = Input;

function Navbar() {

  const [isToggled, setIsToggled] = useState(false);
  const [users, setUsers] = useState([]); 
  const [isModalVisible, setIsModalVisible] = useState(false);


  // Initialize toggle state from localStorage
  useEffect(() => {
    const savedToggleState = localStorage.getItem('sliderState');
    if (savedToggleState !== null) {
      setIsToggled(savedToggleState === 'true');
    }
  }, []);

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

  const fetchUsers = async() => {
    await axios.get("http://localhost:8080/api/users")
    .then(res => {
      setUsers(res.data); 
      //setIsModalVisible(false);
    })
    .catch(err => console.log(err));
  };
  const handleLogin = async(userId) => {
    console.log("User ID:", userId);
  };

  // User data source

  

  return (
    <Layout>
      {/* Top Navbar */}
      <Header className="navbar-header">
        <div className="navbar-top">
          {/* Left: Logo and Title */}
          <div class="navbar-left">
          <a href="Homepage" class="navbar-home-link">
            <img src={logo} alt="AML Logo" class="navbar-logo" />
            <span class="navbar-title">AML</span>
          </a>
        </div>

          {/* Right: Search Bar and Login Button */}
          <div className="navbar-right">
            <Search
              placeholder="Search"
              className="navbar-search"
              style={{ width: 250 }}
            />
            <Button type="primary" className="navbar-login" onClick={() => {
              showModal();
              fetchUsers();
              }}>
              Login
            </Button>
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
            <List.Item onClick={() => handleLogin(user._id)} className="user-item">
              <List.Item.Meta
                title={user.first_name + ' ' + user.last_name}  
                description={user.email}
              />
            </List.Item>
          )}
        />
      </Modal>
    </Layout>
  );
}

export default Navbar;
