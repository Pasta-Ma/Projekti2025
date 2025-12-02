import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./Profiles.css";

const Profiles = ({ user, setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Hae profiilitiedot backendistä
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/auth/profile/${user.id}`);
        setUsername(res.data.username);
        setEmail(res.data.email);
        setBio(res.data.bio || "");
      } catch (err) {
        console.error("Fetch profile error:", err);
        setError("Failed to load profile");
      }
    };
    if (user?.id) fetchProfile();
  }, [user]);

  // Päivitä profiili
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      await api.put(`/auth/profile/${user.id}`, { username, bio });

      const updatedUser = { ...user, username };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setSuccess("Profile updated successfully!");
    } catch (err) {
      console.error("Update profile error:", err.response?.data || err);
      setError("Failed to update profile");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h2>Your Profile</h2>
          <p className="profile-subtitle">Manage your account settings</p>
        </div>

        <div className="profile-content">
          <form onSubmit={handleUpdate} className="profile-form">
            {success && <div className="success-message">{success}</div>}
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                disabled
                style={{ background: "#f7fafc", cursor: "not-allowed" }}
              />
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className="profile-buttons">
              <button type="submit" className="btn btn-save">
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-back"
                onClick={() => navigate("/chat")}
              >
                Back to Chat
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
