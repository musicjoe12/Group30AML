import React from 'react';
import { useState, useEffect } from 'react';
import '../CSS/navbar.css';
import SearchFilter from '../Components/SearchFilter'; // Import SearchFilter


import axios from 'axios';

//design
import { Box, Grid, Typography, Card, CardMedia, CardContent, Drawer, IconButton, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { MAX_VERTICAL_CONTENT_RADIUS } from 'antd/es/style/placementArrow';
import { Button } from 'antd';


function BrowseMedia() {
 //return <h1>Browse Media Page</h1>;
  const [books, setBooks] = useState([]);

  const [selectedBook, setSelectedBook] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [filteredBooks, setFilteredBooks] = useState([]); 
  const [genres, setGenres] = useState(['Fiction', 'Non-fiction', 'Sci-fi', 'Biography']); 

  

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

  useEffect(() => {
    fetchBooks();
  }, []);
  
  const handleCardClick = (book) => {
    setSelectedBook(book);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedBook(null);
  };

  {/* Reserve Book */}

  const handleReserve = (book) => {
    const reservedBooks = JSON.parse(localStorage.getItem('reservedBooks')) || [];

    if (!reservedBooks.some((reservedBook) => reservedBook.title === book.title)) {
      const dateReserved = new Date();
      const returnBy = new Date();
      returnBy.setDate(dateReserved.getDate() + 14); //2 week Reservation window

      //Change date Format to DDMMYYYY

      const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      };



      const updatedBook = {
        ...book,
        dateReserved: formatDate(dateReserved),
        returnBy: formatDate(returnBy),
      };

      reservedBooks.push(updatedBook);
      localStorage.setItem('reservedBooks', JSON.stringify(reservedBooks));
      alert('`${book.title}` has been reserved');
    } else {
      alert('`${book.title}` is already reserved');
    }
  };

  {/* Notify Me */ }

  const handleNotifyMe = (book) => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    if (!wishlist.some((wishlistBook) => wishlistBook.title === book.title)) {
      wishlist.push(book);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      alert('`${book.title}` has been added to your wishlist');
    } else {
      alert('`${book.title}` is already in your wishlist');
    }
  };
  
 return (
  <Box sx={{ backgroundColor: 'ADD8E6', py: 4, minHeight: '100vh', marginTop: '120px'}}>
    {/* Search Results Title */}
    <div style={{ display: 'flex', justifyContent: 'flex-center', alignItems: 'center', gap: '20px', padding: '10px', align: 'center' }}>
    <Typography variant="h4" align="center" gutterBottom className= "typography-heading" sx={{ fontWeight: 'bold',mt: 4, mb: 4}}>
      Browse Our Media 
    </Typography>

    <SearchFilter
      books={books}
      onFilterUpdate={setFilteredBooks} // Update filtered books
      genres={genres}
    />
    </div>
    {/* Media Card Grid */}

    <Grid container spacing={3} justifyContent="center" sx={{ mt: 4}}>
      {filteredBooks.map((item, index) => (
        <Grid item xs={6} sm={4} md={3} key={index}>
          <Card sx={{ 
            maxWidth: 220, //width of cards
            mx: 'auto',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 3,
            },
            
            }}
            onClick={() => handleCardClick(item)}
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

      {/* Focused Media Drawer */}

      <Drawer anchor='right' open={drawerOpen} onClose={handleCloseDrawer} PaperProps={{
        sx: {
          width: '50%',
          backgroundColor: '#124E78',
          color: 'white',
          padding: '20px',
        },
      }}
      >

        {/* Close Button */}
        <IconButton onClick={handleCloseDrawer} sx={{ position: 'absolute', top: 10, right: 10, color: 'red',}}>
          <CloseIcon sx={{ fontSize: '36px' }}/>
        </IconButton>

        {/* Media Details */}

        {selectedBook && (
          <Box>

            {/* Media Image */}

            <Box sx={{ textAlign: 'center', mb: 10, mt: 5,
            }}
            >
              <img src={selectedBook.image} alt={selectedBook.title} style={{
                width: 'auto',
                maxWidth: '100%',
                height: 'auto',
                maxHeight: '250px',
                objectFit: 'cover',
                borderRadius: '10px',
                boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.5)',
              }}
              />

            </Box>

            {/* Media Details in Text */}



            <Typography variant='h5' gutterBottom sx={{ fontWeight: 'bold' }}>
              {selectedBook.title}
            </Typography>
            <Typography variant='body1' gutterBottom>
              <strong>Author:</strong> {selectedBook.author}
            </Typography>
            <Typography variant='body1' gutterBottom>
              <strong>Genre:</strong> {selectedBook.genre}
            </Typography>
            <Typography variant='body1' gutterBottom>
              <strong>Year Published:</strong> {selectedBook.publication_year}
            </Typography>
            <Typography variant='body1' gutterBottom>
              <strong>Description:</strong> {selectedBook.description}
            </Typography>
            <Typography variant='body1' gutterBottom>
              <strong>In Stock:</strong> {selectedBook.availability ? 'Available' : 'Not Available'}
            </Typography>
          </Box>
        )}

          {/* Buttons at the bottom */}

          <Box sx={{
            position: 'absolute',
            bottom: '200px',
            left: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'space-evenly',
            padding: '0 20px',
          }}
          >
            <Button variant='contained' disabled={!selectedBook?.availability}
            onClick={() => handleReserve(selectedBook)}
            
            sx={{
              backgroundColor: selectedBook?.availability ? '#4CAF50' : '#D3D3D3',
              '&:hover': selectedBook?.availability ? { backgroundColor: '#45A049' } : {},
              color: 'white',
              fontSize: '1.2rem',
              padding: '15px 30px',
              minWidth: '150px',
              textTransform: 'none',
            }}
            >
              Borrow
            </Button>
            <Button variant='outlined' disabled={selectedBook?.availability}

            onClick={() => handleNotifyMe(selectedBook)}
            sx={{
              borderColor: selectedBook?.availability ? '#D3D3D3' : '#FF5722',
              color: selectedBook?.availability ? '#D3D3D3' : '#FF5722',
              fontSize: '1.2rem',
              padding: '15px 30px',
              minWidth: '150px',
              textTransform: 'none',
              '&:hover': selectedBook?.availability ? {} : {
                backgroundColor: '#FF5722',
                color: 'white',

              },
            }}
            >
              Reserve
            </Button>
          </Box>
      </Drawer>

  </Box>
 );
}

export default BrowseMedia;