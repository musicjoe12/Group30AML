import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Card, CardMedia, CardContent, Modal, Button } from '@mui/material';
import { MAX_VERTICAL_CONTENT_RADIUS } from 'antd/es/style/placementArrow';
import { json } from 'react-router-dom';




function ManageMedia() {

  const [reservedBooks, setReservedBooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isWishlistModal, setIsWishlistModal] = useState(false);



  {/* Reserve/Wishlist from local storage */}

  useEffect(() => {
    const savedReservedBooks = JSON.parse(localStorage.getItem('reservedBooks')) || [];
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setReservedBooks(savedReservedBooks);
    setWishlist(savedWishlist);
  }, []);

  const handleBookClick = (book, isWishlist = false) => {
    setSelectedBook(book);
    setIsWishlistModal(isWishlist);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedBook(null);
  };

  const handleReturnMedia = () => {
    const updateReservedBooks = reservedBooks.filter((book) => book.title !== selectedBook.title);
    setReservedBooks(updateReservedBooks);
    localStorage.setItem('reservedBooks', JSON.stringify(updateReservedBooks));
    alert(`"${selectedBook.title}" has been returned`);
    handleCloseModal();
  };


  const handleExtend = () => {
    alert(`The Reservation for "${selectedBook.title}" has been extended`);
  };

  const handleRemoveMedia = () => {
    const updatedWishlist = wishlist.filter((book) => book.title !== selectedBook.title);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    alert(`"${selectedBook.title}" has been removed from your wishlist`);
    handleCloseModal();
  };

  const handleReserveFromWishlist = () => {
    if (selectedBook && selectedBook.availability) {
      const updateReservedBooks = [...reservedBooks, selectedBook];
      setReservedBooks(updateReservedBooks);
      localStorage.setItem('reservedBooks', JSON.stringify(updateReservedBooks));

      handleRemoveMedia();
      alert(`"${selectedBook.title}" has been reserved`);
    }
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
      {/* Currently Reserved Section */}

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

          {reservedBooks.length > 0 ? (
            reservedBooks.map((book, index) => (
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

        {/* Wishlist Section */}

        <Box>
          <Typography variant='h5' gutterBottom sx={{
            fontWeight: 'bold',
            textAlign: 'left',
            mb: 2,
            textDecoration: 'underline',
            color: '#333',
          }}
          >
            Reserved to Borrow -
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

            {wishlist.length > 0 ? (
              wishlist.map((book, index) => (
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

                  {/* Conditional Content depending on Modal */}

                  {!isWishlistModal ? (
                    <>
                    <Typography sx={{ mb: 2}}>
                    <strong>Date Reserved:</strong> {selectedBook.dateReserved || 'N/A'}
                  </Typography>
                  <Typography sx={{ mb: 4}}>
                    <strong>Return By:</strong> {selectedBook.returnBy || 'N/A'}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                    variant='contained'
                    color='error'
                    onClick={handleReturnMedia}
                    sx={{ textTransform: 'none' }}
                    >
                      Return Media
                    </Button>
                    <Button
                    variant='contained'
                    color='primary'
                    onClick={handleExtend}
                    sx={{ textTransform: 'none' }}
                    >
                      Extend
                    </Button>
                  </Box>
                  </>
                  ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                      <Button
                      variant='contained'
                      color='error'
                      onClick={handleRemoveMedia}
                      sx={{ textTransform: 'none' }}
                      >
                        Remove Media
                      </Button>
                      <Button
                      variant='contained'
                      disabled={!selectedBook.availability}
                      onClick={handleReserveFromWishlist}
                      sx={{
                        textTransform: 'none',
                        backgroundColor: selectedBook.availability ? 'primary.main' : '#ccc',
                        '&:hover': {
                          backgroundColor: selectedBook.availability ? 'primary.dark' : '#ccc',
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