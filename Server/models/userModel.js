const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    books_borrowed: {
        type: Array,
        required: true
    },
    branch: {
        type: String,
        required: true
    }  

},{ versionKey: false });

const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;