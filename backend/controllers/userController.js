const pool = require("../db/pool");

const getUserProfile = async (req, res) => {
  const userId = req.user.userId;
  try {
    const result = await pool.query("SELECT id, username, email FROM users WHERE id = $1", [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Käyttäjää ei löytynyt" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Palvelinvirhe" });
  }
};

const updateUserProfile = async (req, res) => {
  const userId = req.user.userId;
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({ message: "Täytä kaikki kentät" });
  }

  try {
    const result = await pool.query(
      "UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING id, username, email",
      [username, email, userId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Palvelinvirhe" });
  }
};

module.exports = { getUserProfile, updateUserProfile };
