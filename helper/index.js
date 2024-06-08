exports.successResponse = (req, res, data, code = 200) =>
  res.status(code).json({
    code,
    data,
    success: true,
  });

exports.errorResponse = (
  req,
  res,
  code = 500,
  errorMessage = "Something went wrong",
  error = {},
  errorfields = {}
) => {
  res.status(code).json({
    code,
    errorMessage,
    error,
    errorfields,
    success: false,
  });
};
