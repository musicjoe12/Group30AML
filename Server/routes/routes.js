const express = require('express');
const router = express.Router();

const db = require('../db/connection');
const BookModel = require('../models/books');


// Get all books
router.get('/books', async (req, res) => { 
  BookModel.find()
  .then(books => res.json(books))
  .catch(err => console.log(err));
});

// Add more routes as needed


module.exports = router;