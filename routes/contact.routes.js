// user.routes.js
const express = require("express");
const router = express.Router();
const {
  contact: { create, get, getWithPagination, delete_, update },
} = require("../controllers/apis");
const { isAuthenticated } = require("../helper");

// Routes

// Create/Register a new user
router.route("/").post(isAuthenticated,create);
// Get a user by Email
router.route("/:id").get(isAuthenticated,get);
// Update a user by Email
router.route("/:id").put(isAuthenticated,update);
// Delete a user by Email
router.route("/:id").delete(isAuthenticated,delete_);
// Get all users with pagination
router.route("/").get(isAuthenticated,getWithPagination);

// Export the router
module.exports = router;
