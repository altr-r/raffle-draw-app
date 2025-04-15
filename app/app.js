const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const myDB = require("../db/db");

app.use([morgan("dev"), cors(), express.json()]);

myDB.create("user 1", 10);
myDB.create("user 2", 10);
myDB.create("user 3", 10);
myDB.create("user 4", 10);
myDB.create("user 5", 10);
myDB.bulkCreate("user 6", 10, 2);

const tickets = myDB.find();
console.log("All tickets: ", tickets);
const winners = myDB.draw(2);
console.log("Winners: ", winners);

module.exports = app;
