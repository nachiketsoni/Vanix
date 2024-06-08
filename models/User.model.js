const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sequelize = require("../configs/database.config");

// Define the User model
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      trim: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Please enter a valid email address",
        },
      },
      set(value) {
        this.setDataValue("email", value.toLowerCase());
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("password", bcrypt.hashSync(value, 10));
      },
      validate: {
        len: {
          args: [8],
          msg: "Your password must be longer than 8 characters",
        },
      },
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      beforeUpdate: async (user) => {
        if (user.password && user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

// Hide Password from search results
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  delete values.password;
  return values;
};

// Compare the user password with the hashed password in the database
User.prototype.comparePassword = async function (plainPassword) {
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
User.prototype.generateToken = function () {
  try {
    const payload = { id: this.id };

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

module.exports = User;
