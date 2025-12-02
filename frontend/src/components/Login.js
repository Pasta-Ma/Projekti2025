import React, { useState } from "react";
import api from "../api";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });


      const { token, user } = res.data;
      onLogin(token, user);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setMessage(`Kirjautuminen onnistui: ${user.username}`);
    } catch (err) {
      console.error(err.response?.data);
      setMessage(err.response?.data?.message || "Virhe kirjautumisessa");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Kirjaudu sisään</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Salasana"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Kirjaudu</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Login;
