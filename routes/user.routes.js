// user.routes.js
const express = require("express");
const router = express.Router();

const {
  user: { create, get, getWithPagination, delete_, update },
} = require("../controllers/apis");

// Routes
// Create a new user
router.route("/").post(create);
// Get a user by ID
router.route("/:id").get(get);
// Update a user by ID
router.route("/:id").put(update);
// Delete a user by ID
router.route("/:id").delete(delete_);
// Get all users with pagination
router.route("/").get(getWithPagination);

// Export the router
module.exports = router;
