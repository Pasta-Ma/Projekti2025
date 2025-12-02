import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./Admin.css";

const Admin = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError("Failed to load users");
    }
  };

  const handleClearChat = async () => {
    if (!window.confirm("Are you sure you want to clear ALL chat messages? This cannot be undone!")) return;

    try {
      const res = await api.delete("/admin/clear-chat");
      setSuccess(`Chat cleared! ${res.data.deletedCount} messages deleted.`);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Failed to clear chat:", err);
      setError("Failed to clear chat");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Admin Panel</h2>
        <div className="admin-header-buttons">
          <button className="btn btn-clear-chat" onClick={handleClearChat}>
            Clear Chat
          </button>
          <button className="btn btn-back" onClick={() => navigate("/chat")}>
            Back to Chat
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className={u.is_admin ? "admin-row" : ""}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>
                  <span className={`badge ${u.is_admin ? "badge-admin" : "badge-user"}`}>
                    {u.is_admin ? "Admin" : "User"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
