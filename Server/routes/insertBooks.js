const express = require("express");
//const fetch = require("node-fetch");
const csvtojson = require('csvtojson');
const BookModel = require("../models/bookModel"); // Adjust the path if needed
const router = express.Router();
const path = require("path");
const mongoose = require("mongoose");

const fetchBooks = async (req, res) => {
    
    const fileName = path.join(__dirname, "../sample.csv");
    console.log("Resolved file path:", fileName);

    try {
        const booksArray = await csvtojson({
            delimiter: ";",
            noheader: false,
            trim: true,
            quote: '"',
        })
            .preFileLine((line) =>
                // Remove extra wrapping quotes and replace doubled quotes with single quotes
                line.startsWith('"') && line.endsWith('"') ? line.slice(1, -1).replace(/""/g, '"') : line
            )
            .fromFile(fileName);

        console.log("Parsed data:", booksArray);

        // Map CSV data to the model structure
        const formattedBooks = booksArray.map((book) => ({
            _id: new mongoose.Types.ObjectId(),
            title: book["Book-Title"] || "Unknown Title",
            author: book["Book-Author"] || "Unknown Author",
            description: "No description available.",
            genre: "General",
            publication_year: parseInt(book["Year-Of-Publication"], 10) || 1900,
            publisher: book["Publisher"] || "Unknown Publisher",
            image: book["Image-URL-L"] || "https://via.placeholder.com/150",
            availability: true,
            reserved: false,
            quantity: 1,
        }));

        // Insert into the database
        await BookModel.insertMany(formattedBooks);

        console.log("Books imported successfully.");
        res.status(200).json({ message: "Books imported successfully with defaults!" });
    } catch (error) {
        console.error("Error importing books:", error);
        res.status(500).json({ error: "Failed to import books." });
    }
    
     
};


router.post("/insertBooks", fetchBooks);

module.exports = router;


