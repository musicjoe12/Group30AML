import React from 'react';
import { useState, useEffect, useContext } from 'react';
import '../CSS/navbar.css';
import '../CSS/browsemedia.css';
import SearchFilter from '../Components/SearchFilter'; // Import SearchFilter
import MediaTypeSelector from '../Components/MediaTypeSelector';
import { useSearch } from '../Context/SearchContext'; // Import useSearch hook
import { Box, Grid, Typography, Card, CardMedia, CardContent, Drawer, IconButton, Button, Pagination } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { UserContext } from '../Context/UserContext';

import axios from 'axios';
import { message } from 'antd';


function BrowseMedia() {
  const [books, setBooks] = useState([]);
  const { searchValue } = useSearch();
  const { userId } = useContext(UserContext);


  const [filteredBooks, setFilteredBooks] = useState([]); 
  const [genres, setGenres] = useState(['Fiction', 'Non-fiction', 'Sci-fi', 'Biography']); 

  const [flippedCards, setFlippedCards] = useState({});
  const [filterOpen, setFilterOpen] = useState(false);

  const [openFilterModal, setOpenFilterModal] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

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

  // Fetch books from API
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

  // flip book card
  const handleFlipCard = (index) => {
    setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };
  

  
  //borrow book 
  const handleBorrow = async(id, dueDate) => {
    //console.log(id, dueDate); 
    try {
      const reservedBooksResponse = await axios.get(`http://localhost:8080/api/user-books-reserved/${userId}`);
      const reservedBooks = reservedBooksResponse.data;
      if (reservedBooks.includes(id)) {
        message.error('You cannot borrow a book you have already reserved.');
        return;
      }

      const response = await axios.post(`http://localhost:8080/api/add-borrowed-book/${userId}`, {
          book_id: id,
          due_date: dueDate,
      });
      console.log(response.data);
      updateBookAvailability(id);
  } catch (err) {
      console.error(`Borrow failed: ${err.response?.data?.message || err.message}`);
  }
  };
    
  // update book availability and quantity
  const updateBookAvailability = async(id) => {
    try{
      const bookResponse = await axios.get(`http://localhost:8080/api/book/${id}`);
      const currentQuantity = bookResponse.data.quantity;
      await axios.patch(`http://localhost:8080/api/update-book/${id}`, {
        availability: false,
        quantity: currentQuantity - 1,
      })
      .then(res => {
        console.log(res.data);
        fetchBooks();
        message.success('Book borrowed successfully!');
      })
      .catch(err => console.log(err));
    } catch (err) {console.log(err);}
    
  };


  //reserve book
  const handleReserve = async(id) => {
    try {
      // Check if the book is already borrowed by the user
      const borrowedBooksResponse = await axios.get(`http://localhost:8080/api/user-books-borrowed/${userId}`);
      const borrowedBooks = borrowedBooksResponse.data;
      if (borrowedBooks.some(book => book.book_id === id)) {
        message.error('You cannot reserve a book you have already borrowed.');
        return;
      }

      await axios.post(`http://localhost:8080/api/add-reserved-book/${userId}`, { book: id })
      .then(res => {
        console.log(res.data);
        updateBookReservation(id);
      })
      .catch(err => console.log(`reserve failed:${err}`));
    }catch (err) {console.log(err);}
  };

  // update book reservation
  const updateBookReservation = async(id) => {
    await axios.patch(`http://localhost:8080/api/update-book/${id}`, {
      reserved: true,
    })
    .then(res => {
      console.log(res.data);
      fetchBooks();
      message.success('Book reserved successfully!');
    })
    .catch(err => console.log(err));
  };
  
 return (
  <Box sx={{ backgroundColor: 'ADD8E6', py: 4, minHeight: '100vh', marginTop: '90px'}}>
    {/* Search Results Title */}
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      mt: 4,
      mb: 4,
      px: 3,
    }}
    >
      

      {/* Centered Title */}
      <Typography
      variant='h4'
      gutterBottom
      className='typography-heading'
      sx={{ fontWeight: 'bold', textAlign: 'left', flex: 1, }}
      >
        Browse Our Media
      </Typography>

      {/* Filters Btn */}

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconButton 
      onClick={() => setFilterOpen(true)}
      sx={{
        backgroundColor: '#1976d2',
        color: 'white',
        '&:hover': {
          backgroundColor: '#1565C0',
        },
        marginRight: 1,
      }}
      >
        <FilterAltIcon />
      </IconButton>

      {/* Media Type Selector */}

      <MediaTypeSelector />
      </Box>




      </Box>
      {filterOpen && (
        <SearchFilter
        books={books}
        onFilterUpdate={setFilteredBooks}
        genres={genres}
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        />
      )}
    {/* Media Card Grid */}

    <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ mt: 4, margin: '0 auto', maxWidth: '80%' }}>
      {currentItems.map((item, index) => (
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
                height='300'
                image={item.image}
                alt={item.title}
                sx={{ 
                 // maxHeight: 300,
                  objectFit: 'cover',
                 // borderTopLeftRadius: '10px',
                //  borderTopRightRadius: '10px',
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

                {/* Action Buttons at bottom */}
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  width: '100%',
                  marginTop: '10px',
                }}
                >
                {userId && (
                <>
                <Button
                  variant='contained'
                  disabled={!item.availability}
                  onClick={() => handleBorrow(item._id, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] )}
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
                  disabled={item.reserved}
                  onClick={() => handleReserve(item._id)}
                  sx={{
                    borderColor: item.reserved ? '#D3D3D3' : '#FF5722',
                    color: item.reserved ? '#D3D3D3' : '#FF5722',
                    textTransform: 'none',
                    '&:hover': item.reserved
                      ? {}
                      : {
                          backgroundColor: '#FF5722',
                          color: 'white',
                        },
                  }}
                >
                  Reserve
                  </Button>
                      </>
                    )}
                  </Box>
                </Box>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>

      {/* Pagination Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Pagination
    defaultCurrent={6}
    count={Math.ceil(filteredBooks.length / itemsPerPage)}
    onChange={handlePageChange}
    color="primary"
    shape="rounded"
    size="large"
    ></Pagination>
      </Box>
    </Box>
  );
}

export default BrowseMedia;










