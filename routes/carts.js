const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/carts/:user_id", (req, res) => {
  if (isNaN(parseInt(req.params.user_id))) {
    return res
      .status(400)
      .json({ message: "Check that user_id is a number value" });
  }

  return db
    .raw("SELECT * FROM carts WHERE user_id = ?", [req.params.user_id])
    .then(results => {
      res.json(results.rows);
    });
});

router.post("/carts/:user_id/:product_id", (req, res) => {
  if (
    isNaN(parseInt(req.params.user_id)) ||
    isNaN(parseInt(req.params.product_id))
  ) {
    return res.status(400).json({
      message: "Check that user_id and product_id are number values"
    });
  }

  let errMsg;
  return db
    .raw("SELECT * FROM users WHERE id = ?", [req.params.user_id])
    .then(results => {
      if (results.rowCount === 0) {
        errMsg = "User not found";
        throw new Error();
      }
      return db.raw("SELECT * FROM products WHERE id = ?", [
        req.params.product_id
      ]);
    })
    .then(results => {
      if (results.rowCount === 0) {
        errMsg = "Product not found";
        throw new Error();
      }
      return db.raw("INSERT INTO carts (user_id, products_id) VALUES (?,?)", [
        req.params.user_id,
        req.params.product_id
      ]);
    })
    .then(results => {
      res.json({ success: true });
    })
    .catch(err => {
      res.status(400).json({ message: errMsg });
    });
});

router.delete("/carts/:user_id/:product_id", (req, res) => {
  if (
    isNaN(parseInt(req.params.user_id)) ||
    isNaN(parseInt(req.params.product_id))
  ) {
    return res.status(400).json({
      message: "Check that user_id and product_id are number values"
    });
  }

  let errMsg;
  return db
    .raw("SELECT * FROM users WHERE id = ?", [req.params.user_id])
    .then(results => {
      if (results.rowCount === 0) {
        errMsg = "user";
        throw new Error();
      }
      return db.raw("SELECT * FROM products WHERE id = ?", [
        req.params.product_id
      ]);
    })
    .then(results => {
      if (results.rowCount === 0) {
        errMsg = "product";
        throw new Error();
      }
      return db.raw("DELETE FROM carts WHERE user_id =? AND products_id = ?", [
        req.params.user_id,
        req.params.product_id
      ]);
    })
    .then(results => {
      res.json({ success: true });
    })
    .catch(err => {
      res.status(400).json({ message: `Cart not found with that ${errMsg}` });
    });
});

module.exports = router;
