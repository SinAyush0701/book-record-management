const express= require("express");
/** const { 
    getAllBooks,
    getSingleBookById,
    getAllIssuedBooks,
} = require("../controllers/book-controller"); */ // importing attributes from book-controller.js
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

router.get("/", (req, res) => {
    res.status(200).json({ success: true, data: books });
  });

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get books by their ID
 * Access: Public
 * Parameters: id
 */

router.get("/:id", (req, res) => {
    const { id } = req.params;
  
    const book = books.find((each) => each.id === id);
  
    if (!book)
      return res.status(404).json({ success: false, message: "Book not found" });
  
    return res.status(200).json({ success: true, data: book });
  });

/**
 * Route: /books/issued/by-user
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameters: none
 */

router.get("/issued/by-user", (req, res)=> {
    const usersWithIssuedBook = users.filter((each)=> {
        if(each.issuedBook) return each;
    });
    const issuedBooks= [];

    usersWithIssuedBook.forEach((each)=> {
        const book= books.find((book)=> book.id === each.issuedBook);

        book.issuedBy= each.name;
        book.issuedDate= each.issuedDate;
        book.returnDate= each.returnDate;

        issuedBooks.push(book);
    });
    if(issuedBooks.length === 0)
    return res.status(404).json({success: false, message: "No book has been issued"});

    return res.status(200).json({success: true, data: issuedBooks});
});

/**
 * Route: /books
 * Method: POST
 * Description: Create a new book
 * Access: Public
 * Parameters: none
 */

router.post("/", (req, res)=> {
    const { data }= req.body;

    if(!data){
        return res.status(400).json({
            success: false,
            message: "No Data was provided",
        });
    }

    const book= books.find((each)=> each.id === data.id);
    if(book){
        return res.status(404).json({ success: false, message: "Book already exists with same ID"});
    }

    const allBooks= [...books, data];
    return res.status(200).json({
        success: true, 
        message: allBooks,
    });
});

/**
 * Route: /books/:id
 * Method: PUT
 * Description: Updating a book
 * Access: Public
 * Parameters: id
 */

router.put("/:id", (req, res)=> {
    const { id } = req.params;
    const { data } = req.body;

    const book= books.find((each)=> each.id === id);

    if(!book){
        return res.status(400).json({
            success: false,
            message: "Book not found with that particular id",
        });
    }

    // If we find the book, we need to update it
    const updatedData= books.map((each)=> {
        if(each.id === id){
            return {...each, ...data};
        }
        return each;
    });
    return res.status(200).json({
        success: true,
        data: updatedData,
    });
});

// default export
module.exports = router;