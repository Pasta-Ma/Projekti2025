import React, { useState, useEffect, useRef } from "react";
import api from "../api";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Hae vanhat viestit backendistä
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get("/chat");
        setMessages(res.data);
      } catch (err) {
        console.error("Viestien haku epäonnistui:", err);
      }
    };
    fetchMessages();
  }, []);

  // Kuuntele uusia viestejä Socket.io:lla
  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  // Scrollaa alas kun tulee uusi viesti
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage) return;

    const msgObj = {
      userId: user.id,
      username: user.username,
      content: newMessage,
    };

    // Lähetä viesti Socket.io:lla
    socket.emit("chat message", msgObj);

    setNewMessage("");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>Chat</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          height: "300px",
          overflowY: "scroll",
        }}
      >
        {messages.map((msg) => (
          <div key={msg.id}>
            <strong>{msg.username}: </strong>
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} style={{ marginTop: "1rem" }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Kirjoita viesti..."
          style={{ width: "75%" }}
        />
        <button type="submit" style={{ width: "23%", marginLeft: "2%" }}>
          Lähetä
        </button>
      </form>
    </div>
  );
};

export default Chat;
