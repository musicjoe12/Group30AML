import React, { useState, useEffect, useContext, } from 'react';
import axios from 'axios';
import '../CSS/manageInventory.css';


import { DownOutlined } from '@ant-design/icons';
import { Table, Button, Modal, Form, Input, Select, Space } from 'antd';
import SearchFilter from '../Components/SearchFilter'; // Import SearchFilter
import BranchSelector from '../Components/BranchSelector';
import Loader from '../Components/Loader'; // Import Loader
import { TailSpin } from 'react-loader-spinner';

import { IconButton, Box } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import { useNavigate } from 'react-router-dom'; // For Redirecting
import { message } from 'antd'; // Warning message

  const ManageInventory = () => {
    // Fetch data from API
    const [books, setBooks] = useState([]);
    //for updating/deleting book 
    const [newBook, setNewBook] = useState({});
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
    //Delete Modal
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    const [filterOpen, setFilterOpen] = useState(false);
    //Loading
    const [loading, setLoading] = useState(false);

    // Redirect to homepage
    const navigate = useNavigate();
    // Selected branch
    const [selectedBranch, setSelectedBranch] = useState('BranchSheffield'); // default branch
    // Branches
    const branches = [
      { key: 'BranchSheffield', label: 'Sheffield Branch' },
      { key: 'BranchManchester', label: 'Manchester Branch' },
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
    const fetchBooks = async() => {
      //setLoading(true);
      await axios.get('http://localhost:8080/api/books')
        .then((response) => {
          setBooks(response.data);
          setFilteredBooks(response.data); // Update filteredBooks
          const uniqueGenres = [...new Set(response.data.map((book) => book.genre))];
          setGenres(uniqueGenres);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err)
          setLoading(false);
        });
    };
    
    // Fetch books when the component mounts
    useEffect(() => {
      setLoading(true);
      fetchBooks(); 
    }, []);

    const getBookValues = async (id) => {
      await axios.get(`http://localhost:8080/api/book/${id}`)
        .then(response => {
          const { _id, ...bookData } = response.data; // Destructure to exclude _id
          console.log('Book fetched successfully:', bookData);
          setNewBook(bookData);
        })
        .catch(error => {
          console.error('There was an error fetching the book:', error);
        });
    };
    
    //update phone number
    const updateBook = async (id, values) =>{
      console.log('Book updated successfully:', values);
      await axios.patch(`http://localhost:8080/api/update-book/${id}`, values)
      .then(() => {
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
        setIsDeleteModalVisible(false);
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

    // Handle Transfer Book
    const handleTransferBook = async(id, branch) => {
      setIsTransferModalVisible(false);
      setLoading(true);
      console.log('info',id, branch);
      try{
        const response = await axios.get(`http://localhost:8080/api/book/${id}`);
        const { _id, ...bookData } = response.data;

        console.log('Changing to branch:', branch);
        await handleBranchChange(branch.branch);
        console.log('bookdata:', bookData);
        
        await createBook(bookData);
        
        await handleBranchChange(selectedBranch);
        
        await deleteBook(id);
        
        fetchBooks();
        //setLoading(false);
      }
      catch{
        console.log('error');
        setLoading(false);
      }      
    };
    
    // Handle branch change
    const handleBranchChange = async (value) => {
      setLoading(true);
      setSelectedBranch(value);
      await axios.post('http://localhost:8080/api/change-branch', { branch: value })
      .then(response => {
        console.log('Branch updated successfully:', response.data);
        fetchBooks();
        //setLoading(false)
      })
      .catch(error => {
        console.error('There was an error updating the branch:', error);
        setLoading(false)
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
            <Button type="primary" danger onClick={() => {
              setIsDeleteModalVisible(true);
              setEditingBook(record);
            }}>
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
      <div className="manage-inventory-container">
      {/* Loader Overlay */}
    {loading && (
      <div className="loader-overlay">
        <TailSpin height={80} width={80} color="#1976d2" />
      </div>
    )}
        {/* Search and Filters */}
        <div className="search-filters-container">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Filter Button */}
            <IconButton 
              onClick={() => setFilterOpen(true)}
              sx={{
                backgroundColor: '#1976d2',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#1565C0',
                },
              }}
            >
              <FilterAltIcon />
            </IconButton>
    
            {/* Show Filter Component if the filter button is clicked */}
            {filterOpen && (
              <SearchFilter
                books={books}
                onFilterUpdate={setFilteredBooks}
                genres={genres}
                isOpen={filterOpen}
                onClose={() => setFilterOpen(false)}
              />
            )}
          </Box>
    
          {/* Branch Dropdown */}
          <div className="branch-selector-container">
            <BranchSelector
              selectedBranch={selectedBranch}
              setSelectedBranch={setSelectedBranch}
              branches={branches}
              fetchBooks={fetchBooks}
              setLoading={setLoading}
            />
          </div>
    
          {/* Add Button */}
          <div className="add-button-container">
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
              Add New Book
            </Button>
          </div>
        </div>
    
        {/* Table */}
        <div className="table-container">
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
                  <Option key={genre} value={genre}>
                    {genre}
                  </Option>
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
            <Form.Item
              name="reserved"
              label="Reserved"
              rules={[{ required: true, message: 'Please select if it has already been reserved' }]}
            >
              <Select>
                <Option value={false}>Available</Option>
                <Option value={true}>Reserved</Option>
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
                <Option value="Fiction">Fiction</Option>
                <Option value="Non-fiction">Non-fiction</Option>
                <Option value="Sci-fi">Sci-fi</Option>
                <Option value="Biography">Biography</Option>
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
            <Button
              key="submit"
              type="primary"
              onClick={(values) =>
                handleTransferBook(editingBook._id, { branch: transferBranch })
              }
            >
              Transfer
            </Button>,
          ]}
        >
          <Form layout="vertical">
            <Form.Item label="Select Branch you would like to transfer to" required>
              <Select onChange={(value) => setTransferBranch(value)}>
                {branches.map((branch) => (
                  <Select.Option key={branch.key} value={branch.key}>
                    {branch.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
    
        {/* Delete Modal */}
        <Modal
          title="Delete Book"
          visible={isDeleteModalVisible}
          onCancel={() => setIsDeleteModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setIsDeleteModalVisible(false)}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => deleteBook(editingBook._id)}
            >
              Delete
            </Button>,
          ]}
        >
          <p>Are you sure you want to delete this book?</p>
        </Modal>
      </div>
    );
  };

export default ManageInventory;
