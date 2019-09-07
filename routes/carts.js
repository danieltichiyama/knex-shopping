const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/carts/user_id", (req, res) => {
  db.raw(
    "SELECT * FROM carts INNER JOIN users ON carts.user_id = users.id WHERE user_id = ?",
    [req.params.user_id]
  ).then(results => {
    res.json(results.rows);
  });
});

router.post("/carts/:user_id/:product_id", (req, res) => {
  let errMsg;
  db.raw("SELECT * FROM users WHERE id = ?", [req.params.user_id])
    .then(results => {
      if (results.rowCount === 0) {
        errMsg = "User not found";
        throw new Error();
      }
      console.log("found user");
      db.raw("SELECT * FROM products WHERE id = ?", [req.params.product_id])
        .then(results => {
          if (results.rowCount === 0) {
            errMsg = "Product not found";
            throw new Error();
          }
          console.log("found product");
          db.raw("INSERT INTO carts (user_id, products_id) VALUES (?,?)", [
            req.params.user_id,
            req.params.product_id
          ]).then(results => {
            res.json({ success: true });
          });
        })
        .catch(err => {
          res.status(400).json({ message: errMsg });
        });
    })
    .catch(err => {
      res.status(400).json({ message: errMsg });
    });
});

router.delete("/carts/:user_id/:product_id", (req, res) => {
  let errMsg;
  db.raw("SELECT * FROM users WHERE id = ?", [req.params.user_id])
    .then(results => {
      if (results.rowCount === 0) {
        errMsg = "user";
        throw new Error();
      }
      db.raw("SELECT * FROM products WHERE id = ?", [req.params.product_id])
        .then(results => {
          if (results.rowCount === 0) {
            errMsg = "product";
            throw new Error();
          }
          db.raw("DELETE FROM carts WHERE user_id =? AND products_id = ?", [
            req.params.user_id,
            req.params.product_id
          ]).then(results => {
            res.json({ success: true });
          });
        })
        .catch(err => {
          res.status(400).json({ message: errMsg });
        });
    })
    .catch(err => {
      res.status(400).json({ message: `Cart not found with that ${errMsg}` });
    });
});

module.exports = router;
