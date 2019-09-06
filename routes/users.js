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

router.post("/users/register", (req, res) => {
  db.raw("SELECT * FROM users WHERE email = ?", [req.body.email])
    .then(results => {
      if (results.rows.length !== 0) {
        throw new Error();
      }
      db.raw("INSERT INTO users (email,password) VALUES (?,?) RETURNING *", [
        req.body.email,
        req.body.password
      ]).then(results => {
        res.json(results.rows);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ message: "User already exists" });
    });
});

router.put("/users/:user_id/forgot-password", (req, res) => {
  db.raw("UPDATE users SET password = ? WHERE id = ?", [
    req.body.password,
    req.params.user_id
  ]).then(results => {
    res.json({ message: "New password created!" });
  });
});

router.delete("/users/:user_id", (req, res) => {
  db.raw("DELETE FROM users WHERE id = ?", [req.params.user_id])
    .then(results => {
      console.log(results);
      if (results.rowCount === 0) {
        throw new Error();
      }
      res.json({
        message: `User id: ${req.params.user_id} successfully deleted`
      });
    })
    .catch(err => {
      res.status(400).json({ message: "User ID not found" });
    });
});

module.exports = router;
