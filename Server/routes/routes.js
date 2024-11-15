const express = require('express');

const db = require('../db/connection');

const router = express.Router();

// Define a simple route
router.get('/', async (req, res) => {
  try {
    // const books = await db.collection('books').find().toArray();
    // res.json(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Add more routes as needed
router.get('/example', (req, res) => {
  res.send('This is an example endpoint');
});

module.exports = router;