// user.routes.js
const express = require("express");
const router = express.Router();
const {
  user: {create, get, getWithPagination, delete_, update },
} = require("../controllers/apis");

// Routes

// Create/Register a new user
router.route("/").post(create);
// Get a user by Email
router.route("/:email").get(get);
// Update a user by Email
router.route("/:email").put(update);
// Delete a user by Email
router.route("/:email").delete(delete_);
// Get all users with pagination
router.route("/").get(getWithPagination);

// Export the router
module.exports = router;
