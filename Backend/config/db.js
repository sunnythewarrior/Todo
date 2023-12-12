const mongoose = require("mongoose");

const dbConnection = () => {
  console.log("DB URL:", process.env.DB_URL);
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB Connected");
    })
    .catch((error) => {
      console.error("Error in DB Connection:", error);
      process.exit(1);
    });
};

module.exports = dbConnection;
