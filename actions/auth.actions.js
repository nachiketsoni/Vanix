const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

/**
 * @param {string} email
 * @param {string} password
 * @returns {string} token
 */
exports.login = async (body) => {
  const { email, password } = body;
  if (!email || !password) throw new Error("Email and Password is Required");
  const user = await User.findOne({ email: email }).select("+password");
    if (!user) throw new Error("Email or Password is Incorrect");

  // Custom Method to Compare Given Password to Hashed Password in Database
  const isPasswordMatched = await user?.comparePassword(body.password);
  if (!isPasswordMatched) throw new Error("Email or Password is Incorrect");

  // Generating a JWT token for authentication and saving user's Id in it
  const token = await user.generateToken();
    if (!token) throw new Error("Failed to generate token");

  return token;
};
