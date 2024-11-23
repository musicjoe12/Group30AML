import React, { useState, useEffect, useContext, } from 'react';
import axios from 'axios';

import { DownOutlined } from '@ant-design/icons';
import { Table, Button, Modal, Form, Input, Select, Space } from 'antd';
import SearchFilter from '../Components/SearchFilter'; // Import SearchFilter

import { useNavigate } from 'react-router-dom'; // For Redirecting
import { message } from 'antd'; // Warning message

  const ManageInventory = () => {
    // Fetch data from API
    const [books, setBooks] = useState([]);
    //for updating/deleting book 
    const [newBook, setNewBook] = useState(0)
    //setting model visable or not for adding new book number
    const [isModalVisible, setIsModalVisible] = useState(false);
    //form for adding new book number
    const [form] = Form.useForm();
    //import Option from Select
    const { Option } = Select; 
    // Edit Modal visable
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    // Edit Form
    const [editForm] = Form.useForm();
    // Edit Book
    const [editingBook, setEditingBook] = useState(0);
    // For filtered data
    const [filteredBooks, setFilteredBooks] = useState([]); 
    // genres
    const [genres, setGenres] = useState(['Fiction', 'Non-fiction', 'Sci-fi', 'Biography']); 
    // State for selected transfer branch
    const [transferBranch, setTransferBranch] = useState(''); 

    const [isTransferModalVisible, setIsTransferModalVisible] = useState(false)


    // Redirect to homepage
    const navigate = useNavigate();
    // Selected branch
    const [selectedBranch, setSelectedBranch] = useState('BranchSheffield'); // default branch
    // Branches
    const branches = [
      { key: 'BranchSheffield', label: 'Branch' },
      { key: 'BranchManchester', label: 'Branch 2' },
    ];

    // Check if the Branch Manager Mode is enabled
    useEffect(() => {
      const checkBranchManagerMode = () => {
        const isToggled = localStorage.getItem('sliderState') === 'true';
        if (!isToggled) {
          message.warning('Branch Manager Mode Is Disabled. Redirecting...');
          navigate('/homepage');
        }
      };

      checkBranchManagerMode();

      const interval = setInterval(checkBranchManagerMode, 1000);
      return () => clearInterval(interval);
    }, [navigate]);
    
    // Fetch books from the API
    const fetchBooks = () => {
      axios.get('http://localhost:8080/api/books')
        .then((response) => {
          setBooks(response.data);
          setFilteredBooks(response.data); // Update filteredBooks
          const uniqueGenres = [...new Set(response.data.map((book) => book.genre))];
          setGenres(uniqueGenres);
        })
        .catch((err) => console.log(err));
    };
    
    // Fetch books when the component mounts
    useEffect(() => {
      fetchBooks(); 
    }, []);
    


    //update phone number
    const updateBook = async (id, values) =>{
      console.log('Book updated successfully:', values);
      await axios.patch(`http://localhost:8080/api/update-book/${id}`, values)
      .then(() => {
        setBooks(books.filter((book) => book._id !== id))
        setIsEditModalVisible(false);
        setEditingBook(null);
        fetchBooks();
      })
      .catch(err => console.log(err));
    }
    
    //delete phone number
    const deleteBook = async (id) => {
      await axios.delete(`http://localhost:8080/api/delete-book/${id}`)
      .then(() => {
        //setBooks(books.filter((book) => book._id !== id))
        fetchBooks();
      })
      .catch(err => console.log(err));
    }

    // Add a new book
    const createBook = async (values) => {
      console.log('Received values:', values);
      await axios.post('http://localhost:8080/api/add-book', values)
      .then(response => {
        console.log('Book added successfully:', response.data);
        setIsModalVisible(false);
        form.resetFields();
        fetchBooks();
      })
      .catch(error => {
        console.error('There was an error adding the book:', error);
      });
    };

    

    // Handle branch change
    const handleBranchChange = (value) => {
      setSelectedBranch(value);
      axios.post('http://localhost:8080/api/change-branch', { branch: value })
      .then(response => {
        fetchBooks();
        console.log('Branch updated successfully:', response.data);
      })
      .catch(error => {
        console.error('There was an error updating the branch:', error);
      });
    };

    // Table columns
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
        title: 'Publication Year',
        dataIndex: 'publication_year',
        key: 'publication_year',
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
          <Space size="middle"><Button type="primary" onClick={() => {
            setEditingBook(record);
            setIsTransferModalVisible(true);
          }}>
            Transfer
          </Button>
            <Button type="primary" danger onClick={() => {deleteBook(record._id)}}>
              Delete
            </Button>
            <Button type="primary" onClick={() => {
              setEditingBook(record); 
              editForm.setFieldsValue(record); 
              setIsEditModalVisible(true); 
            }}
          >
            Edit
          </Button>
          </Space>
        ),
      },
    ];
    

  return (
    <div style={{ padding: '20px', marginTop: '70px' }}>
      {/* Branch Dropdown */}
      <div style={{ marginBottom: '20px' }}>
        <Select defaultValue={selectedBranch} onChange={handleBranchChange} style={{ width: 200 }}>
          {branches.map((branch) => (
            <Option key={branch.key} value={branch.key}>{branch.label}</Option>
          ))}
        </Select>
      </div>
  {/* Search and Filters */}
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <SearchFilter
      books={books}
      onFilterUpdate={setFilteredBooks} // Update filtered books
      genres={genres}
    />
    {/* Add Button */}
    <div style={{ marginTop: '0px' }}>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Add New Book
      </Button>
    </div>
  </div>
      {/* Table */}
      <div style={{ marginTop: '20px' }}>
        <Table columns={columns} dataSource={filteredBooks} rowKey="_id" />
      </div>

      {/* Add Modal */}
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
              {genres.map((genre) => (
                <Option key={genre} value={genre}>{genre}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="publication_year"
            label="Publication-Year"
            rules={[{ required: true, message: 'Please enter the year' }]}
          >
            <Input type="number" />
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
      {/* Edit Book Modal */}
      <Modal
  title="Edit Book"
  visible={isEditModalVisible}
  onCancel={() => setIsEditModalVisible(false)}
  footer={[
    <Button key="cancel" onClick={() => setIsEditModalVisible(false)}>
      Cancel
    </Button>,
    <Button key="submit" type="primary" onClick={() => editForm.submit()}>
      Save Changes
    </Button>,
  ]}
>
  <Form
    form={editForm}
    layout="vertical"
    onFinish={(values) => updateBook(editingBook._id, values)}
  >
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
      name="description"
      label="Description"
      rules={[{ required: true, message: 'Please enter the description' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name="genre"
      label="Genre"
      rules={[{ required: true, message: 'Please select the genre' }]}
    >
      <Select>
        {genres.map((genre) => (
        <Option key={genre} value={genre}>{genre}</Option>
         ))}
     </Select>
    </Form.Item>

    <Form.Item
      name="publication_year"
      label="Publication Year"
      rules={[{ required: true, message: 'Please enter the publication year' }]}
    >
      <Input type="number" />
    </Form.Item>

    <Form.Item
      name="image"
      label="Image Link"
      rules={[{ required: true, message: 'Please enter the image link' }]}
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

{/* Transfer Modal */}
<Modal
        title="Transfer Book"
        visible={isTransferModalVisible}
        onCancel={() => setIsTransferModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsTransferModalVisible(false)}>
            Cancel
          </Button>,
          // <Button key="submit" type="primary" onClick={() => handleTransferBook(editingBook._id)}>
          //   Transfer
          // </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Select Branch you would like to transfer to" required>
            <Select onChange={(value) => setTransferBranch(value)}>
              {branches.map((branch) => (
                <Select.Option key={branch.key} value={branch.key}>{branch.label}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};


export default ManageInventory;
