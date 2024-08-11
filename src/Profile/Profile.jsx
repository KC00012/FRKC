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
import dc from './discord.svg'
import server from './server.svg'
import ig_icon from './ig.svg'
import ps_icon from './ps_icon.svg'
import xbox_icon from './xbox_icon.svg'
import config from "../config.js";

const Profile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = localStorage.getItem("wellplayed");
  const [udata, setuData] = useState({})
  useEffect(() => {

    fetch(`${config.API_URL}/profil/${user}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        for (let i = 0; i < data.length; i++) {
          if (data[i]._id === user) {

            setuData(data[i])
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Header />
      <div className="acc_container">
        <div className="data">
          <div id="pfp" style={{ backgroundColor: udata.color }}></div>
          <h1>{udata.name}</h1>
          <p>
            <img src={cal} alt="" />
            {new Date(udata.createdAt).toLocaleDateString('sr')}
          </p>
          <p>Poznavanje engleskog: {udata.en}</p>
          <p>Igrica: {udata.game}</p>
          <p>Bedževi</p>
          <span>
            <img src={check} alt="check" />
            Uspješno napravljen nalog
          </span>
          {
            udata.donator === true && (
              <span>
                <img src={money} alt="money" />
                Korisnik je donator
              </span>
            )
          }
          {
            udata.bug === true && (
              <span>
                <img src={bug} alt="money" />
                Korisnik je doprinjeo aplikaciji
              </span>
            )
          }
          {
            udata.rank === "gold" && (
              <span id="gold_v">
                <img src={gold} alt="gold" />
                Korisnik ima GOLD verifikaciju
              </span>
            )
          }
          {
            udata.rank === "diamond" && (
              <span id="dmd_v">
                <img src={dmd} alt="dmd" />
                Korisnik ima DIAMOND verifikaciju
              </span>
            )
          }
          {
            udata.rank === "default" && null
          }
        </div>
        <div className="r_data">
          <h1>Opis</h1>
          <p>{udata.desc}</p>
          <hr style={{ width: "100%", border: "1px solid white" }} />
          <p>
            <span>
              <img src={dc} alt="" />
              {udata.discord ? udata.discord : "Nije navedeno"}
            </span>
          </p>
          <p>
            <span>
              <img src={server} alt="" />
              {udata.discord2 ? udata.discord2 : "Nije navedeno"}
            </span>
          </p>
          <p>
            <span>
              <img src={ig_icon} alt="" />
              {udata.ig ? udata.ig : "Nije navedeno"}
            </span>
          </p>
          <p>
            <span>
              <img src={ps_icon} alt="" />
              {udata.ps ? udata.ps : "Nije navedeno"}
            </span>
          </p>
          <p>
            <span>
              <img src={xbox_icon} alt="" />
              {udata.xb ? udata.xb : "Nije navedeno"}
            </span>
          </p>
        </div>
      </div>
      <Support />
      <Footer />
    </>
  );
};

export default Profile;
