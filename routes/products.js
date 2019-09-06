const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/products", (req, res) => {
  res.send("PRODUCTS smoke test");
});

module.exports = router;
