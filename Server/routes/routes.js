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

//Create a new book
router.post('/add-book', async(req,res) => {
  const book = new BookModel(req.body)
  try{
      await book.save()
      res.status(201).json({
          status: 'Success',
          data : {
            book
          }
      })
  }catch(err){
      res.status(500).json({
          status: 'Failed',
          message : err
      })
  }
});

//update a book
//sort out id 
router.patch('/update-book/:id', async (req,res) => {
  const updatedBook = await BookModel.findByIdAndUpdate(req.params.id,req.body,{
      new : true,
      runValidators : true
    })
  try{
      res.status(200).json({
          status : 'Success',
          data : {
            updatedBook
          }
        })
  }catch(err){
      console.log(err)
  }
});

//delete a book
router.delete('/delete-book/:id', async(req,res) => {
  const book = await BookModel.findByIdAndDelete(req.params.id)
  try{
    res.status(204).json({
        status : 'Success',
        data : {
          book
        }
    })
  }catch(err){
      res.status(500).json({
          status: 'Failed',
          message : err
      })
  }
});

module.exports = router;