const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  clearChat,
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// All admin routes require authentication AND admin privileges
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
router.delete("/clear-chat", authMiddleware, adminMiddleware, clearChat);

module.exports = router;
