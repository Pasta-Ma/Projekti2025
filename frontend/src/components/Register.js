import React, { useState } from "react";
import api from "../api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", { username, email, password });
      setMessage(`Rekisteröinti onnistui: ${res.data.user.username}`);
    } catch (err) {
      console.error(err.response?.data);
      setMessage(err.response?.data?.message || "Virhe rekisteröinnissä");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Rekisteröidy</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Rekisteröidy</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Register;
