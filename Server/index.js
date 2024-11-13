//run server - cd server - node index.js
//open browser - http://localhost:8080/
//ctrl + c to stop server
//console.log(app); //shows methods and properties of express app

const express = require('express');
const app = express(); // Create an express app
const cors = require('cors'); // Cross Origin Resource Sharing

app.use(cors()); // Use cors middleware


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(8080, () => {   
    console.log('Server is listening on port 8080');
});
