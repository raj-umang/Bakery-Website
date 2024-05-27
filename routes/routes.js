const express = require("express");
const router = express.Router();
const db = require("../Db/db.js");

router.post("/register", async (req, res) => {
  const { name, phoneno, email, password } = req.body;

  try {
    const rowCount = await db.addUser(name, phoneno, email, password);
    if (rowCount === 1) {
      res.status(200).json({ message: "User registered successfully" });
    } else {
      res.status(500).json({ message: "Failed to register user" });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST request to handle user login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query the database to find the user with the provided email and password
    const user = await db.getUserByEmailAndPassword(email, password);

    // If user is found, redirect to the home page
    if (user) {
      res.redirect("/login/home");
    } else {
      // If user is not found, render the login page with an error message
      res.render("login", { error: "Invalid email or password" });
      console.log("Invalid username or password");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/users", (req, res) => {
  res.send("All users");
});

// Define routes
router.get("/", (req, res) => {
  res.render("index.ejs");
});
router.get("/login", (req, res) => {
  res.render("login.ejs");
});

router.get("/admin", (req, res) => {
  res.render("admin.ejs");
});
router.get("/login/home", (req, res) => {
  res.render("home.ejs");
});

router.get("/cart", (req, res) => {
  res.render("cart.ejs");
});

module.exports = router;
