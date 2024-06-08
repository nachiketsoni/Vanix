// user.routes.js
const express = require("express");
const router = express.Router();

const {
  auth: { login },
} = require("../controllers/apis");

// Routes
// Login a User
router.route("/").post(login);

// Export the router
module.exports = router;
