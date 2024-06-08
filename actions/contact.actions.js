const Contact = require("../models/Contact.model");
const User = require("../models/User.model");
exports.create = async (user, body) => {
  let users = await User.findById(user._id);
  let data = new Contact({
    ...body,
    owner: users._id,
  });
  console.log(users)
  users.contacts.push(data._id);
  const lguser = await users.save();
  data = await data.save();

  return { data, lguser };
};
exports.get = async (_id) => {
  const data = await Contact.findById(_id);
  return data;
};
exports.update = async (_id, updateBody) => {
  const data = await Contact.findByIdAndUpdate(
    _id,
    { $set: updateBody },
    { new: true }
  );

  return data;
};
exports.delete = async (_id) => {
  const data = await Contact.findByIdAndDelete(_id);
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
  const result = await Contact.find(query)
    .sort(sort)
    .skip(skip) // Skip documents
    .limit(pageSize) // Limit the number of documents returned
    .select(select);
  return result;
};
