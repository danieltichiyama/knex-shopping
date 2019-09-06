const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/users", (req, res) => {
  res.send("USERS smoke test");
});

module.exports = router;
