// The same code is common for all the projects
const mongoose= require("mongoose");

function DbConnection() {
    const DB_URL= process.env.MONGO_URI;

    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

const db= mongoose.connection; //Accessing DB

db.on("error", console.error.bind("Connection error")); //Dealing with errors

db.once("open", function() {   // When connection becomes successful
    console.log("DB Connected!!");
});

} 

module.exports = DbConnection;