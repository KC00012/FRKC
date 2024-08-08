import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const token = localStorage.getItem("goodgame");
const isLoggedIn = token && jwtDecode(token).isLoggedIn;
const Footer = () => {
  return (
    <>
      <footer>
        <h1 className="logo">KEYCAP</h1>
        <nav>
          <Link to="/">POČETNA</Link>
          <Link to="/">SAIGRAČI</Link>
          <Link to="/forum">FORUM</Link>
          <Link to="/podrska">PODRŠKA</Link>
          <Link to="/">PRAVILA I USLOVI</Link>
          {isLoggedIn ? (
            <Link to="/nalog">NALOG</Link>
          ) : (
            <>
              <Link to="/prijava">PRIJAVI SE</Link>
              <Link to="/registracija">NAPRAVI NALOG</Link>
            </>
          )}
        </nav>
      </footer>
    </>
  );
};

export default Footer;
