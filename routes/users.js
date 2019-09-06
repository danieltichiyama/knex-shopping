const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/users/:user_id", (req, res) => {
  db.raw("SELECT * FROM users WHERE id = ?", [req.params.user_id])
    .then(results => {
      if (results.rows.length === 0) {
        throw new Error();
      }
      console.log(results.rows);
      res.json(results.rows);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "User not found" });
    });
});

router.post("/users/login", (req, res) => {
  console.log(req.body);

  let errMessage;
  db.raw("SELECT * FROM users WHERE email = ?", [req.body.email])
    .then(results => {
      console.log(results.rows);
      if (results.rows.length === 0) {
        errMessage = "User not found";
        throw new Error();
      }

      if (results.rows[0].password !== req.body.password) {
        errMessage = "Incorrect password";
        throw new Error();
      }

      console.log(results.rows);
      res.json(results.rows);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ message: errMessage });
    });
});

module.exports = router;
