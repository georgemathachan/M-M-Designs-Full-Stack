const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Check .env
if (!process.env.MONGO_URI) {
  console.error("Missing MONGO_URI in .env file");
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json()); // Replaces body-parser
app.use(bodyParser.json());
app.use(express.static('public')); // Ensure the 'public' directory contains your assets

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });

// Import and Use Routes
const productRoutes = require("./routes/products");
const wishlistRoutes = require("./routes/wishlist");
const userRoutes = require("./routes/users");
const orderRoutes = require("./routes/orders");

app.use("/products", productRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, "../public")));

// Serve home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/Pages/index.html"));
});

app.use("/data", express.static(path.join(__dirname, "data")));


app.get("/data/products.json", (req, res) => {
  res.sendFile(path.join(__dirname, "data/products.json"));
});

// Start Server
app.listen(5000, () => console.log(`Server running on port 5000`));
