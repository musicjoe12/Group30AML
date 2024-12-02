import React, { useState, useEffect, useContext } from 'react';
import { Box, Grid, Typography, Card, CardMedia, CardContent, Modal, Button } from '@mui/material';
import { MAX_VERTICAL_CONTENT_RADIUS } from 'antd/es/style/placementArrow';
import { json } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';
import { message } from 'antd';




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

 
  
  const handleBookClick = (book, isWishlist = false) => {
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

  //returns borrowed media
  const handleRemoveBorrowed = async(userBooks = selectedBook) => {
    console.log(userBooks);
    const bookId = userBooks.book_id || userBooks._id; // Fallback to _id if book_id is missing
    // if (!bookId) {
    //   console.error("Book ID is missing.");
    //   return;
    // }
    console.log(`Deleting book with ID: ${bookId} for user: ${userId}`);
    await axios.delete(`http://localhost:8080/api/user-books-borrowed/${userId}/${bookId}`)
   .then(res => {
      console.log(res.data);
      updateBookAvailability(bookId);
    })
    .catch(err => console.log(`unable to delete book:${err}`));
  };
  //updates book availability
  const updateBookAvailability = async(userBooks) => {
    await axios.patch(`http://localhost:8080/api/update-book/${userBooks}`, {
      availability: true,
    })
    .then(res => {
      console.log(res.data);
      fetchBorrowedBooksId();
      setModalOpen(false);
    })
    .catch(err => console.log(err));
  };

  const checkDueDates = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    books.forEach(book => {
      console.log(book.due_date, currentDate);
      if (book.due_date === currentDate) {
        handleRemoveBorrowed(book);
      }
      else{
        return;
      }
    });
  };

  useEffect(() => {
    checkDueDates();
  }, [books]);

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
    })
    .catch(err => console.log(err));
  };


  //renews borrowed media
  const handleRenewBorrowed = async(bookId, dd) => {
    console.log(bookId, dd);
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
    <Box sx={{
      backgroundColor: '#ADD8E6',
      py: 4,
      pt: 16,
      minHeight: '100vh',
      px: 4,
      marginTop: '40px'
    }}>
      {/* Currently borrowed Section */}

      <Box sx={{ mb: 6 }}>
        <Typography variant='h5' gutterBottom sx={{
          fontWeight: 'bold',
          textAlign: 'left',
          mb: 2,
          textDecoration: 'underline', 
          color: '#333',
        }}
        >
          Currently Borrowed -
        </Typography>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '150px',
          border: '1px dashed gray',
          borderRadius: '10px',
          padding: '20px',
          backgroundColor: '#E0F7FA',
        }}>

          {borrowedBooks.length > 0 ? (
            borrowedBooks.map((book, index) => (
              <Box key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#fff',
                cursor: 'pointer',
              }}
              onClick={() => handleBookClick(book)}
              >
                <img src={book.image}
                alt={book.title}
                style={{ width: '50px', height: '75px', borderRadius: '5px' }} />
                <Typography variant='body1' sx={{
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  {book.title}
                </Typography>
                </Box>
            ))

          ) : (
            <Typography variant='body1' sx={{ textAlign: 'center', color: '#333' }}>
              Nothing Borrowed ATM
            </Typography>
          )}
          </Box>
          </Box>

        {/* reserved Section */}

        <Box>
          <Typography variant='h5' gutterBottom sx={{
            fontWeight: 'bold',
            textAlign: 'left',
            mb: 2,
            textDecoration: 'underline',
            color: '#333',
          }}
          >
            Currently Reserved -
          </Typography>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '150px',
            border: '1px dashed gray',
            borderRadius: '10px',
            padding: '20px',
            backgroundColor: '#E0F7FA',
          }}
          >

            {reservedBooks.length > 0 ? (
              reservedBooks.map((book, index) => (
                <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                }}
                onClick={() => handleBookClick(book, true)}
                >
                  <img
                  src={book.image}
                  alt={book.title}
                  style={{ width: '50px', height: '75px', borderRadius: '5px' }}
                  />
                  <Typography variant='body1' sx={{ fontWeight: 'bold', color: '#333' }}>
                    {book.title}
                  </Typography>
                  </Box>
              ))
            ) : (
              <Typography variant='body1' sx={{ textAlign: 'center', color: '#333' }}>
                Nothing reserved
              </Typography>
            )}
            </Box>
            </Box>

            {/* Book Details Modal */}
            <Modal
            open={modalOpen}
            onClose={handleCloseModal}
            aria-labelledby="book-modal-title"
            aria-describedby="book-modal-description"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            >
              <Box sx={{
                width: 400,
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: 24,
                outline: 'none',
              }}
              >
                {selectedBook && (
                  <>
                  <Typography id="book-modal-title" variant='h6' sx={{ fontWeight: 'bold', mb: 2}}>
                    {selectedBook.title}
                  </Typography>
                  <Typography id="book-modal-description" sx={{ mb: 2 }}>
                    <strong>Author:</strong> {selectedBook.author}
                  </Typography>
                  <Typography sx={{ mb: 2 }}>
                    <strong>Genre:</strong> {selectedBook.genre}
                  </Typography>
                  <Typography sx={{ mb: 2 }}>
                    <strong>Year Published:</strong> {selectedBook.publication_year}
                  </Typography>
                  <Typography sx={{ mb: 2 }}>
                    <strong>Description:</strong> {selectedBook.description}
                  </Typography>
                  <Typography sx={{ mb: 4}}>
                    <strong>Return By: </strong>
                      {selectedBookIndex !== null ? dueDate[selectedBookIndex] : 'N/A'}
                  </Typography>

                  {/* Conditional Content depending on Modal */}

                  {!isWishlistModal ? (
                    <>
                    {/* <Typography sx={{ mb: 2}}>
                    <strong>Date Reserved:</strong> {selectedBook.dateReserved || 'N/A'}
                  </Typography>
                  <Typography sx={{ mb: 4}}>
                    <strong>Return By:</strong> {selectedBook.returnBy || 'N/A'}
                  </Typography> */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                    variant='contained'
                    color='error'
                    onClick={() => handleRemoveBorrowed(selectedBook)}
                    sx={{ textTransform: 'none' }}
                    >
                      Return Media
                    </Button>
                    <Button
                    id='renewButton'
                    variant='contained'
                    color='primary'
                    onClick={ () => handleRenewBorrowed(selectedBook._id, dueDate[selectedBookIndex])}
                    sx={{ textTransform: 'none' }}
                    >
                      Renew Media
                    </Button>
                  </Box>
                  </>
                  ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                      <Button
                      variant='contained'
                      color='error'
                      onClick={handleRemoveReserved}
                      sx={{ textTransform: 'none' }}
                      >
                        Remove Media
                      </Button>
                      <Button
                      variant='contained'
                      disabled={!selectedBook.reserved}
                      //onClick={handleReserveFromWishlist}
                      sx={{
                        textTransform: 'none',
                        backgroundColor: selectedBook.reserved ? 'primary.main' : '#ccc',
                        '&:hover': {
                          backgroundColor: selectedBook.reserved ? 'primary.dark' : '#ccc',
                        },
                      }}
                      >
                        Reserve
                      </Button>
                      </Box>
                  )}
                  </>
                )}
                </Box>
                </Modal>
            </Box>
            );
          }


export default ManageMedia;