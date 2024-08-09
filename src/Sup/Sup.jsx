import React, { useState } from "react";
import Header from "../Header/Header";
import Input from "../Input/Input";
import wrench from "./wrench.webp";
import Footer from "../Footer/Footer";
import Support from "../Support/Support";
import "./sup.scss";
import config from "../config.js";
const Sup = () => {
  const [email, setEmail] = useState("");
  const [ms, setMs] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const poster = () => {
    if (!email || !ms) {
      setError("MORATE POPUNITI SVA POLJA");
      return;
    }

    if (!validateEmail(email)) {
      setError("UNESITE VALIDAN EMAIL");
      return;
    }

    fetch(`${config.API_URL}/podrska`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        desc: ms,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    setError(""); // Clear error message after successful submission
  };

  return (
    <>
      <Header />
      <div className="sup_container">
        <div className="sup_txt">
          <h1>PODRŠKA I KONTAKT</h1>
          <p>
            Imate pitanje ili sugestiju vezanu za KEYCAP, popunite polja i
            pričekajte odgovor, ako pitanje ili sugestija bude od koristi za
            KEYCAP dobijate badge.
          </p>
          <Input
            placeholder="Vaš email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            name=""
            id=""
            placeholder="Poruka"
            value={ms}
            onChange={(e) => setMs(e.target.value)}
          ></textarea>
          {error && <p className="error">{error}</p>}
          <button onClick={poster}>POŠALJI</button>
        </div>
        <img src={wrench} alt="" />
      </div>
      <Support />
      <Footer />
    </>
  );
};

export default Sup;
