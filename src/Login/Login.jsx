import React, { useState } from "react";
import Input from "../Input/Input";
import Header from "../Header/Header";
import "./login.scss";
import config from "../config";
const Login = () => {
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(`${config.API_URL}/prijava`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, pw }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred during login.");
      }

      const data = await response.json();
      const { token, user } = data;

      // Save the token and user information in localStorage
      localStorage.setItem(
        "goodgame",
        JSON.stringify({ token, name: user.name, isLoggedIn: true })
      );

      // Redirect the user or show a success message
      alert("Login successful!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="login_container">
        <h1>PRIJAVI SE</h1>
        <Input
          type="text"
          placeholder="KEYCAP ime"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Lozinka"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <button onClick={handleLogin} style={{ marginTop: "40px" }}>
          PRIJAVI SE
        </button>
      </div>
    </>
  );
};

export default Login;
