const User = require("../models/User.model");
exports.create = async (body) => {
  const user = new User({
    ...body,
  });

  const token = await user.generateToken();
  if (!token) throw new Error("Failed to generate token");
  const createdUser = await user.save();
  const result = {
    token,
    user: createdUser,
  };
  return result;
};
exports.get = async (email) => {
  const data = await User.findOne({ email });
  return data;
};
exports.update = async (email, updateBody) => {
  const data = await User.findOneAndUpdate(
    { email },
    { $set: updateBody },
    { new: true }
  );

  return data;
};
exports.delete = async (email) => {
  const data = await User.findOneAndDelete({ email });
  return data;
};
exports.getWithPagination = async (
  query,
  pagination,
  sort = { _id: -1 },
  select
) => {
  const pageNumber = pagination.page || 1; // Get page number from request query parameters, default to 1
  const pageSize = pagination.limit || 10; // Get page size from request query parameters, default to 10

  // Calculate the number of documents to skip
  const skip = (pageNumber - 1) * pageSize;
  const result = await User.find(query)
    .sort(sort)
    .skip(skip) // Skip documents
    .limit(pageSize) // Limit the number of documents returned
    .select(select);
  return result;
};
