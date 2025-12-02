const express = require("express");
const cors = require("cors");
require("dotenv").config();
const http = require("http");

const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const pool = require("./db/pool"); // DB pool

app.use(cors());
app.use(express.json());

// Testi route
app.get("/", (req, res) => {
  res.send("MeetMe backend toimii!");
});

// Reitit
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const chatRoutes = require("./routes/chatRoutes");
app.use("/api/chat", chatRoutes);

// Socket.io
io.on("connection", (socket) => {
  console.log("Uusi käyttäjä yhdistetty:", socket.id);

  // Kun saadaan chat-viesti frontendistä
  socket.on("chat message", async (msg) => {
    try {
      // Tallenna viesti tietokantaan
      const result = await pool.query(
        "INSERT INTO messages (user_id, content) VALUES ($1, $2) RETURNING id, user_id, content, created_at",
        [msg.userId, msg.content]
      );

      // Lähetä kaikille yhdistettyihin socketteihin
      io.emit("chat message", {
        id: result.rows[0].id,
        userId: msg.userId,
        username: msg.username,
        content: msg.content,
        created_at: result.rows[0].created_at,
      });
    } catch (err) {
      console.error("Viestin tallennus epäonnistui:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("Käyttäjä poistui:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
