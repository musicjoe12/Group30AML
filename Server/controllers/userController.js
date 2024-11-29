
const UserModel = require('../models/userModel');
const mongoose = require('mongoose');

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

    getUserBookReserved: async (req, res) => {
        await UserModel.findById(req.params.id)
        .then(user => res.json(user.books_reserved))
        .catch(err => console.log(err));
    },

    deleteUserBookBorrowed: async (req, res) => {
        try {
            const user = await UserModel.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            const bookId = req.params.books_borrowed;
    
            // Find the index of the book to remove
            const bookIndex = user.books_borrowed.findIndex(
                (book) => book.book_id === bookId
            );
    
            if (bookIndex === -1) {
                return res.status(404).json({ message: 'Book not found in borrowed books' });
            }
    
            // Remove the book from the array
            user.books_borrowed.splice(bookIndex, 1);
    
            // Save the updated user
            await user.save();
    
            res.json(user.books_borrowed); // Return updated borrowed books
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error removing borrowed book', error: err });
        }
    },

    addBorrowedBook: async (req, res) => {
        console.log("Request Body:", req.body);
        try {
            const user = await UserModel.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            const { book_id, due_date } = req.body;
    
            if (!book_id || !due_date) {
                return res.status(400).json({ message: "book_id and due_date are required" });
            }
    
            // Add the new book to the books_borrowed array
            user.books_borrowed.push({ book_id, due_date });
    
            const updatedUser = await user.save();
            res.json(updatedUser.books_borrowed);
        } catch (err) {
            console.error("Error adding borrowed book:", err);
            res.status(500).json({ message: "Error adding borrowed book", error: err });
        }
    },

    addReservedBook: async (req, res) => {
        await UserModel.findById(req.params.id)
        .then(user => {
            user.books_reserved.push(req.body.book);
            user.save()
            .then(updatedUser => res.json(updatedUser.books_reserved))
            .catch(err => res.status(500).json({ message: 'Error saving user', error: err }));
        })
        .catch(err => res.status(500).json({ message: 'Error finding user', error: err }));
    },

    deleteUserReservedBook: async (req, res) => {
        await UserModel.findById(req.params.id)
        .then(user => {
            const bookReserved = req.params.books_reserved
            const bookIndex = user.books_reserved.indexOf(bookReserved);
            if(bookIndex === -1){
                return res.status(404).json({ message: 'Book not found in reserved books' });
            }
            user.books_reserved.splice(bookIndex, 1);   
            user.save()
            res.json(user.books_reserved);
        })
        .catch(err => console.log(err));
    },

    updateDueDate: async (req, res) => {
        try {
            const { id, book_id } = req.params; // Extract user ID and book ID from params
            const { due_date } = req.body; // Extract new due date from request body
    
            // Validate the input
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "Invalid user ID" });
            }
            if (!due_date) {
                return res.status(400).json({ message: "New due date is required" });
            }
    
            // Find the user and update the specific book's due date
            const user = await UserModel.findOneAndUpdate(
                { _id: id, "books_borrowed.book_id": book_id }, // Match user and specific book
                { $set: { "books_borrowed.$.due_date": due_date } }, // Update due_date in the matched book
                { new: true } // Return the updated user document
            );
    
            // If user or book not found, return an error
            if (!user) {
                return res.status(404).json({ message: "User or book not found" });
            }
    
            res.json(user.books_borrowed); // Return the updated books_borrowed array
        } catch (err) {
            console.error("Error updating due date:", err);
            res.status(500).json({ message: "Internal server error", error: err });
        }

    },
};

