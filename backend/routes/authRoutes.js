const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

// Rekisteröinti & kirjautuminen
router.post("/register", registerUser);
router.post("/login", loginUser);

// Suojatut reitit
router.get("/profile/:id", authMiddleware, getProfile);
router.put("/profile/:id", authMiddleware, updateProfile);

module.exports = router;
