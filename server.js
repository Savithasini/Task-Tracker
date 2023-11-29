const express = require('express');
const cors = require('cors');
const db = require("./config/database")
const dotenv = require("dotenv");
const logger = require("morgan");
require("colors")

const app = express();
dotenv.config({ path: "./config/config.env" });
//DB connection
db(app);
app.use(cors());
app.use(express.json());
app.use(express.static("./client"));
app.use(express.urlencoded({ extended: false }));
app.use(require("./controller/user"));
app.use(require('./controller/admin'));
app.use(require('./controller/task'));
if (process.env.NODE_ENV === "production") console.log = function () { };
if (process.env.NODE_ENV === "development") app.use(logger("dev"));
module.exports = app;