import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Table, Button } from 'antd';

// Table Columns

// Data for Branches

// const items = [
//   {
//     key: 'branch1',
//     label: 'Branch 1',
//   },
//   {
  //     key: 'branch2',
  //     label: 'Branch 2',
  //   },
  // ];
  
  const ManageInventory = () => {
    //const [selectedBranch, setSelectedBranch] = useState('branch1'); // Default branch
    
    // Fetch data from API
    const [books, setBooks] = useState([]);
    //for updating/deleting phone number
    const [newBook, setNewBook] = useState(0)
    
    
    useEffect(() => {
        axios.get('http://localhost:8080/api/books')
        .then(books => setBooks(books.data))
        .catch(err => console.log(err));
      
    },[]); 
    
    //update phone number
    const updateBook = async (id) =>{
       await axios.post('http://localhost:8080/api/update-book/',{id, newBook})
    }
    
    //delete phone number
    const deleteBook = async (id) => {
       await axios.delete(`http://localhost:8080/api/delete-book/${id}`)
      .then(() => {
        setBooks(books.filter((book) => book._id !== id))
      })
      .catch(err => console.log(err));
    }
    
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
            <Button type="primary" danger onClick={() => {deleteBook(record._id)}}>
              Delete
            </Button>
            <Button type="primary" onClick={() => console.log(`Edit: ${record.title}`)}>
              Edit
            </Button>
          </Space>
        ),
      },
    ];
    
  
  // const handleMenuClick = ({ key }) => {
  //   setSelectedBranch(key);
  // };

  return (
    <div style={{ padding: '20px', marginTop: '70px' }}>
      {/* Dropdown Menu */}
      {/* <Dropdown
        menu={{
          bookData: books,
          onClick: handleMenuClick,
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Select Branch
            <DownOutlined />
          </Space>
        </a>
      </Dropdown> */}


      {/* Table */}
      <div style={{ marginTop: '20px' }}>
        <Table columns={columns} dataSource={books} />
      </div>
    </div>
  );
};

export default ManageInventory;
