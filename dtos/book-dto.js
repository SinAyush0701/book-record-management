// DTO => Data Transfer Object

class IssuedBook{ // Mention things we require w.r.t books issued from library
    _id; // auto-generated ids
    name;
    genre;
    price;
    publisher;
    // attributes w.r.t users
    issuedBy;
    issuedDate;
    returnDate;

    constructor(user){
        this._id= user.issuedBook._id;
        this.name= user.issuedBook.name;
        this.genre= user.issuedBook.genre;
        this.price= user.issuedBook.price;
        this.publisher= user.issuedBook.publisher;
        this.issuedBy= user.issuedBook.issuedBy;
        this.issuedDate= user.issuedBook.issuedDate;
        this.returnDate= user.issuedBook.returnDate;
    }
}

module.exports = IssuedBook; // Exporting the DTO