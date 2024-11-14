import React from 'react';
import { Anchor } from 'antd';
import { Link } from 'react-router-dom'; // Import the Link component from react-router-dom

function Navbar() {
  return (
    <>
      <div style={{ padding: '20px' }}>
        <Anchor direction="horizontal">
          <Anchor.Link key="home" href="/" title="Home" />
          <Anchor.Link
            key="browse-media"
            href="/browse-media"
            title="Browse Media"
          />
          <Anchor.Link
            key="manage-media"
            href="/manage-media"
            title="Manage Media"
          />
          <Anchor.Link
            key="manage-inventory"
            href="/manage-inventory"
            title="Manage Inventory"
          />
        </Anchor>
      </div>
    </>
  );
}

export default Navbar;