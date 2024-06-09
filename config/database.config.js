const path = require("path");
const { Sequelize } = require("sequelize");

const db = new Sequelize({
  database: "db",
  dialect: "sqlite",
  username: null,
  password: null,
  storage: path.join(__dirname, "vanix.sqlite"),
});

// db.addModels([ User,Contact]);
module.exports=db;