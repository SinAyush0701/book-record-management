const express= require("express");

const { users } = require("../data/users.json");
const { UserModel, BookModel } = require("../models");  // Importing index.js file from models folder

const { 
    getAllUsers,
    getSingleUserById,
    deleteUser,
    updateUserById,
    createNewUser,
    getSubscriptionDetailsById,
} = require("../controllers/user-controller"); // Importing the variables from user-controller.js

const router = express.Router();

/**
 * Route: /users
 * Method: GET
 * Description: Get all the users
 * Access: Public
 * Parameters: none
 */

// http://localhost:8081/users

router.get("/", getAllUsers);

/**
 * Route: /users/:id
 * Method: GET
 * Description: Get user by their id
 * Access: Public
 * Parameters: id
 */

router.get("/:id", getSingleUserById);

/**
 * Route: /users
 * Method:  POST
 * Description: Create a new user
 * Access: Public
 * Parameters: none
 */

router.post("/", createNewUser);

/**
 * Route: /users/:id
 * Method:  PUT
 * Description: Updating a user data
 * Access: Public
 * Parameters: id
 */

router.put("/:id", updateUserById);

/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Deleting a user by their ID
 * Access: Public
 * Parameters: id
 */

router.delete("/:id", deleteUser);

router.get("/subscription-details/:id", getSubscriptionDetailsById);

// default export
module.exports = router;