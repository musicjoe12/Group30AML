
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
};

