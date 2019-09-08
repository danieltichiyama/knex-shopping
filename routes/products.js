const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/products", (req, res) => {
  return db
    .raw("SELECT * FROM products")
    .then(results => {
      res.json(results.rows);
    })
    .catch(err => {
      res.status(500).json({ message: "Something went wrong." });
    });
});

router.get("/products/:product_id", (req, res) => {
  if (isNaN(parseInt(req.params.product_id))) {
    return res
      .status(400)
      .json({ message: "Check that product_id is a number value" });
  }

  return db
    .raw("SELECT * FROM products WHERE id= ?", [req.params.product_id])
    .then(results => {
      if (results.rows.length === 0) {
        throw new Error();
      }
      res.json(results.rows[0]);
    })
    .catch(err => {
      res.status(400).json({ message: "Product not found" });
    });
});

router.post("/products/new", (req, res) => {
  if (
    typeof req.params.title !== "string" ||
    typeof req.params.description !== "string" ||
    isNaN(parseInt(req.params.inventory)) ||
    isNaN(parseFloat(req.params.price))
  ) {
    return res
      .status(400)
      .json({ message: "Check that all fields have valid data types." });
  }
  return db
    .raw(
      "INSERT INTO products (title, description, inventory, price) VALUES (?,?,?,?) RETURNING *",
      [req.body.title, req.body.description, req.body.inventory, req.body.price]
    )
    .then(results => {
      res.json(results.rows[0]);
    })
    .catch(err => {
      res.status(400).json({ message: "Must POST all product fields" });
    });
});

router.put("/products/:product_id", (req, res) => {
  if (isNaN(parseInt(req.params.product_id))) {
    return res
      .status(400)
      .json({ message: "Check that product_id is a number value" });
  }

  if (
    typeof req.params.title !== "string" ||
    typeof req.params.description !== "string" ||
    isNaN(parseInt(req.params.inventory)) ||
    isNaN(parseFloat(req.params.price))
  ) {
    return res
      .status(400)
      .json({ message: "Check that all fields have valid data types." });
  }

  return db
    .raw(
      "UPDATE products SET title = ?, description = ?, inventory = ?, price = ? WHERE id = ?",
      [
        req.body.title,
        req.body.description,
        req.body.inventory,
        req.body.price,
        req.params.product_id
      ]
    )
    .then(results => {
      res.json({
        message: `Product: ${req.params.product_id} has been updated`
      });
    });
});

router.delete("/products/:product_id", (req, res) => {
  if (isNaN(parseInt(req.params.product_id))) {
    return res
      .status(400)
      .json({ message: "Check that product_id is a number value" });
  }

  return db
    .raw("SELECT * FROM products WHERE id = ?", [req.params.product_id])
    .then(results => {
      if (results.rowCount === 0) {
        throw new Error();
      }
      return db.raw("DELETE FROM products WHERE id = ?", [
        req.params.product_id
      ]);
    })
    .then(results => {
      res.json({
        message: `Product id: ${req.params.product_id} successfully deleted`
      });
    })
    .catch(err => {
      res
        .status(400)
        .json({ message: `Product id: ${req.params.product_id} not found` });
    });
});

module.exports = router;
