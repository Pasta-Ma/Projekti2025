import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { io } from "socket.io-client";
import "./Chat.css";

const socket = io("http://localhost:5000");

const Chat = ({ user, onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUserProfile, setSelectedUserProfile] = useState(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

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
    if (!newMessage.trim()) return;

    const msgObj = {
      userId: user.id,
      username: user.username,
      content: newMessage,
    };

    // Lähetä viesti Socket.io:lla
    socket.emit("chat message", msgObj);

    setNewMessage("");
  };

  const handleMessageClick = async (userId) => {
    if (userId === user.id) return;

    try {
      const res = await api.get(`/auth/profile/${userId}`);
      console.log("Profile data received:", res.data);
      setSelectedUserProfile(res.data);
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
    }
  };

  const closeProfileModal = () => {
    setSelectedUserProfile(null);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>MeetMe Chat</h2>
        <div className="chat-header-buttons">
          {user.is_admin && (
            <button className="btn btn-admin" onClick={() => navigate("/admin")}>
              Admin Panel
            </button>
          )}
          <button className="btn btn-profile" onClick={() => navigate("/profile")}>
            Profile
          </button>
          <button className="btn btn-logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="messages-container">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.userId === user.id ? "own-message" : ""}`}
          >
            <div
              className={`message-bubble ${msg.userId !== user.id ? "clickable" : ""}`}
              onClick={() => handleMessageClick(msg.userId)}
            >
              <div className="message-username">{msg.username}</div>
              <div className="message-content">{msg.content}</div>
              <div className="message-time">
                {new Date(msg.created_at).toLocaleTimeString("fi-FI", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* profiili modali */}
      {selectedUserProfile && (
        <div className="profile-modal-overlay" onClick={closeProfileModal}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeProfileModal}>
              ×
            </button>
            <div className="modal-header">
              <h3>{selectedUserProfile.username}</h3>
            </div>
            <div className="modal-content">
              <div className="modal-field">
                <label>Bio:</label>
                <p>{selectedUserProfile.bio || "No bio yet"}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="chat-input-container">
        <form onSubmit={handleSend} className="chat-input-form">
          <input
            type="text"
            className="chat-input"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit" className="btn-send">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
