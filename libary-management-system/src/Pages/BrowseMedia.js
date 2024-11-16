import React from 'react';
import { useState, useEffect } from 'react';

import axios from 'axios';

//design
import { Box, Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { MAX_VERTICAL_CONTENT_RADIUS } from 'antd/es/style/placementArrow';


function BrowseMedia() {
 //return <h1>Browse Media Page</h1>;
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/books')
    .then(books => setBooks(books.data))
    .catch(err => console.log(err));
  },[]);
  
 return (
  <Box sx={{ backgroundColor: 'ADD8E6', py: 4, minHeight: '100vh'}}>
    {/* Search Results Title */}

    <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold',mt: 4, mb: 4}}>
      Browse Our Media 
    </Typography>

    {/* Media Card Grid */}

    <Grid container spacing={3} justifyContent="center" sx={{ mt: 4}}>
      {books.map((item, index) => (
        <Grid item xs={6} sm={4} md={3} key={index}>
          <Card sx={{ 
            maxWidth: 220, //width of cards
            mx: 'auto',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 3,
            }
            
            }}
            >
            <CardMedia
            component="img"
            height="350" //img height
            image={item.image} //placeholder image for now
            alt={item.title} 
            />

            <CardContent> {/*padding top*/}
              <Typography variant="subtitle1" component="div" align="center" sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.7)',}}>
                {item.title}
              </Typography>
            </CardContent>
          </Card>
    </Grid>
      ))}
      </Grid>

  </Box>
 );
}

export default BrowseMedia;