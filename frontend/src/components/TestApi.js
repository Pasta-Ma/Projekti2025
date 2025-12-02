import React, { useEffect, useState } from "react";
import api from "../api";
// testi hässäkkä axiosille ja backendille
const TestApi = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const testBackend = async () => {
      try {
        const res = await api.get("/");
        setMessage(res.data);
      } catch (err) {
        setMessage("Virhe backend-yhteydessä");
        console.error(err);
      }
    };

    testBackend();
  }, []);

  return (
    <div>
      <h2>Axios Testi</h2>
      <p>{message}</p>
    </div>
  );
};

export default TestApi;
