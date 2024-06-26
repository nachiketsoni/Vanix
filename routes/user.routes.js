// user.routes.js
const express = require("express");
const router = express.Router();
const {
  user: { create, get, getWithPagination, delete_, update },
} = require("../controllers/apis");
const { isAuthenticated } = require("../helper");

// Routes

// Create/Register a new user
router.route("/").post(create);
// Get a user by Email
router.route("/:email").get(isAuthenticated,get);
// Update a user by Email
router.route("/:email").put(isAuthenticated,update);
// Delete a user by Email
router.route("/:email").delete(isAuthenticated,delete_);
// Get all users with pagination
router.route("/").get(isAuthenticated,getWithPagination);

// Export the router
module.exports = router;
