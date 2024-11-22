import React from 'react';
import { Box, Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { MAX_VERTICAL_CONTENT_RADIUS } from 'antd/es/style/placementArrow';




function ManageMedia() {
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
          <Typography variant='body1' sx={{ textAlign: 'center', color: '#333' }}>
            Reserved Media is Displayed here
          </Typography>
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
            <Typography variant='body1' sx={{
              textAlign: 'center',
              color: '#333'
            }}>
              Wihslist is Displayed here
            </Typography>
          </Box>
        </Box>
    </Box>
  );
}

export default ManageMedia;