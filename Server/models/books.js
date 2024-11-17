const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    publication_year: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        required: true
    }    
});

const BookModel = mongoose.model('books', bookSchema);
module.exports = BookModel;