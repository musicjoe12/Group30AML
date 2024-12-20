const express = require('express');
const router = express.Router();

const bookControllers = require('../controllers/bookControllers');


// Get all books
router.get('/books', bookControllers.getAllBooks);
// Get a book
router.get('/book/:id', bookControllers.getBook);
// Get multiple books
router.get('/books/multiple', bookControllers.getMultipleBooks);
// Check if a book is reserved
router.get('/reserved/:id', bookControllers.isReserved);

//Create a new book
router.post('/add-book', bookControllers.createBook);

//update a book 
router.patch('/update-book/:id', bookControllers.updateBook); 

//delete a book
router.delete('/delete-book/:id', bookControllers.deleteBook);
// transfer a book
router.post('/transfer-book/:id', bookControllers.transferBook);

module.exports = router;