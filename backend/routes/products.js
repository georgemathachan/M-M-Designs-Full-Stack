// Handles /products API endpoints

const express = require('express');
const router = express.Router();
const fs = require('fs'); 
const Product = require('../models/product.js');

// Get all products
router.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, '../data/products.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read products data' });
    }
    res.json(JSON.parse(data));
  });
});


// Get a single product
router.get('/:id', (req, res) => {
  const productId = req.params.id;
  fs.readFile(path.join(__dirname, '../data/products.json'), 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read products data' });
    const products = JSON.parse(data);
    const product = products.find(p => p.id === productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  });
});

// Get products by category
router.get('/', (req, res) => {
  const category = req.query.category;
  fs.readFile(path.join(__dirname, '../data/products.json'), 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read products data' });
    const products = JSON.parse(data);
    const filteredProducts = category ? products.filter(p => p.category === category) : products;
    res.json(filteredProducts);
  });
});


// Add a new product
router.post('/', (req, res) => {
  const newProduct = req.body;
  fs.readFile(path.join(__dirname, '../data/products.json'), 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read products data' });
    const products = JSON.parse(data);
    products.push(newProduct);
    fs.writeFile(path.join(__dirname, '../data/products.json'), JSON.stringify(products, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Failed to add product' });
      res.status(201).json(newProduct);
    });
  });
});


module.exports = router;