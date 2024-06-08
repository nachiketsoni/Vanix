exports.create = async (body) => {
  return "create";
};

exports.get = async (email) => {
  return "get";
};

exports.update = async (email, updateBody) => {
  return "update";
};
exports.delete = async (email) => {
  return "delete";
};

exports.getWithPagination = async (
  query,
  pagination,
  sort = { _id: -1 },
  select
) => {
  return "getAll";
};
