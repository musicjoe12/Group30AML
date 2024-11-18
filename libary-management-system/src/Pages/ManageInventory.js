import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { DownOutlined } from '@ant-design/icons';
import { Table, Button, Modal, Form, Input, Select, Space } from 'antd';


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

    const createBook = async (book) => { 

      if(!book.title || !book.author || !book.genre || !book.availability || !book.description || !book.publicationYear || !book.image) {
        return alert('Please fill in all fields');
      }
      else{
        await axios.post('http://localhost:8080/api/add-book', book)
        .then(() => {
          setBooks([books, book])
        })
        .catch(err => console.log(err));
        setIsModalVisible(false); 
        form.resetFields(); 
      }
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { Option } = Select; // Import Option from Select

  const addBook = (values) => {
    const newBook = {
      _id: `${Date.now()}`, 
      ...values,
    };
    setBooks([...books, newBook]); 
    setIsModalVisible(false); 
    form.resetFields(); 
  };

  return (
    <div style={{ padding: '20px', marginTop: '70px' }}>
      {/* Table */}
      <div style={{ marginTop: '20px' }}>
        <Table columns={columns} dataSource={books} rowKey="_id" />
      </div>

      {/* Add Button */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Add New Book
        </Button>
      </div>

      {/* Modal */}
      <Modal
        title="Add New Book"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Submit
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={createBook}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter the title' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="author"
            label="Author"
            rules={[{ required: true, message: 'Please enter the author' }]}
          >
            <Input />  
          </Form.Item>
          <Form.Item
            name = "description"
            label = "Description"
            rules = {[{ required: true, message: 'Please enter the description'}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="genre"
            label="Genre"
            rules={[{ required: true, message: 'Please select the genre' }]}
          >
            <Select>
              <Option value="Fiction">Fiction</Option>
              <Option value="Non-fiction">Non-fiction</Option>
              <Option value="Sci-fi">Sci-fi</Option>
              <Option value="Biography">Biography</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="publication-year"
            label="Publication-Year"
            rules={[{ required: true, message: 'Please enter the year' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="image"
            label="Image-Link"
            rules={[{ required: true, message: 'Please enter the Image-Link' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="availability"
            label="Availability"
            rules={[{ required: true, message: 'Please select availability' }]}
          >
            <Select>
              <Option value={true}>Available</Option>
              <Option value={false}>Reserved</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};


export default ManageInventory;
