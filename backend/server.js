const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Replaces body-parser
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public"))); // Ensure the 'public' directory contains your assets
app.use(express.urlencoded({ extended: false }));

// Session Middleware
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Load users from JSON file
const usersFilePath = path.join(__dirname, "data", "users.json");
let users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

// Passport Local Strategy
passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    const user = users.find((user) => user.email === email);
    if (!user) {
      return done(null, false, { message: "Incorrect email." });
    }
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return done(err);
      if (!isMatch)
        return done(null, false, { message: "Incorrect password." });
      return done(null, user);
    });
  })
);

// Serialize and Deserialize User
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  const user = users.find((user) => user.id === id);
  done(null, user);
});

// Routes
app.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  let users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
  // Check if user already exists
  if (users.find((user) => user.email === email)) {
    return res.status(400).json({ message: "User already exists." });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: (users.length + 1).toString(),
    name: `${firstName} ${lastName}`,
    email,
    password: hashedPassword,
  };

  users.push(newUser);

  // Save to JSON file
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

  res.status(201).json({ message: "User registered successfully." });
});

app.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed." });
    res.json({ message: "Logged out successfully." });
  });
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Error during authentication:", err);
      return next(err);
    }
    if (!user) {
      // Authentication failed; send back an error message
      return res.status(401).json({ message: info.message || "Login failed" });
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error("Error logging in user:", err);
        return next(err);
      }
      return res.json({ message: "Logged in successfully." });
    });
  })(req, res, next);
});

// Import and Use Routes
const productRoutes = require("./routes/products");
const wishlistRoutes = require("./routes/wishlist");
const userRoutes = require("./routes/users");
const orderRoutes = require("./routes/orders");

app.use("/api/products", productRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// Serve home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/Pages/index.html"));
});

app.use("/data", express.static(path.join(__dirname, "data")));

app.get("/data/products.json", (req, res) => {
  res.sendFile(path.join(__dirname, "data/products.json"));
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
