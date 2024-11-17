import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Table, Button } from 'antd';

// Table Columns
const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Author',
    dataIndex: 'author',
    key: 'author',
  },
  {
    title: 'Genre',
    dataIndex: 'genre',
    key: 'genre',
  },
  {
    title: 'Availability',
    key: 'availability',
    dataIndex: 'availability',
    render: (available) => (available ? 'Available' : 'Reserved'),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary" onClick={() => console.log(`Transfer: ${record.title}`)}>
          Transfer
        </Button>
        <Button type="primary" danger onClick={() => console.log(`Delete: ${record.title}`)}>
          Delete
        </Button>
        <Button type="primary" onClick={() => console.log(`Edit: ${record.title}`)}>
          Edit
        </Button>
      </Space>
    ),
  },
];

// Data for Branches
const branchData = {
  branch1: [
    {
      key: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Classic',
      availability: true,
    },
    {
      key: '2',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Fiction',
      availability: false,
    },
  ],
  branch2: [
    {
      key: '1',
      title: '1984',
      author: 'George Orwell',
      genre: 'Dystopian',
      availability: true,
    },
    {
      key: '2',
      title: 'Brave New World',
      author: 'Aldous Huxley',
      genre: 'Science Fiction',
      availability: true,
    },
  ],
};

// Dropdown Items for Branches
const items = [
  {
    key: 'branch1',
    label: 'Branch 1',
  },
  {
    key: 'branch2',
    label: 'Branch 2',
  },
];

const ManageInventory = () => {
  const [selectedBranch, setSelectedBranch] = useState('branch1'); // Default branch

  // Handle menu selection
  const handleMenuClick = ({ key }) => {
    setSelectedBranch(key);
  };

  return (
    <div style={{ padding: '20px', marginTop: '70px' }}>
      {/* Dropdown Menu */}
      <Dropdown
        menu={{
          items,
          onClick: handleMenuClick,
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Select Branch
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>

      {/* Table */}
      <div style={{ marginTop: '20px' }}>
        <Table columns={columns} dataSource={branchData[selectedBranch]} />
      </div>
    </div>
  );
};

export default ManageInventory;
