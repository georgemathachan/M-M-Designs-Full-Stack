const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = express.Router();
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Check if .env variables are loaded
if (!process.env.MONGO_URI) {
  console.error("Missing MONGO_URI in .env file");
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json()); // Replaces body-parser
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI) // No need for extra options
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });


// Routes
router.get("/users", (req, res) => {
  res.send("User Route");
});
router.get("/products", (req, res) => {
  res.send("Product Route");
});
router.get("/cart", (req, res) => {
  res.send("Cart Route");
});
router.get("/wishlist", (req, res) => {
  res.send("Wishlist Route");
});
// Export the router to use in server.js
module.exports = router;
// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const path = require("path");

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, "../public")));

// Serve index.html for the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/Pages", "home.html"));
});
