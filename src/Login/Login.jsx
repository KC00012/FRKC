import React from "react";
import Input from "../Input/Input";
import Header from "../Header/Header";

import "./login.scss";
const Login = () => {
  return (
    <>
      <Header></Header>
      <div className="login_container">
        <h1>PRIJAVI SE</h1>
        <Input type="text" placeholder="KEYCAP ime"></Input>
        <Input type="password" placeholder="Lozinka"></Input>
        <button style={{ marginTop: "40px" }}>PRIJAVI SE</button>
      </div>
    </>
  );
};

export default Login;
