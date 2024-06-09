const Contact = require("../models/Contact.model");
const User = require("../models/User.model");

// Create a new user
exports.create = async (user, body) => {
  try {
    // Create a new contact associated with this user
    const contact = await Contact.create({
      ...body,
      owner: user,
    });
    // Return the data
    return contact;
  } catch (error) {
    console.error("Error creating:", error);
    throw error;
  }
};

// Get a data by id
exports.get = async (id,user) => {
    console.log(user)
  try {
    const data = await Contact.findOne({
      where: { id,owner:user },
    });
    return data;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};

// Update a Data by id
exports.update = async (id, updateBody,user) => {
  try {
    const [updatedCount] = await Contact.update(updateBody, {
      where: { id,owner:user },
    });
    if (updatedCount > 0) {
      const updatedData = await Contact.findOne({ where: { id } });
      return updatedData;
    }
    throw new Error("Contact not found");
  } catch (error) {
    console.error("Error updating Data:", error);
    throw error;
  }
};

// Delete a Data by id
exports.delete = async (id,user) => {
  try {
    const deleted = await Contact.destroy({ where: { id, owner: user } });
    if (deleted === 0) {
      throw new Error("Contact Not Found");
    }
    return Boolean(deleted) ? "Success" : "Failed";
  } catch (error) {
    console.error("Error deleting Data:", error);
    throw error;
  }
};

// Get users with pagination
exports.getWithPagination = async (
  query,
  pagination,
  sort,
  select = [],
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
    const users = await Contact.findAndCountAll({
      where: query,
      order: sort, // Here's where the sort parameter is used
      limit: pageSize,
      offset: offset,
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
