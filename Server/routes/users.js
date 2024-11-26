const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/userController');
 
// Get all users
router.get('/users', userControllers.getAllUsers);
// Get a user
router.get('/user/:id', userControllers.getUser);
// Get user's books borrowed
router.get('/user-books-borrowed/:id', userControllers.getUserBookBorrowed);

module.exports = router;