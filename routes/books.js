const express= require("express");
const { 
    getAllBooks,
    getSingleBookById,
    getAllIssuedBooks,
    addNewBook,
    updateBookById,
} = require("../controllers/book-controller"); // importing attributes from book-controller.js

const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const { UserModel, BookModel } = require("../models");  // Importing index.js file from models folder

const router= express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all the books
 * Access: Public
 * Parameters: none
 */

// router.get("/", (req, res)=> {
//    res.status(200).json({ success: true, data: books});
// });

router.get("/", getAllBooks);

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get books by their ID
 * Access: Public
 * Parameters: id
 */

router.get("/:id", getSingleBookById);

/**
 * Route: /books/issued/by-user
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameters: none
 */

router.get("/issued/by-user", getAllIssuedBooks);

/**
 * Route: /books
 * Method: POST
 * Description: Create a new book
 * Access: Public
 * Parameters: none
 */

router.post("/", addNewBook);

/**
 * Route: /books/:id
 * Method: PUT
 * Description: Updating a book
 * Access: Public
 * Parameters: id
 */

router.put("/:id", updateBookById);

// default export
module.exports = router;