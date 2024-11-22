const express = require('express');
const router = express.Router();

const bookControllers = require('../controllers/bookControllers');


// Get all books
router.get('/books', bookControllers.getAllBooks);

//Create a new book
router.post('/add-book', bookControllers.createBook);

//update a book 
router.patch('/update-book/:id', bookControllers.updateBook); 

//delete a book
router.delete('/delete-book/:id', bookControllers.deleteBook);

module.exports = router;