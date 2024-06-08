// user.routes.js
const express = require("express");
const router = express.Router();

const {
  auth: { login },
} = require("../controllers/apis");

// Routes
// Create a new user
router.route("/").post(login);

// Export the router
module.exports = router;
