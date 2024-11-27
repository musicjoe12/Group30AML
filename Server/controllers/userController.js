
const UserModel = require('../models/userModel');

module.exports = {

    getAllUsers: async (req, res) => {
        await UserModel.find()
        .then(users => res.json(users))
        .catch(err => console.log(err));
    },

    getUser: async (req, res) => {
        await UserModel.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => console.log(err));
    },

    getUserBookBorrowed: async (req, res) => {
        await UserModel.findById(req.params.id)
        .then(user => res.json(user.books_borrowed))
        .catch(err => console.log(err));
    },

    deleteUserBookBorrowed: async (req, res) => {
        await UserModel.findById(req.params.id)
        .then(user => {
            const bookBorrowed = req.params.books_borrowed
            const bookIndex = user.books_borrowed.indexOf(bookBorrowed);
            if(bookIndex === -1){
                return res.status(404).json({ message: 'Book not found in borrowed books' });
            }
            user.books_borrowed.splice(bookIndex, 1);   
            user.save()
            res.json(user.books_borrowed);
        })
        .catch(err => console.log(err));
    },

    addBorrowedBook: async (req, res) => {
        await UserModel.findById(req.params.id)
        .then(user => {
            user.books_borrowed.push(req.body.book);
            user.save()
            .then(updatedUser => res.json(updatedUser.books_borrowed))
            .catch(err => res.status(500).json({ message: 'Error saving user', error: err }));
        })
        .catch(err => res.status(500).json({ message: 'Error finding user', error: err }));
    },
};

