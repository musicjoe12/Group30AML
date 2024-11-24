import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { MAX_VERTICAL_CONTENT_RADIUS } from 'antd/es/style/placementArrow';
import { json } from 'react-router-dom';




function ManageMedia() {

  const [reservedBooks, setReservedBooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedReservedBooks = JSON.parse(localStorage.getItem('reservedBooks')) || [];
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setReservedBooks(savedReservedBooks);
    setWishlist(savedWishlist);
  }, []);


  return (
    <Box sx={{
      backgroundColor: '#ADD8E6',
      py: 4,
      pt: 16,
      minHeight: '100vh',
      px: 4,
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
              }}>
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
              No Reserved Books
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
            Wishlist -
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
                No Items Wishlisted
              </Typography>
            )}
            </Box>
            </Box>
            </Box>
            );
          }


export default ManageMedia;