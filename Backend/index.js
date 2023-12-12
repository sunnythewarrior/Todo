const express = require("express");
const app = express();
const connectWithDb = require("./config/db");
require("dotenv").config();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
connectWithDb();

const userRoutes = require("./routes/userRoutes");

/** All routes starts here */
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT);
console.log(`Application Running on port ${PORT}`);
