import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../Header/Header";
import "./forum.scss";
import Footer from "../Footer/Footer";
import Support from "../Support/Support";
import Button from '../button/Button';
import { jwtDecode } from "jwt-decode";
import user from "./user.svg";
import cal from './cal.svg';
import config from '../config.js';

const Forum = () => {
  const token = localStorage.getItem("goodgame");
  const name = token && jwtDecode(token).name;
  const [open, setOpen] = useState(false);
  const [t, setT] = useState("");
  const [d, setD] = useState("");
  const [by, setBy] = useState("");
  const [theme, setTheme] = useState("NEODREĐENO");
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const postWindowRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("goodgame");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.isLoggedIn) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  const hanSub = () => {
    if (!t || !d) {
      setErrorMessage("Molimo vas da unesete naslov i opis.");
      return;
    }

    const data = {
      title: t,
      desc: d,
      by: name,
      theme: theme
    };

    fetch(`${config.API_URL}/forum`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        setIsSubmitted(true);
        setErrorMessage("");
        setT("");
        setD("");
        console.log(data);
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetch(`${config.API_URL}/forum`)
      .then(res => res.json())
      .then(data => {
        setPosts(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (postWindowRef.current) {
      postWindowRef.current.style.display = open ? 'flex' : 'none';
    }
  }, [open]);

  if (!isLoggedIn) {
    return (
      <>
        <Header />
        <h1 id="msl">Prijavi se, ili napravi nalog ako želiš da pregledaš forum</h1>
        <div className="bts">
          <Button text="PRIJAVI SE" href="/prijava" />
          <Button text="NAPRAVI NALOG" href="/registracija" />
        </div>
        <Support />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div id="sorter">
        <select name="eng" id="no">
          <option value="new" onClick={() => {
            let posts = document.querySelector(".forum_container");
            posts.style.flexDirection = 'column-reverse';
          }}>NAJNOVIJE</option>
          <option value="old" onClick={() => {
            let posts = document.querySelector(".forum_container");
            posts.style.flexDirection = 'column';
          }}>NAJSTARIJE</option>
        </select>
        <button onClick={() => setOpen(true)}>OBJAVI TEMU</button>
      </div>
      <div className="forum_container">
        {posts.map((post, index) => (
          <div key={index} onClick={() => navigate(`/forum/${post._id}`)}>
            <h1>{post.title}</h1>
            <p>{post.desc}</p>
            <hr style={{ marginTop: "20px", border: "1px solid royalblue" }} />
            <div className="glass">
              <p style={{ marginTop: "20px" }}>
                <img src={user} alt="Objavio:" /><b>{post.by}</b>
              </p>
              <p style={{ marginTop: "20px" }}>
                <img src={cal} alt="Objavljeno:" /><b>{new Date(post.createdAt).toLocaleDateString('sr')}</b>
              </p>
              <p style={{ marginTop: "20px" }}>
                TEMA: <b>{post.theme}</b>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div id="post_window" ref={postWindowRef}>
        <div id="close_pw" onClick={() => setOpen(false)}>X</div>
        <h1>Objavi temu</h1>
        <input
          type="text"
          placeholder="Naslov"
          value={t}
          onChange={(e) => setT(e.target.value)}
        />
        <textarea
          placeholder="Tekst"
          value={d}
          onChange={(e) => setD(e.target.value)}
        />

        <p>TEMA:</p>
        <select name="eng" id="no" onChange={(e) => setTheme(e.target.value)}>
          <option value="OSTALO">NEODREĐENO</option>
          <option value="AMONG US">AMONG US</option>
          <option value="APEX">APEX</option>
          <option value="ARK">ARK</option>
          <option value="BATTLEFIELD">BATTLEFIELD</option>
          <option value="BRAWL STARS">BRAWL STARS</option>
          <option value="COD">COD</option>
          <option value="CS2">CS2</option>
          <option value="DEAD BY DAYLIGHT">DEAD BY DAYLIGHT</option>
          <option value="DOTA 2">DOTA 2</option>
          <option value="FORTNITE">FORTNITE</option>
          <option value="FOREST">FOREST</option>
          <option value="GTA">GTA</option>
          <option value="LOL">LOL</option>
          <option value="LOST ARK">LOST ARK</option>
          <option value="MINECRAFT">MINECRAFT</option>
          <option value="OVERWATCH">OVERWATCH</option>
          <option value="PHASMOPHOBIA">PHASMOPHOBIA</option>
          <option value="PUBG">PUBG</option>
          <option value="R6">R6</option>
          <option value="ROBLOX">ROBLOX</option>
          <option value="ROCKET LEAGUE">ROCKET LEAGUE</option>
          <option value="RUST">RUST</option>
          <option value="TEAM FORTRESS">TEAM FORTRESS</option>
          <option value="TERRARIA">TERRARIA</option>
          <option value="UNTURNED">UNTURNED</option>
          <option value="VALORANT">VALORANT</option>
          <option value="WORLD OF WARCRAFT">WORLD OF WARCRAFT</option>
          <option value="WOT">WOT</option>
        </select>
        {!isSubmitted && (
          <button onClick={hanSub}>OBJAVI</button>
        )}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {isSubmitted && <p className="success-message">Tema je uspješno objavljena!</p>}

      </div>
      <Support />
      <Footer />
    </>
  );
};

export default Forum;
