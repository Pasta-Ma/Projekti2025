import React, { useState, useEffect } from "react";
import api from "../api";

const Profiles = ({ user, setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState("");

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
        setMessage("Virhe profiilia haettaessa");
      }
    };
    if (user?.id) fetchProfile();
  }, [user]);

  // Päivitä profiili
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/auth/profile/${user.id}`, { username, bio });

      const updatedUser = { ...user, username };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setMessage("Profiili päivitetty!");
    } catch (err) {
      console.error("Update profile error:", err.response?.data || err);
      setMessage("Virhe profiilia päivitettäessä");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1rem" }}>
      <h2>Profiilisi</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label>Bio:</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Kirjoita jotain itsestäsi..."
          />
        </div>

        <button type="submit">Tallenna</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Profiles;
