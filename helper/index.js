const jwt = require("jsonwebtoken");


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

exports.isAuthenticated = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    // If no Authorization header is present, return an error
    return res.status(401).json({
      code: 401,
      errorMessage: "Session Expired",
      error: {},
      errorfields: {},
      success: false,
    });
  }

  // The token is typically in the format 'Bearer <token>'
  const token = authHeader.split(" ")[1];

  if (!token) {
    // If the token part is missing, return an error
    return res.status(401).json({
      code: 401,
      errorMessage: "Malformed token",
      error: {},
      errorfields: {},
      success: false,
    });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      
      // If the token is invalid or expired, return an error
    if (err) return res.status(403).json({
      code: 403,
      errorMessage: "Session Expired",
      error: {},
      errorfields: {},
      success: false,
    });

    // If the token is valid, add the decoded data to the request object
    req.user = decoded.id;
    // Proceed to the next middleware or route handler
    next();
  });
};
