const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/carts", (req, res) => {
  res.send("CARTS smoke test");
});

module.exports = router;
