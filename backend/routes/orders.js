// Handles /cart API endpoints

const express = require("express");
const router = express.Router();
const Cart = require("../models/cart.js");
const fs = require("fs");
const path = require("path");

// Get cart for a user
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate(
      "products.productId"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Add to cart
router.post("/:userId", async (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId || !quantity) {
    return res
      .status(400)
      .json({ message: "Product ID and quantity are required" });
  }

  try {
    let cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      cart = new Cart({ userId: req.params.userId, products: [] });
    }
    cart.products.push({ productId, quantity });
    const updatedCart = await cart.save();
    res.status(201).json(updatedCart);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// Retrieve user's orders (FIX: Changed route to avoid conflicts)
router.get("/orders/:userId", (req, res) => {
  const userId = req.params.userId;
  fs.readFile(
    path.join(__dirname, "../data/orders.json"),
    "utf8",
    (err, data) => {
      if (err)
        return res.status(500).json({ error: "Failed to read orders data" });
      const orders = JSON.parse(data);
      const userOrders = orders.filter((o) => o.userId === userId);
      res.json(userOrders);
    }
  );
});

// Create an order (FIX: Consider moving this to `orders.js`)
router.post("/orders", (req, res) => {
  const newOrder = req.body;
  fs.readFile(
    path.join(__dirname, "../data/orders.json"),
    "utf8",
    (err, data) => {
      if (err)
        return res.status(500).json({ error: "Failed to read orders data" });
      const orders = JSON.parse(data);
      orders.push(newOrder);
      fs.writeFile(
        path.join(__dirname, "../data/orders.json"),
        JSON.stringify(orders, null, 2),
        (err) => {
          if (err)
            return res.status(500).json({ error: "Failed to create order" });
          res.status(201).json(newOrder);
        }
      );
    }
  );
});

module.exports = router;
