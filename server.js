"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const app = express();

const users = require("./routes/users");
const products = require("./routes/products");
const carts = require("./routes/carts");

const PORT = 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  //   db.raw("SELECT * FROM users").then(results => {
  // console.log(results.rows);
  // res.json(results.rows);
  //   });
  res.send("smoke test");
});

app.use("/", users);
app.use("/", products);
app.use("/", carts);

app.listen(PORT, () => {
  console.log(`Server started on PORT:${PORT}$`);
});
