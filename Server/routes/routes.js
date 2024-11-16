const express = require('express');
const router = express.Router();

const db = require('../db/connection');
const BookModel = require('../models/books');


// Get all books
router.get('/books', async (req, res) => {
  try {
    const books = await BookModel.find({});
    console.log(books);
    res.json(books);
} catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    console.log(error);
}
});

// Add more routes as needed


module.exports = router;