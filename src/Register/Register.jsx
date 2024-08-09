import React, { useState } from "react";
import Input from "../Input/Input";
import Header from "../Header/Header";
import "./register.scss";
import config from "../config.js";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [eng, setEng] = useState("Ne");
  const [s, setS] = useState("NEODREĐENO");
  const [discord, setDiscord] = useState("");
  const [discord2, setDiscord2] = useState("");
  const [ig, setIg] = useState("");
  const [ps, setPs] = useState("");
  const [xb, setXb] = useState("");
  const [pfp, setPfp] = useState("#fff");
  const [desc, setDesc] = useState("");
  const [errors, setErrors] = useState({});

  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleDiscordChange = (e) => setDiscord(e.target.value);
  const handleDiscord2Change = (e) => setDiscord2(e.target.value);
  const handleIgChange = (e) => setIg(e.target.value);
  const handlePsChange = (e) => setPs(e.target.value);
  const handleXbChange = (e) => setXb(e.target.value);
  const handleEngChange = (e) => setEng(e.target.value);
  const handleSChange = (e) => setS(e.target.value);

  const handleNewColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setPfp(randomColor);
    console.log(config.API_URL);
  };

  const validateFields = () => {
    const errors = {};
    if (!name) errors.name = "Ime je obavezno.";
    if (!password) {
      errors.password = "Lozinka je obavezna.";
    } else if (password.length < 8) {
      errors.password = "Lozinka mora imati barem 8 karaktera.";
    }
    if (!desc) errors.desc = "Opis je obavezan.";
    if (!pfp) errors.pfp = "Morate odabrati boju za profil.";
    if (!eng) errors.eng = "Morate odabrati poznavanje engleskog.";
    if (!s) errors.s = "Morate odabrati igricu koju igrate.";
    if (!discord && !discord2 && !ig && !ps && !xb) {
      errors.social = "Morate unijeti barem jedno polje za kontakt.";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    fetch(`${config.API_URL}/registracija`, {
      method: "POST",
      body: JSON.stringify({
        name,
        pw: password,
        desc,
        en: eng,
        color: pfp,
        rank: "default",
        donator: false,
        bug: false,
        game: s,
        discord: discord,
        discord2: discord2,
        ig: ig,
        ps: ps,
        xb: xb,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log('JWT Token:', data.token); // Log JWT token
        localStorage.setItem("goodgame", data.token);
        setTimeout(() => {
          window.location.href = '/nalog'
        }, 1500);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <Header />
      <div className="login_container">
        <h1>NAPRAVI NALOG</h1>

        <Input
          type="text"
          placeholder="KEYCAP ime"
          value={name}
          onChange={handleNameChange}
        />
        <Input
          type="password"
          placeholder="Lozinka"
          value={password}
          onChange={handlePasswordChange}
        />
        <textarea
          id="desc"
          placeholder="Opiši sebe, koje igre igraš i slično"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
        <div className="form_wrapper">
          <form>
            <label htmlFor="eng">Poznavanje engleskog</label>
            <select name="eng" id="eng" value={eng} onChange={handleEngChange}>
              <option value="Ne">Ne</option>
              <option value="Srednje">Srednje</option>
              <option value="Tečno">Tečno</option>
            </select>
          </form>
          <form>
            <label htmlFor="sr">Igrica koju igram</label>
            <select name="sr" id="sr" value={s} onChange={handleSChange}>
              <option value="NEODREĐENO">NEODREĐENO</option>
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
          </form>
        </div>
        <p>
          Gdje Vas mogu kontaktirati saigrači, <br /> morate da unesete barem
          jedno polje
        </p>
        <Input
          type="text"
          placeholder="@Discord"
          value={discord}
          onChange={handleDiscordChange}
        />
        <Input
          type="text"
          placeholder="Discord server (link)"
          value={discord2}
          onChange={handleDiscord2Change}
        />
        <Input
          type="text"
          placeholder="@Instagram"
          value={ig}
          onChange={handleIgChange}
        />
        <Input
          type="text"
          placeholder="@PSN"
          value={ps}
          onChange={handlePsChange}
        />
        <Input
          type="text"
          placeholder="@XBOX"
          value={xb}
          onChange={handleXbChange}
        />
        <div className="profile_pic">
          <div id="pfp" style={{ backgroundColor: pfp }}></div>
          <p>
            Kako bi aplikacija ostala brza mi moramo da štedimo resurse, iz tog
            razloga ne možete da stavite profilnu sliku, ali zato možete da
            stavite random boju
          </p>
          <button id="new" onClick={handleNewColor}>
            NOVA BOJA
          </button>
        </div>
        {Object.keys(errors).length > 0 && (
          <p className="error">
            {Object.values(errors).map((error, index) => (
              <span key={index}>{error}<br /></span>
            ))}
          </p>
        )}
        <button style={{ marginTop: "40px" }} onClick={handleSubmit}>
          NAPRAVI NALOG
        </button>
      </div>
    </>
  );
};

export default Register;
