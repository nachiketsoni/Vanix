const jwt = require("jsonwebtoken");

exports.isAuthenticatedForPages = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.redirect("/");
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    // If the token is invalid or expired, return to Login Page
    if (err) return res.redirect("/");
    // If the token is valid, add the decoded data to the request object
    req.user = decoded.id;
    // Proceed to the next middleware or route handler
    next();
  });
};
