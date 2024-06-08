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

// Create a new user
exports.create = async (body) => {
  try {
    // Create the user
    const user = await User.create(body);

    // Generate the token
    const token = user.generateToken();
    if (!token) throw new Error("Failed to generate token");

    // Return the result
    const result = {
      token,
      user,
    };
    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Get a user by email
exports.get = async (email, withPassword = 0) => {
  try {
    const user = await User.findOne({
      where: { email },
      raw: Number(withPassword),
    });
    return user;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};

// Update a user by email
exports.update = async (email, updateBody) => {
  try {
    const [updatedCount] = await User.update(updateBody, {
      where: { email },
    });
    if (updatedCount > 0) {
      const updatedUser = await User.findOne({ where: { email } });
      return updatedUser;
    }
    throw new Error("User not found");
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Delete a user by email
exports.delete = async (email) => {
  try {
    const deleted = await User.destroy({ where: { email } });
    if (deleted === 0) {
        throw new Error("User Not Found")
    }
    return Boolean(deleted) ? "Success" : "Failed";
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Get users with pagination
exports.getWithPagination = async (
  query,
  pagination,
  sort,
  select = [],
  withPassword = 0
) => {
  try {
    const pageNumber = pagination.page || 1;
    const pageSize = pagination.limit || 10;
    const offset = (pageNumber - 1) * pageSize;
    // Validate and format sort parameter
    if (!Array.isArray(sort)) {
      throw new Error("Sort parameter must be an array");
    }

    sort = sort.map((item) => {
      if (Array.isArray(item) && item.length === 2) {
        const [field, direction] = item;
        if (
          typeof field === "string" &&
          (direction === "ASC" || direction === "DESC")
        ) {
          return item;
        } else {
          throw new Error(
            "Each sort item must be an array with a string field and direction ('ASC' or 'DESC')"
          );
        }
      } else {
        throw new Error("Each sort item must be an array with two elements");
      }
    });
    const users = await User.findAndCountAll({
      where: query,
      order: sort, // Here's where the sort parameter is used
      limit: pageSize,
      offset: offset,
      raw: Number(withPassword),
      attributes: select.length > 0 ? select : undefined,
    });
    return {
      totalItems: users.count,
      totalPages: Math.ceil(users.count / pageSize),
      currentPage: pageNumber,
      data: users.rows,
    };
  } catch (error) {
    console.error("Error fetching users with pagination:", error);
    throw error;
  }
};
