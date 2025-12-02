const pool = require("../db/pool");

// Get all users (Admin only)
const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, username, email, bio, is_admin FROM users ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Clear all chat messages (Admin only)
const clearChat = async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM messages RETURNING *");
    res.json({ 
      message: "Chat cleared successfully", 
      deletedCount: result.rowCount 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllUsers, clearChat };
