// Handles /wishlist API endpoints

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Get all wishlist items
router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    fs.readFile(path.join(__dirname, '../data/wishlist.json'), 'utf8', (err, data) => {
      if (err) return res.status(500).json({ error: 'Failed to read wishlist data' });
      const wishlists = JSON.parse(data);
      const userWishlist = wishlists.find(w => w.userId === userId);
      if (!userWishlist) return res.status(404).json({ error: 'Wishlist not found for user' });
      res.json(userWishlist);
    });
  });

// Add a product to wishlist
router.post('/:userId', (req, res) => {
    const userId = req.params.userId;
    const productId = req.body.productId;
    fs.readFile(path.join(__dirname, '../data/wishlist.json'), 'utf8', (err, data) => {
      if (err) return res.status(500).json({ error: 'Failed to read wishlist data' });
      const wishlists = JSON.parse(data);
      const userWishlist = wishlists.find(w => w.userId === userId);
      if (!userWishlist) {
        const newWishlist = { userId, products: [productId] };
        wishlists.push(newWishlist);
      } else {
        userWishlist.products.push(productId);
      }
      fs.writeFile(path.join(__dirname, '../data/wishlist.json'), JSON.stringify(wishlists, null, 2), err => {
        if (err) return res.status(500).json({ error: 'Failed to update wishlist' });
        res.status(201).json({ message: 'Product added to wishlist' });
      });
    });
  });
  