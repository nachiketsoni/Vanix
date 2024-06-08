const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

// Define the user schema
const userSchema = new Schema(
  {
    profile_photo: {
      public_id: { type: String },
      url: { type: String },
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: [8, "Your password must be longer than 8 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: [validator.isEmail, "Please enter a valid email address"],
      set: (value) => value.toLowerCase(),
      index: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
  try {
    this._isNewUser = this.isNew;

    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare the user password with the hashed password in the database
userSchema.methods.comparePassword = async function (plainPassword) {
  try {
    if (!plainPassword || typeof plainPassword !== "string") {
      throw new Error("Invalid plaintext password");
    }
    if (!this.password || typeof this.password !== "string") {
      throw new Error("Invalid hashed password");
    }
    const isMatch = await bcrypt.compare(plainPassword, this.password);
    return isMatch;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    return false; // or handle the error in a different way
  }
};

// Generate a JWT token for the user
userSchema.methods.generateToken = function () {
  try {
    const payload = { id: this._id };

    // Ensure JWT secret and expiration are defined
    if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRE) {
      throw new Error(
        "JWT_SECRET or JWT_EXPIRE is not defined in environment variables"
      );
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};

// Export the model
const User = mongoose.model("User", userSchema);

module.exports = User;
