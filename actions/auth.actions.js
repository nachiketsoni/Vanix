const { generateToken } = require("../helper");
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

exports.login = async (body) => {
  const { email, password } = body;
  if (!email || !password) throw new Error("Email and Password are required");

  const user = await User.findOne({
    where: { email },
  });
  if (!user) throw new Error("Email and Password are incorrect");

  // Comparing the password with the hashed password in the database using a custom method comparePassword
  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Email and Password are incorrect");

  // Generating a JWT token for authentication and saving user's Id in it
  let token = user.generateToken(user.id);
  if (!token) throw new Error("Failed to generate token");

  return token;
};
