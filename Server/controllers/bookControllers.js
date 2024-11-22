const BookModel = require('../models/bookModel');

module.exports = {

    getAllBooks: async (req, res) => {
        await BookModel.find()
        .then(books => res.json(books))
        .catch(err => console.log(err));
    },

    createBook: async (req, res) => {
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
    },

    updateBook: async (req, res) => {
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
    },

    deleteBook: async (req, res) => {
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
    }
}