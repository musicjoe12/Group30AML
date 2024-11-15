//run server - cd server - node index.js
//open browser - http://localhost:8080/
//ctrl + c to stop server
//console.log(app); //shows methods and properties of express app

require("dotenv").config(); 
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = 8080;  

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

mongoose.connect("mongodb+srv://samuel:lqBvVKDKsE6MbvOZ@backend.psehq.mongodb.net/AML?retryWrites=true&w=majority&appName=backend")
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log(err);
});