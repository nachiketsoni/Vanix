const mongoose = require("mongoose");

const connectDatabase = () => {
  try {
    mongoose
      .connect(process.env.MONGODB_URI)
      .then((data) =>
        console.log(`Mongodb connected with server: ${data.connection.host}`)
      );
  } catch (error) {
    console.log("DataBase Error : " + error);
  }
};

module.exports = connectDatabase;
