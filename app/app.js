const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const myDB = require("../db/db");
const routes = require("./route");

app.use([morgan("dev"), cors(), express.json()]);
app.use(require("./route"));

module.exports = app;
