const express = require("express");
const routes = express.Router();

const user = require("./user.routes");
const auth = require("./auth.routes");


routes.use("/user", user);
routes.use("/auth", auth);

module.exports = routes;
