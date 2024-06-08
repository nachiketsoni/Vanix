const httpStatus = require("http-status");
const { auth } = require("../../actions");
const { successResponse, errorResponse } = require("../../helper");

//------------------USER AUTH OPERATIONS------------------//
exports.login = async (req, res, next) => {
  try {
    const data = await auth.login(req.body);

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
//-------------------------------------------------------//
