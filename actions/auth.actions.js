const { generateToken } = require("../helper");
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

exports.login = async (body) => {
  const { email, password } = body;
  //   if (!email || !password) throw new Error("Email and Password are required");

  //   console.log(body);
  const user = await User.findOne({
    where: { email },
    raw: true,
  });

  //   if (!user) throw new Error("User not found");

  // Using Bcrypt to Compare Given Password to Hashed Password in Database

  console.log(hashed);
  bcrypt.compare(password, user.password, function (err, result) {
    if (err) {
      throw err;
    }
    console.log(result);
  });
  // Generating a JWT token for authentication and saving user's Id in it
  const token = user.generateToken(user.id);
  if (!token) throw new Error("Failed to generate token");

  return token;
};
