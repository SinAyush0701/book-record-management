 const { UserModel, BookModel } = require("../models");

 const IssuedBook= require("../dtos/book-dto"); // Importing DTO file

exports.getAllBooks= async (req, res)=> {
    const books= await BookModel.find(); // Finding all books that're needed to be fetched

    if(books.length === 0)
    return res.status(404).json({
        success: false,
        message: "No Book Found",
    });

    res.status(200).json({ success: true, data: books});
};

exports.getSingleBookById= async (req, res)=> {
    const { id } = req.params;
    const book= await BookModel.findById(id); 

    if(!book)
    return res.status(404).json({ success: false, message: "Book Not Found"});

    return res.status(200).json({ success: true, data: book});
}; 

exports.getAllIssuedBooks= async (req, res)=> {
    const users= await BookModel.find({
        issuedBook: { $exists: true },
    }).populate("issuedBook");

    const issuedBooks= users.map((each) =>new IssuedBook(each));

    if(issuedBooks.length === 0)
    return res.status(404).json({success: false, message: "No book has been issued"});

    return res.status(200).json({success: true, data: issuedBooks});
}; 

exports.addNewBook= async (req, res)=> {
    const { data } = req.body;

    if(!data) {
        return res.status(400).json({
            success: false,
            message: "No Data was provided",
        });
    }

    await BookModel.create(data);

    const allBooks= await BookModel.find();

    /** if(book){
        return res.status(404).json({ success: false, message: "Book already exists with the same ID"});
    } */

    return res.status(200).json({
        success: true, 
        data: allBooks,
    });
};

exports.updateBookById= async (req, res)=> {
    const { id } = req.params;
    const { data } = req.body;

    const updatedBook= await BookModel.findOneAndUpdate({_id: id}, data, {
        new: true,
        });
    return res.status(200).json({
        success: true,
        data: updatedBook,
    });
};