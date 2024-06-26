const httpStatus = require("http-status");
const { contact } = require("../../actions");
const { successResponse, errorResponse } = require("../../helper");

//------------------CONTACT CRUD OPERATIONS------------------//

exports.create = async (req, res, next) => {
  try {
    const data = await contact.create(req.user ,req.body);
    return successResponse(req, res, data);
  } catch (error) {
    console.log("err", error);
    return errorResponse(
      req,
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};
exports.get = async (req, res, next) => {
  try {
    const data = await contact.get(req.params.id);
    return successResponse(req, res, data);
  } catch (error) {
    console.log("err", error);
    return errorResponse(
      req,
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};
exports.delete_ = async (req, res, next) => {
  try {
    const data = await contact.delete(req.params.id);
    return successResponse(req, res, data);
  } catch (error) {
    console.log("err", error);
    return errorResponse(
      req,
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};
exports.update = async (req, res, next) => {
  try {
    const data = await contact.update(req.params.id, req.body);
    return successResponse(req, res, data);
  } catch (error) {
    console.log("err", error);
    return errorResponse(
      req,
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};
exports.getWithPagination = async (req, res) => {
  try {
    const { limit, currentPage, sort, select = "", ..._query } = req.query;
    let filter = {};
    filter = { ...filter, ..._query };
    let data = await contact.getWithPagination(
      { ...filter },
      { limit: parseInt(limit || 1), page: parseInt(currentPage || 1) },
      { _id: parseInt(sort || 1) },
      select
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(
      req,
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

//-------------------------------------------------------//
