const express = require("express");
const routes = express.Router();

const index = require("./views/index.views.routes");
const user = require("./user.routes");
const auth = require("./auth.routes");
const contact = require("./contact.routes");


routes.use("/", index);
routes.use("/user", user);
routes.use("/auth", auth);
routes.use("/contact", contact);

module.exports = routes;
