const express = require("express");
const router = express.Router();
const { getUserProfile, updateUserProfile } = require("../controllers/userController");
const { authenticateToken } = require("../middleware/authMiddleware");

router.get("/me", authenticateToken, getUserProfile);
router.put("/me", authenticateToken, updateUserProfile);

module.exports = router;
