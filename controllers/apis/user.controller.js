const httpStatus = require("http-status");
const { user } = require("../../actions");
const { successResponse, errorResponse } = require("../../helper");

//------------------USER CRUD OPERATIONS------------------//
exports.create = async (req, res, next) => {
  try {
    const data = await user.create(req.body);
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
    const data = await user.get(req.params.email);
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
    const data = await user.delete(req.params.email);
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
    const data = await user.update(req.params.email, req.body);
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
    let data = await user.getWithPagination(
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
