const express = require("express");
const routes = express.Router();

const user = require("./user.routes");


routes.use("/user", user);

module.exports = routes;
