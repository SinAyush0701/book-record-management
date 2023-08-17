const express= require("express");

// import DbConnection file
const DbConnection = require("./databaseConnection");

// import db
const dotenv= require("dotenv");

// const { users }= require("./data/users.json");

//import routes
const usersRouter= require("./routes/users");
const booksRouter= require("./routes/books");

dotenv.config(); // calling the database

const app= express(); //First server starts

DbConnection(); //Then, DB starts

const PORT= 8081;

app.use(express.json());

app.get("/", (req, res)=> {
    res.status(200).json({
        message: "Server is up and running successfully"
    });
});

app.use("/users", usersRouter);
app.use("/books", booksRouter);

app.get("*", (req, res)=> {
    res.status(404).json({
        message: "This route doesn't exist",
    });
});

app.listen(PORT, ()=> {
    console.log(`Server is running at port ${PORT}`);
});
