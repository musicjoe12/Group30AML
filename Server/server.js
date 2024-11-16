//run server - cd server - node index.js
//open browser - http://localhost:8080/
//ctrl + c to stop server


require("dotenv").config(); 
const express = require('express');
const connectDB = require("./db/connection");
const routes = require("./routes/routes");
const cors = require('cors');


const app = express();

const PORT = process.env.PORT;  

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api', routes); //localhost:8080/api/...

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

