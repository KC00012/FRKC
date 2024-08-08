import React, { useState, useEffect } from "react";
import "./players.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Support from "../Support/Support";
import { jwtDecode } from "jwt-decode";
import Button from "../button/Button";
import config from "../config.cjs";
const Players = () => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedGame, setSelectedGame] = useState("NEODREĐENO");

  useEffect(() => {
    const token = localStorage.getItem("goodgame");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.isLoggedIn) {
        setIsLoggedIn(true);
      }
    }

    if (isLoggedIn) {
      fetch(`${config.API_URL}/saigraci`)
        .then(response => response.json())
        .then(data => {
          // Sorting players based on rank
          const sortedPlayers = data.sort((a, b) => {
            if (a.rank === 'diamond') return -1;
            if (b.rank === 'diamond') return 1;
            if (a.rank === 'gold') return -1;
            if (b.rank === 'gold') return 1;
            return 0;
          });
          setPlayers(sortedPlayers);
          setFilteredPlayers(sortedPlayers);
        })
        .catch(error => console.error("Error fetching data:", error));
    }
  }, [isLoggedIn]);

  const handlePlayerClick = (playerId) => {
    localStorage.setItem("wellplayed", playerId)
    window.location.href = `/profil/${playerId}`
  };

  const handleGameChange = (event) => {
    const selectedGame = event.target.value;
    setSelectedGame(selectedGame);

    if (selectedGame === "NEODREĐENO") {
      setFilteredPlayers(players);
    } else {
      const filtered = players.filter(player => player.game === selectedGame);
      setFilteredPlayers(filtered);
    }
  };

  if (!isLoggedIn) {
    return (
      <>
        <Header />
        <h1 id="msl">Prijavi se, ili napravi nalog ako želiš da vidiš saigrače</h1>
        <div className="bts">
          <Button text="PRIJAVI SE" href="/prijava"></Button>
          <Button text="NAPRAVI NALOG" href="/registracija"></Button>
        </div>
        <Support />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <h1 id="sbp">Saigrači, a možda i budući prijatelji</h1>
      <form id="video">
        <label htmlFor="sr">TRAŽIM SAIGRAČA U IGRICI:</label>
        <select id="sr" onChange={handleGameChange}>
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
      <div className="players">
        {filteredPlayers.map((player, index) => (
          <div
            className={`player-card ${player.rank === 'diamond' ? 'diamond' : ''}`}
            key={index}
            onClick={() => handlePlayerClick(player._id)}
          >
            <aside className="top_part">
              <aside className="pfp" style={{ backgroundColor: player.color }}></aside>
              <h2>{player.name}</h2>
            </aside>
            <aside className="middle_part">
              <p style={{ height: "150px", overflow: "hidden" }}>{player.desc}</p>
            </aside>
            <aside className="rank">
              {player.rank !== 'default' && (
                <p className={`${player.rank === 'diamond' ? 'dmd' : ''} ${player.rank === 'gold' ? 'gold' : ''}`}>
                  {player.rank.toUpperCase()} RANK
                </p>
              )}
            </aside>
            <aside className="game">
              <p>{player.game}</p>
            </aside>
          </div>
        ))}
      </div>
      <Support />
      <Footer />
    </>
  );
};

export default Players;
