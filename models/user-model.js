// importing mongoose
const mongoose= require("mongoose");

const Schema= mongoose.Schema; // Downloaded mongoose to have certain structure

const userSchema= new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    issuedBook: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book", // collections
        required: false,
    },
    issuedDate: {
        type: String,
        required: false,
    },
    returnDate: {
        type: String,
        required: false,
    },
    subscriptionType: {
        type: String,
        required: true,
    },
    subscriptionDate: {
        type: String,
        required: true,
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);