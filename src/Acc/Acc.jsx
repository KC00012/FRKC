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
// import jwt from 'jsonwebtoken'
const Acc = () => {
  const [userData, setUserData] = useState(null);
  const [o, setO] = useState(false)
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [eng, setEng] = useState("Ne");
  const [s, setS] = useState("NEODREĐENO");
  const [color, setColor] = useState("#fff")
  const [discord, setDiscord] = useState("");
  const [discord2, setDiscord2] = useState("");
  const [ig, setIg] = useState("");
  const [ps, setPs] = useState("");
  const [xb, setXb] = useState("");
  const [pfp, setPfp] = useState("#fff");
  const [desc, setDesc] = useState("");
  const [errors, setErrors] = useState({})
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
        fetch(`${config.API_URL}/nalog`)
          .then((response) => response.json())
          .then((data) => {
            for (let i = 0; i < data.length; i++) {
              if (data[i].name === decodedToken.name) {
                setUserData(data[i]);
                setName(data[i].name);
                setDesc(data[i].desc || "");
                setEng(data[i].en || "Ne");
                setS(data[i].game || "NEODREĐENO");
                setDiscord(data[i].discord || "");
                setDiscord2(data[i].discord2 || "");
                setIg(data[i].ig || "");
                setPs(data[i].ps || "");
                setXb(data[i].xb || ""); // Initialize state with userData.xb
                setPfp(data[i].color || "#fff");
              }
            }
          });
      } catch (error) {
        console.log("a");
      }
    }
  }, []);

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
                setUserData(data[i])
              }
            }
          }
          )
      } catch (error) {
        console.log("a");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("goodgame");
    setTimeout(() => {
      window.location.href = '/'
    }, 1200);
  };
  const handleSubmit = async () => {
    const validationErrors = {};
    if (!name) validationErrors.name = "Ime je obavezno.";
    if (!desc) validationErrors.desc = "Opis je obavezan.";
    if (!eng) validationErrors.eng = "Poznavanje engleskog je obavezno.";
    if (!s) validationErrors.s = "Morate odabrati igricu koju igrate.";
    if (!discord && !discord2 && !ig && !ps && !xb) {
      validationErrors.contact = "Morate unijeti barem jedno polje za kontakt.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Continue with the submission if no errors
    const updatedData = {
      name,
      desc,
      eng,
      game: s,
      discord,
      discord2,
      ig,
      ps,
      xb,
      color: pfp,
    };

    try {
      const response = await fetch(`${config.API_URL}/nalog/${userData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUserData(updatedUser);

        // Generate a new JWT and store it in localStorage
        // const payload = {
        //   name: updatedUser.name,
        //   isLoggedIn: true
        // };
        // const newToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '60d' });
        localStorage.setItem("goodgame", updatedUser.token);

        // Reload the page to reflect the changes
        window.location.reload();
      } else if (response.status === 400) {
        const data = await response.json();
        if (data.message === "Username already exists") {
          setErrors({ name: "Korisničko ime je zauzeto" });
        }
      } else {
        console.log("a");

      }
    } catch (error) {
      console.log("a");
    }
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
          value={name}
          onChange={handleNameChange}
        />
        {errors.name && <p className="error">{errors.name}</p>} {/* Display name error */}

        <textarea
          id="desc"
          placeholder="Opiši sebe, koje igre igraš i slično"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        {errors.desc && <p className="error">{errors.desc}</p>} {/* Display description error */}

        <div className="form_wrapper">
          <form>
            <label htmlFor="eng">Poznavanje engleskog</label>
            <select name="eng" id="eng" value={eng} onChange={handleEngChange}>
              <option value="Ne">Ne</option>
              <option value="Srednje">Srednje</option>
              <option value="Tečno">Tečno</option>
            </select>
            {errors.eng && <p className="error">{errors.eng}</p>} {/* Display English proficiency error */}
          </form>
          <form>
            <label htmlFor="sr">Igrica koju igram</label>
            <select name="sr" id="sr" value={s} onChange={handleSchange}>
              <option value="NEODREĐENO">NEODREĐENO</option>
              {/* Add all other options here */}
            </select>
            {errors.s && <p className="error">{errors.s}</p>} {/* Display game error */}
          </form>
        </div>

        <p>Gdje Vas mogu kontaktirati saigrači, <br /> morate da unesete barem jedno polje</p>
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
        {errors.contact && <p className="error">{errors.contact}</p>} {/* Display contact error */}

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
        <button style={{ marginTop: "40px" }} onClick={handleSubmit}>
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
          <p>Poznavanje engleskog: {userData.en}</p>
          <p>Igrica: {userData.game}</p>
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