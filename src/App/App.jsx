import Header from "../Header/Header";
import "./app.scss";
import console from "./console.webp";
import keyboard from "./keyboard.webp";
import forum from "./forum.webp";
import trophy from "./trophy.webp";
import gold from "./medal.webp";
import rocket from "./rocket.webp";
import dmd from "./dmd.webp";
import Button from "../button/Button";
import Support from "../Support/Support";
import Footer from "../Footer/Footer";
import { jwtDecode } from "jwt-decode";
import Dc from "../Dc/Dc";
function App() {
  const token = localStorage.getItem("goodgame");
  const isLoggedIn = token && jwtDecode(token).isLoggedIn;
  return (
    <>
      <div className="container">
        <Header></Header>
        <div className="about">
          <div className="about_text">
            <h1>
              PRONAĐI SAIGRAČA I <br /> ZAPOČNI AVANTURU
            </h1>
            <p>Platforma koja spaja gamere</p>
            <div className="button_flex">
              {isLoggedIn ? (
                <Button href="/saigraci" text="POGLEDAJ SAIGRAČE">NALOG</Button>
              ) : (
                <>
                  <Button href="/prijava" text="PRIJAVI SE"></Button>
                  <Button href="/registracija" text="NAPRAVI NALOG"></Button>
                </>
              )}
            </div>
          </div>
          <img src={console} alt="console" />
        </div>
        <div className="games_container">
          <div className="games">
            <div
              className="about_text"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <h1>
                PRONAĐI SAIGRAČA <br />
                IZ BILO KOJE IGRE
              </h1>
              <p>Kroz par klikova pronađi saigrača</p>
              <Button text="POGLEDAJ SAIGRAČE" href="/saigraci"></Button>
            </div>
            <img src={keyboard} alt="keyboard" />
          </div>
          <div className="game_list">
            <div>
              <h1>LOL</h1>
            </div>
            <div>
              <h1>CS2</h1>
            </div>
            <div>
              <h1>DOTA 2</h1>
            </div>
            <div>
              <h1>ROCKET LEAGUE</h1>
            </div>
            <div>
              <h1>FORTNITE</h1>
            </div>
            <div>
              <h1>PUBG</h1>
            </div>
            <div>
              <h1>R6</h1>
            </div>
            <div>
              <h1>ARK</h1>
            </div>
            <div>
              <h1>WOW</h1>
            </div>
            <div>
              <h1>MINECRAFT</h1>
            </div>
            <div>
              <h1>TERRARIA</h1>
            </div>
            <div>
              <h1>GTA</h1>
            </div>
            <div>
              <h1>VALORANT</h1>
            </div>
            <div>
              <h1>OVERWATCH</h1>
            </div>
            <div>
              <h1>COD</h1>
            </div>
            <div>
              <h1>APEX</h1>
            </div>
          </div>
        </div>
        <div className="about">
          <div className="about_text">
            <h1>
              FORUM, ZANIMLJIVE TEME <br /> VEZANE ZA GAMING
            </h1>
            <Button text="POGLEDAJ FORUM" href="/forum"></Button>
          </div>
          <img src={forum} alt="forum" />
        </div>
        <div className="rank_container">
          <div className="about">
            <div className="about_text">
              <h1>BUDI PRVI U PRETRAZI</h1>
              <p style={{ textAlign: "right" }}>
                Poboljšajte Vaš rank i budite primjećeni
              </p>
            </div>
            <img src={trophy} alt="trophy" id="trophy" />
          </div>
          <div className="about_ranks">
            <div>
              <img src={gold} alt="gold" />
              <h1>GOLD</h1>
              <p>
                Rank koji će Vam pomoći da budete iznad korisnika koji ne
                posjeduju rank, ali ćete biti ispod korisnika koji imaju DIAMOND
                rank.
              </p>
              <p style={{ marginTop: "20px" }}>Prednosti GOLD ranka</p>
              <ul>
                <li>Badge na profilu</li>
                <li>Prikaz iznad korisnika bez ranka</li>
              </ul>
              <Button text="0.5€ trade offer" href="https://steamcommunity.com/tradeoffer/new/?partner=1300677302&token=uxNYCPCX" target="_blank"></Button>
              <p>Ako trade offer pređe 0.5€ dobijate i donator badge (do 1€)</p>
              <p>VAŽNO! ako trade offer bude više od 1€ morate navesti da želite da trade offer bude prihvaćen, u suprotnom trade offer će biti odbijen.</p>
            </div>
            <div>
              <img src={dmd} alt="dmd" />
              <h1>DIAMOND</h1>
              <p>
                Rank koji Vas postavlja na vrh, bićete iznad ostalih korisnika
                na pretrazi.
              </p>

              <p style={{ marginTop: "20px" }}>Prednosti GOLD ranka</p>
              <ul>
                <li>Badge na profilu</li>
                <li>Prikaz na vrhu pretrage</li>
              </ul>
              <Button text="2€ trade offer" href="https://steamcommunity.com/tradeoffer/new/?partner=1300677302&token=uxNYCPCX" target="_blank"></Button>
              <p>Ako trade offer pređe 2€ dobijate i donator badge (do 3€)</p>
              <p>VAŽNO! ako trade offer bude više od 3€ morate navesti da želite da trade offer bude prihvaćen, u suprotnom trade offer će biti odbijen.</p>
            </div>
          </div>
          <p id="buy">
            Rank se kupuje tako što pošaljete skinove na STEAM. Sa skinovima,
            kao poruku šaljete Vaš KEYCAP username, ako ne unesete username, ili
            unesete pogrešan username Vaš trade offer će biti odbijen i nećete
            dobiti rank <br />
            <span>
              VAŽNO! Ne vršimo povrat skinova, rank dobijate par minuta nakon
              prihvaćenog trade offera
            </span>
          </p>
        </div>
        <div className="about">
          <div className="about_text">
            <h1>
              PRIDRUŽI SE KEYCAP <br /> PLATFORMI{" "}
            </h1>
            <div className="button_flex">
              {isLoggedIn ? (
                <Button href="/saigraci" text="POGLEDAJ SAIGRAČE">NALOG</Button>
              ) : (
                <>
                  <Button href="/prijava" text="PRIJAVI SE"></Button>
                  <Button href="/registracija" text="NAPRAVI NALOG"></Button>
                </>
              )}
            </div>
          </div>
          <img src={rocket} alt="rocket" />
        </div>
        <Dc></Dc>
        <Support></Support>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
