const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const connectWithDb = require("./config/db");
require("dotenv").config();
const bodyParser = require("body-parser");
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
connectWithDb();

const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");

/** All routes starts here */
app.use("/api/users", userRoutes);
app.use("/api/todo", todoRoutes);
const PORT = process.env.PORT || 8080;
app.listen(PORT);
console.log(`Application Running on port ${PORT}`);
