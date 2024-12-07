import React, { useState, useEffect, useContext } from 'react';
import { Box, Grid, Typography, Card, CardMedia, CardContent, Modal, Button } from '@mui/material';
import { MAX_VERTICAL_CONTENT_RADIUS } from 'antd/es/style/placementArrow';
import { json } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';
import { message } from 'antd';
import {Dropdown, Menu } from 'antd';




function ManageMedia() {
  //user id from navbar login using context
  const { userId } = useContext(UserContext);
  //state for borrowed books
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  //state for borrowed books id
  const [borrowBooksId, setBorrowedBooksId] = useState([]);
  //state for reserved books
  const [reservedBooks, setReservedBooks] = useState([]);
  //state for reserved books id
  const [reservedBooksId, setReservedBooksId] = useState([]);
  //state for due date
  const [dueDate, setDueDate] = useState([]);
  //stae for borrowed books for renew
  const [books, setBooks] = useState([]);

  const [wishlist, setWishlist] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isWishlistModal, setIsWishlistModal] = useState(false);
  const [selectedBookIndex, setSelectedBookIndex] = useState(null); 
  const [activeTab, setActiveTab] = useState('borrowed'); 


  //For cards
  const [flippedCards, setFlippedCards] = useState({});

  const handleFlipCard = (index) => {
    setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const menu = (setActiveTab) => (
    <Menu>
      <Menu.Item onClick={() => setActiveTab('borrowed')}>Currently Borrowed</Menu.Item>
      <Menu.Item onClick={() => setActiveTab('reserved')}>Currently Reserved</Menu.Item>
    </Menu>
  );

  //fetches borrowed books from current selceted user
  const fetchBorrowedBooksId = async() => {
    if (!userId) {
      console.log('User ID is null or undefined');
      return;
    }
    setBorrowedBooks([]);
    setDueDate([]);
    await axios.get(`http://localhost:8080/api/user-books-borrowed/${userId}`)
    .then(res => {
      const borrowedBooks = res.data; 
      setBooks(borrowedBooks);
      const bookIds = borrowedBooks.map(book => book.book_id);
      setBorrowedBooksId(bookIds);
      fetchBorrowedBooks(bookIds);
      
      setDueDate(borrowedBooks.map(book => book.due_date));
    })
    .catch(err => console.log(`error fetching books${err}`));
  };
  //fetches books from users bowrrowed list
  const fetchBorrowedBooks = async(ids) => {
    //const bookIds = ids.join(',');
    await axios.get(`http://localhost:8080/api/books/multiple?ids=${ids}`)
    .then(res => {
      //console.log(res.data);
      setBorrowedBooks(res.data);
    })
    .catch(err => console.log(err));

  };

  //fetches reserved books from current selected user
  const fetchReservedBooksId = async() => {
    if (!userId) {
      console.log('User ID is null or undefined');
      return;
    }
    setReservedBooks([]);
    await axios.get(`http://localhost:8080/api/user-books-reserved/${userId}`)
    .then(res => {
      //console.log(res.data);  
      setReservedBooksId(res.data);
      fetchReservedBooks(res.data);
    })
    .catch(err => console.log(`error fetching books${err}`));
  };
  //fetches books from users reserved list
  const fetchReservedBooks = async(ids) => {
    await axios.get(`http://localhost:8080/api/books/multiple?ids=${ids}`)
    .then(res => {
      //console.log(res.data);
      setReservedBooks(res.data);
    })
    .catch(err => console.log(err));
  };


  useEffect(() => {
    fetchBorrowedBooksId();
    fetchReservedBooksId();
      
  }, [userId]);

 
  
  const handleBookClick = (book, index, isWishlist = false) => {
    handleFlipCard(index);

    setSelectedBook(book);
    console.log(books.find(b => b.book_id === book._id));
    const selectedBookIndex = books.findIndex(b => b.book_id === book._id);
    console.log(selectedBookIndex);
    setSelectedBookIndex(selectedBookIndex);
    setIsWishlistModal(isWishlist);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedBook(null);
  };

  const checkDueDates = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    books.forEach(book => {
      console.log(book.due_date, currentDate);
      if (book.due_date === currentDate) {
        handleRemoveBorrowed(book);
        // if (book.reserved) {
        //   handleAddBorrowedIfReserved(book);
        // }
      }
      else{
        return;
      }
    });
  };
  useEffect(() => {
    checkDueDates();
  }, [books]);

  //adds borrowed media if reserved
  //const handleAddBorrowedIfReserved = async(book) => {};
  //updates book availability if reserved
  //const updateBookAvailabilityIfReserved = async(book) => {};

  //returns borrowed media
  const handleRemoveBorrowed = async(userBooks = selectedBook)=> {
    const bookId = userBooks.book_id || userBooks._id;
    console.log(`Deleting book with ID: ${bookId} for user: ${userId}`);
    await axios.delete(`http://localhost:8080/api/user-books-borrowed/${userId}/${bookId}`)
   .then(res => {
      console.log(res.data);
      updateBookAvailability(bookId);
    })
    .catch(err => console.log(`unable to delete book:${err}`));
  };
  //updates book availability
  const updateBookAvailability = async(book) => {
    try{
      const quantityResponse = await axios.get(`http://localhost:8080/api/book/${book}`);
      const currentQuantity = quantityResponse.data.quantity;
      await axios.patch(`http://localhost:8080/api/update-book/${book}`, {
        availability: true,
        quantity: currentQuantity + 1,
      })
      .then(res => {
        console.log(res.data);
        fetchBorrowedBooksId();
        setModalOpen(false);
        message.success('Media returned successfully');
      })
      .catch(err => console.log(err));
    }catch(err){console.log(err);}
  };


  //removes reserved media
  const handleRemoveReserved = async() => {

    console.log(selectedBook._id, userId);
    await axios.delete(`http://localhost:8080/api/user-books-reserved/${userId}/${selectedBook._id}`)
    .then(res => {
      console.log(res.data);
      updateBookReservation();
    })
    .catch(err => console.log(`unable to delete book:${err}`));
  };
  //updates book reservation
  const updateBookReservation = async() => {
    await axios.patch(`http://localhost:8080/api/update-book/${selectedBook._id}`, {
      reserved: false,
    })
    .then(res => {
      console.log(res.data);
      fetchReservedBooksId();
      setModalOpen(false);
      message.success('Media reservation removed successfully');
    })
    .catch(err => console.log(err));
  };

  //renews borrowed media
  const handleRenewBorrowed = async(bookId, dd) => {
    console.log(`bookID: ${bookId}, DueDate: ${dd}`);
    let isReserved = false;

    await axios.get(`http://localhost:8080/api/reserved/${bookId}`)
    .then(res => {
      console.log(res.data);
      isReserved = res.data;
    })
    .catch(err => {
      console.log(err);
      return false;
    });
    if (isReserved) {
      console.log("Media is reserved by another user. Renewal not allowed.");
      message.error('Renewal not allowed. The media is reserved by another user.');
      fetchBorrowedBooksId();
      return
    }
    // Parse the date string to a Date object
    const dateObj = new Date(dd);
    // Add 7 days to the date
    let newDateObj = new Date(dateObj.getTime() + 7 * 24 * 60 * 60 * 1000);
    console.log(newDateObj);
    // Get the current date and add 14 days to it
    const currentDate = new Date();
    const maxRenewDate = new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000);
    // Check if the new due date is over 14 days from the current date
    if (newDateObj > maxRenewDate) {
      console.log("New due date is over 14 days from the current date. Renewal not allowed.");
      newDateObj = maxRenewDate;
      message.error('Renewal not allowed. Maximum renewal period is 14 days.');
      return;
    }
    // Convert the updated date back to a string in "YYYY-MM-DD" format
    const newDD = newDateObj.toISOString().split('T')[0];
    console.log(newDD);
    await axios.patch(`http://localhost:8080/api/update-due-date/${userId}/${bookId}`, {
      due_date: newDD,
    })
    .then(res => {
      console.log(res.data);
      fetchBorrowedBooksId();
      message.success(`Media Renewed. New due date is ${newDD}`);
      //setModalOpen(false);
    })
    .catch(err => console.log(err));
    
  };

  


  return (
    <Box sx={{ backgroundColor: '#fff', py: 4, pt: 16, minHeight: '100vh', px: 4, marginTop: '40px' }}>
      {/* Dropdown to toggle between Borrowed and Reserved */}
      <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant='h5' gutterBottom sx={{ fontWeight: 'bold', textAlign: 'left', flex: 1 }}>
          {activeTab === 'borrowed' ? 'Currently Borrowed' : 'Currently Reserved'} -
        </Typography>
        <Dropdown overlay={menu(setActiveTab)} trigger={['click']}>
          <Button>
            Switch Tab
          </Button>
        </Dropdown>
      </Box>

      {/* Currently Borrowed Section */}
      {activeTab === 'borrowed' && (
        <Box sx={{ mb: 6 }}>
          <Grid container spacing={3} justifyContent="center">
            {borrowedBooks.length > 0 ? (
              borrowedBooks.map((book, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <div
                    className={`flip-card ${flippedCards[index] ? 'flipped' : ''}`}
                    onClick={() => handleBookClick(book, index)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Front of Card */}
                    <div className="flip-card-front">
                      <Card sx={{ maxWidth: 220, mx: 'auto', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <CardMedia component="img" height="300" image={book.image} alt={book.title} sx={{ objectFit: 'cover' }} />
                        <CardContent sx={{ textAlign: 'center' }}>
                          <Typography variant='subtitle1' sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.7)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {book.title}
                          </Typography>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Back of Card */}
                    <div className="flip-card-back">
                      <Box sx={{ textAlign: 'center', p: 2 }}>
                        <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold' }}>
                          {book.title}
                        </Typography>
                        <Typography variant='body2' sx={{ mb: 1 }}>
                          <strong>Author:</strong> {book.author}
                        </Typography>
                        <Typography variant='body2' sx={{ mb: 1 }}>
                          <strong>Genre:</strong> {book.genre}
                        </Typography>
                        <Typography variant='body2' sx={{ mb: 1 }}>
                          <strong>Year Published:</strong> {book.publication_year}
                        </Typography>
                        <Typography variant='body2' sx={{ mb: 1 }}>
                          <strong>Description:</strong> {book.description}
                        </Typography>
                        <Typography variant='body2' sx={{ mb: 2 }}>
                          <strong>Return By:</strong> {dueDate[index] || 'N/A'}
                        </Typography>

                        {/* Action Buttons */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
                          <Button variant='contained' color='error' onClick={() => handleRemoveBorrowed(book)} sx={{ textTransform: 'none' }}>
                            Return
                          </Button>
                          <Button variant='contained' 
                            color='primary' 
                            onClick={(event) => {
                              event.stopPropagation(); 
                              handleRenewBorrowed(book._id, dueDate[index]);
                            }} 
                            sx={{ textTransform: 'none' }}>
                            Renew
                          </Button>
                        </Box>
                      </Box>
                    </div>
                  </div>
                </Grid>
              ))
            ) : (
              <Typography variant='body1' sx={{ textAlign: 'center', color: '#333' }}>
                Please Login to Borrow Media
              </Typography>
            )}
          </Grid>
        </Box>
      )}

      {/* Currently Reserved Section */}
      {activeTab === 'reserved' && (
        <Box>
          <Grid container spacing={3} justifyContent="center">
            {reservedBooks.length > 0 ? (
              reservedBooks.map((book, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <div
                    className={`flip-card ${flippedCards[index] ? 'flipped' : ''}`}
                    onClick={() => handleBookClick(book, index)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Front of Card */}
                    <div className="flip-card-front">
                      <Card sx={{ maxWidth: 220, mx: 'auto', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <CardMedia component="img" height="300" image={book.image} alt={book.title} sx={{ objectFit: 'cover' }} />
                        <CardContent sx={{ textAlign: 'center' }}>
                          <Typography variant='subtitle1' sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.7)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {book.title}
                          </Typography>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Back of Card */}
                    <div className="flip-card-back">
                      <Box sx={{ textAlign: 'center', p: 2 }}>
                        <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold' }}>
                          {book.title}
                        </Typography>
                        <Typography variant='body2' sx={{ mb: 1 }}>
                          <strong>Author:</strong> {book.author}
                        </Typography>
                        <Typography variant='body2' sx={{ mb: 1 }}>
                          <strong>Genre:</strong> {book.genre}
                        </Typography>
                        <Typography variant='body2' sx={{ mb: 1 }}>
                          <strong>Year Published:</strong> {book.publication_year}
                        </Typography>
                        <Typography variant='body2' sx={{ mb: 1 }}>
                          <strong>Description:</strong> {book.description}
                        </Typography>

                        {/* Action Buttons */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
                          <Button variant='contained' color='error' onClick={() => handleRemoveReserved(book._id)} sx={{ textTransform: 'none' }}>
                            Remove
                          </Button>
                          <Button variant='contained' color='primary' onClick={() => handleRemoveReserved(book._id)} sx={{ textTransform: 'none' }}>
                            Reserve
                          </Button>
                        </Box>
                      </Box>
                    </div>
                  </div>
                </Grid>
              ))
            ) : (
              <Typography variant='body1' sx={{ textAlign: 'center', color: '#333' }}>
                Please Login To Reserve Media
              </Typography>
            )}
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default ManageMedia;