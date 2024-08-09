import React, { useState, useEffect } from "react";
import "./acc.scss";
import Header from "../Header/Header";
import Support from "../Support/Support";
import Footer from "../Footer/Footer";
import cal from "./cal.svg";
import check from "./check.webp";
import bug from "./bug.webp";
import dmd from "./dmd.webp";
import gold from "./medal.webp";
import money from "./money.webp";
import Input from "../Input/Input";
import { jwtDecode } from "jwt-decode";
import dc from './discord.svg'
import server from './server.svg'
import ig_icon from './ig.svg'
import ps_icon from './ps_icon.svg'
import xbox_icon from './xbox_icon.svg'
import config from "../config.js";

const Acc = () => {
  const [userData, setUserData] = useState(null);
  const [o, setO] = useState(false)
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [eng, setEng] = useState("Ne");
  const [s, setS] = useState("Ne");

  const [discord, setDiscord] = useState("");
  const [discord2, setDiscord2] = useState("");
  const [ig, setIg] = useState("");
  const [ps, setPs] = useState("");
  const [xb, setXb] = useState("");
  const [pfp, setPfp] = useState("#fff");
  const [desc, setDesc] = useState("");
  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleDiscordChange = (e) => setDiscord(e.target.value);
  const handleDiscord2Change = (e) => setDiscord2(e.target.value);
  const handleIgChange = (e) => setIg(e.target.value);
  const handlePsChange = (e) => setPs(e.target.value);
  const handleXbChange = (e) => setXb(e.target.value);

  const handleEngChange = (e) => setEng(e.target.value);
  const handleSchange = (e) => setS(e.target.value)
  const handleNewColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setPfp(randomColor);
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (o) {
        document.getElementById("change_acc").style.display = 'flex';
      } else {
        document.getElementById("change_acc").style.display = 'none';
      }
    }, 100); // adjust the timeout to your needs

    return () => clearTimeout(timeoutId);
  }, [o]);
  useEffect(() => {
    const token = localStorage.getItem("goodgame");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserData(decodedToken);
        fetch(`${config.API_URL}/nalog`).then(
          (response) => response.json())
          .then((data) => {
            for (let i = 0; i < data.length; i++) {
              if (data[i].name === decodedToken.name) {
                console.log(data[i])
                setUserData(data[i])
              }
            }
          }
          )
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("goodgame");
    setTimeout(() => {
      window.location.href = '/'
    }, 1200);
  };

  if (!userData) {
    return <div>Loading...</div>; // or a loading spinner
  }

  return (
    <>
      <Header />
      <div id="change_acc">
        <div id="close" onClick={() => { setO(false) }}>X</div>
        <h1>IZMIJENI NALOG</h1>
        <Input
          type="text"
          placeholder="KEYCAP ime"
          value={userData.name}
          onChange={handleNameChange}
        />

        <textarea
          name=""
          id="desc"
          placeholder="Opiši sebe, koje igre igraš i slično"
          value={userData.desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        ></textarea>
        <div className="form_wrapper">
          <form>
            <label htmlFor="eng">Poznavanje engleskog</label>
            <select name="eng" id="eng" value={userData.en} onChange={handleEngChange}>
              <option value="Ne">Ne</option>
              <option value="Srednje">Srednje</option>
              <option value="Tečno">Tečno</option>
            </select>

          </form>
          <form>
            <label htmlFor="sr">Igrica koju igram</label>
            <select name="" id="" value={userData.game} onChange={handleSchange}>
              <option value="OSTALO">NEODREĐENO</option>
              <option value="
              AMONG US
              ">AMONG US</option>

              <option value="APEX">APEX</option>
              <option value="ARK">ARK</option>
              <option value="BATTLEFIELD">BATTLEFIELD</option>
              <option value="BRAWL STARS">BRAWL STARS</option>
              <option value="COD">COD</option>
              <option value="CS2">CS2</option>
              <option value="DEAD BY DAYLIGHT">
                DEAD BY DAYLIGHT
              </option>
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
          </form>
        </div>
        <p>
          Gdje Vas mogu kontaktirati saigrači, <br /> morate da unesete barem
          jedno polje
        </p>
        <Input
          type="text"
          placeholder="@Discord"
          value={userData.discord}
          onChange={handleDiscordChange}
        />
        <Input
          type="text"
          placeholder="Discord server (link)"
          value={userData.discord2}
          onChange={handleDiscord2Change}
        />
        <Input
          type="text"
          placeholder="@Instagram"
          value={userData.ig}
          onChange={handleIgChange}
        />
        <Input
          type="text"
          placeholder="@PSN"
          value={userData.ps}
          onChange={handlePsChange}
        />
        <Input
          type="text"
          placeholder="@XBOX"
          value={userData.xbox}
          onChange={handleXbChange}
        />
        <div className="profile_pic">
          <div id="pfp" style={{ backgroundColor: userData.color }}></div>
          <p>
            Kako bi aplikacija ostala brza mi moramo da štedimo resurse, iz tog
            razloga ne možete da stavite profilnu sliku, ali zato možete da
            stavite random boju
          </p>
          <button id="new" onClick={handleNewColor}>
            NOVA BOJA
          </button>
        </div>
        <button style={{ marginTop: "40px" }} >
          IZMIJENI NALOG
        </button>
      </div>
      <div className="acc_container">
        <div className="data">
          <div id="pfp" style={{ backgroundColor: userData.color }}></div>
          <h1>{userData.name}</h1>
          <p>
            <img src={cal} alt="" />
            {new Date(userData.createdAt).toLocaleDateString('sr')}
          </p>
          <p>Bedževi</p>
          <span>
            <img src={check} alt="check" />
            Uspješno napravljen nalog
          </span>
          {
            userData.donator === true && (
              <span>
                <img src={money} alt="money" />
                Korisnik je donator
              </span>
            )
          }
          {
            userData.bug === true && (
              <span>
                <img src={bug} alt="money" />
                Korisnik je doprinjeo aplikaciji
              </span>
            )
          }
          {
            userData.rank === "gold" && (
              <span id="gold_v">
                <img src={gold} alt="gold" />
                Korisnik ima GOLD verifikaciju
              </span>
            )
          }
          {
            userData.rank === "diamond" && (
              <span id="dmd_v">
                <img src={dmd} alt="dmd" />
                Korisnik ima DIAMOND verifikaciju
              </span>
            )
          }
          {
            userData.rank === "default" && null
          }
          <button onClick={() => { setO(true) }}>Izmijeni nalog</button>
          <button onClick={handleLogout}>Odjavi se</button>
        </div>
        <div className="r_data">
          <h1>Opis</h1>
          <p>{userData.desc}</p>
          <hr style={{ width: "100%", border: "1px solid white" }} />
          <p>
            <span>
              <img src={dc} alt="" />
              {userData.discord ? userData.discord : "Nije navedeno"}
            </span>
          </p>
          <p>
            <span>
              <img src={server} alt="" />
              {userData.discord2 ? userData.discord2 : "Nije navedeno"}
            </span>
          </p>
          <p>
            <span>
              <img src={ig_icon} alt="" />
              {userData.ig ? userData.ig : "Nije navedeno"}
            </span>
          </p>
          <p>
            <span>
              <img src={ps_icon} alt="" />
              {userData.ps ? userData.ps : "Nije navedeno"}
            </span>
          </p>
          <p>
            <span>
              <img src={xbox_icon} alt="" />
              {userData.xb ? userData.xb : "Nije navedeno"}
            </span>
          </p>
        </div>
      </div>
      <Support />
      <Footer />
    </>
  );
};

export default Acc;