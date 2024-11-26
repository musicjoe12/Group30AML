import React from 'react';
import { useState, useEffect } from 'react';
import '../CSS/navbar.css';
import '../CSS/browsemedia.css';
import SearchFilter from '../Components/SearchFilter'; // Import SearchFilter
import { useSearch } from '../Components/SearchContext'; // Import useSearch hook


import axios from 'axios';

//design
import { Box, Grid, Typography, Card, CardMedia, CardContent, Drawer, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { MAX_VERTICAL_CONTENT_RADIUS } from 'antd/es/style/placementArrow';



function BrowseMedia() {
  const [books, setBooks] = useState([]);

  const { searchValue } = useSearch(); 


  const [filteredBooks, setFilteredBooks] = useState([]); 
  const [genres, setGenres] = useState(['Fiction', 'Non-fiction', 'Sci-fi', 'Biography']); 

  const [flippedCards, setFlippedCards] = useState({});

  //Search Bar
  useEffect(() => {
    if (searchValue.trim() !== "") {
      const filtered = books.filter((book) =>
        book.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        book.author.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books); // If search is cleared, reset to all books
    }
  }, [searchValue, books]);

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

  const handleFlipCard = (index) => {
    setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));
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
  <Box sx={{ backgroundColor: 'ADD8E6', py: 4, minHeight: '100vh', marginTop: '90px'}}>
    {/* Search Results Title */}
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      mt: 4,
      mb: 4,
      px: 3,
    }}
    >
      <Box />

      {/* Centered Title */}
      <Typography
      variant='h4'
      gutterBottom
      className='typography-heading'
      sx={{ fontWeight: 'bold', textAlign: 'center' }}
      >
        Browse Our Media
      </Typography>

      {/* Filters Btn */}
      <SearchFilter
      books={books}
      onFilterUpdate={setFilteredBooks}
      genres={genres}
      />
    </Box>
    {/* Media Card Grid */}

    <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ mt: 4, margin: '0 auto', maxWidth: '80%' }}>
      {filteredBooks.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <div className={`flip-card ${flippedCards[index] ? 'flipped' : ''}`}
          onClick={() => handleFlipCard(index)}
          >
            {/* Front of Card */}
            <div className="flip-card-front">
              <Card sx={{ 
                maxWidth: 220,
                mx: 'auto',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease',
               }}>
                <CardMedia
                component='img'
                height='350'
                image={item.image}
                alt={item.title}
                sx={{ 
                  maxHeight: 300,
                  objectFit: 'cover',
                  borderTopLeftRadius: '10px',
                  borderTopRightRadius: '10px',
                 }}
                />
                <CardContent sx={{
                  flexGrow: 1,
                  textAlign: 'center',
                }}>
                  <Typography
                  className='book-title'
                  variant='subtitle1'
                  align='center'
                  sx={{ 
                    fontWeight: 'bold',
                    color: 'rgba(0, 0, 0, 0.7)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                   }}
                  >
                    {item.title}
                  </Typography>
                </CardContent>
              </Card>
            </div>

            {/* Back of Card */}
            <div className='flip-card-back'>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold' }}>
                  {item.title}
                </Typography>
                <Typography variant='body2' sx={{ mb: 1 }}>
                  <strong>Author:</strong> {item.author}
                </Typography>
                <Typography variant='body2' sx={{ mb: 1 }}>
                  <strong>Genre:</strong> {item.genre}
                </Typography>
                <Typography variant='body2' sx={{ mb: 1 }}>
                  <strong>Year Published:</strong> {item.publication_year}
                </Typography>
                <Typography variant='body2' sx={{ mb: 1 }}>
                  <strong>Description:</strong> {item.description}
                </Typography>
                <Typography variant='body2' sx={{ mb: 2 }}>
                  <strong>In Stock:</strong> {item.availability ? 'Available' : 'Not Available'}
                </Typography>
                <Button
                variant='contained'
                disabled={!item.availability}
                onClick={() => handleReserve(item)}
                sx={{
                  backgroundColor: item.availability ? '#4CAF50' : '#D3D3D3',
                  '&:hover': item.availability ? { backgroundColor: '#45A049' } : {},
                  color: 'white',
                  textTransform: 'none',
                  mb: 1,
                }}
                >
                  Borrow
                </Button>
                <Button
                variant='outlined'
                disabled={item.availability}
                onClick={() => handleNotifyMe(item)}
                sx={{
                  borderColor: item.availability ? '#D3D3D3' : '#FF5722',
                  color: item.availability ? '#D3D3D3' : '#FF5722',
                  textTransform: 'none',
                  '&:hover': item.availability
                  ? {}
                  : {
                    backgroundColor: '#FF5722',
                    color: 'white', 
                  },
                }}
                >
                  Reserve
                </Button>
              </Box>
            </div>
          </div>
          </Grid>
        ))}
        </Grid>
        </Box>
 );
}

export default BrowseMedia;










