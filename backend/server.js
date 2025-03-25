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

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
