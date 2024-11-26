const BookModel = require('../models/bookModel');

module.exports = {

    getAllBooks: async (req, res) => {
        await BookModel.find()
        .then(books => res.json(books))
        .catch(err => console.log(err));
    },

    getBook: async (req, res) => {
        await BookModel.findById(req.params.id)
        .then(book => res.json(book))
        .catch(err => console.log(err));
    },  

    getMultipleBooks: async (req, res) => {
        const { ids } = req.query;
        const bookIds = ids.split(',');
        await BookModel.find({ _id: { $in: bookIds } })
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
    },

    transferBook: async (req, res) => {
        //store branch name in a variable
        
        //store book id in a variable

        //grab the book from the current branch and store it in a variable

        //delete the book from the current branch
        
        //connect to the new branch

        //create a new book in the new branch

        //connect to the previous branch
    }

}