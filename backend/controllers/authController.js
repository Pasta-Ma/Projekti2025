const pool = require("../db/pool");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// =====================
// Rekisteröinti
// =====================
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Täytä kaikki kentät" });
  }

  try {
    // Tarkista onko käyttäjä jo olemassa
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Käyttäjä on jo olemassa" });
    }
    // Hashaa salasana
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email",
      [username, email, hashedPassword]
    );

    const token = jwt.sign(
      { userId: newUser.rows[0].id, username: newUser.rows[0].username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, user: newUser.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Palvelinvirhe" });
  }
};

// =====================
// Kirjautuminen
// =====================
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Täytä kaikki kentät" });
  }

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Käyttäjää ei löytynyt" });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: "Väärä salasana" });
    }

    const token = jwt.sign(
      { userId: user.rows[0].id, username: user.rows[0].username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, user: { id: user.rows[0].id, username: user.rows[0].username, email: user.rows[0].email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Palvelinvirhe" });
  }
};

// =====================
// Hae profiili
// =====================
const getProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT id, username, email, bio FROM users WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: "Käyttäjää ei löytynyt" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Palvelinvirhe" });
  }
};

// =====================
// Päivitä profiili
// =====================
const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { username, bio = "" } = req.body; // bio oletuksena tyhjä string

  if (!username) {
    return res.status(400).json({ message: "Username vaaditaan" });
  }

  try {
    const result = await pool.query(
      "UPDATE users SET username = $1, bio = $2 WHERE id = $3 RETURNING id, username, email, bio",
      [username, bio, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Käyttäjää ei löytynyt" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Palvelinvirhe" });
  }
};

module.exports = { registerUser, loginUser, getProfile, updateProfile };
