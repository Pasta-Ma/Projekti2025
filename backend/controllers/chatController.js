const pool = require("../db/pool");

// Hae kaikki viestit
const getMessages = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT m.id, m.content, m.created_at, u.username 
       FROM messages m
       JOIN users u ON m.user_id = u.id
       ORDER BY m.created_at ASC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Palvelinvirhe" });
  }
};

// Lisää uusi viesti
const postMessage = async (req, res) => {
  const { userId, content } = req.body;

  if (!userId || !content) {
    return res.status(400).json({ message: "Täytä kaikki kentät" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO messages (user_id, content) VALUES ($1, $2) RETURNING id, user_id, content, created_at",
      [userId, content]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Palvelinvirhe" });
  }
};

module.exports = { getMessages, postMessage };
