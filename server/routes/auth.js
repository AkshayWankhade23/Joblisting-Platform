const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

// Error handler middleware
const errorHandler = (res, error) => {
  console.error(error);
  if (!res.headersSent) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Register Route
router.post("/register", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate name
    if (name.trim().length === 0) {
      return res.status(400).json({ error: "Name cannot be empty" });
    }

    // Validate mobile number (10 digits)
    if (!/^\d{10}$/.test(mobile)) {
      return res.status(400).json({ error: "Mobile number must contain 10 digits" });
    }

    // Validate password (at least 6 characters)
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ name, email, mobile, password: hashedPassword });
    await user.save();

    // Generate JWT Token
    const token = jwt.sign({ user: user.email }, process.env.JWT_SECRET_KEY);

    // Return Success Response with token and user details
    res.json({
      success: true,
      token,
      user: { email: user.email, name: user.name, mobile: user.mobile }
    });
  } catch (error) {
    // Handle errors using a centralized error handler
    errorHandler(res, error);
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: "Email and Password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User is not registered" });
    }

    // Compare password with stored hash
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid Password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

    // Return Success Response
    res.json({ success: true, token, name: user.name, user: email });
  } catch (error) {
    errorHandler(res, error);
  }
});

module.exports = router;