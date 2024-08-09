import React, { useState, useEffect } from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Adjusted the import as jwtDecode is usually a default export

const Header = () => {
  const token = localStorage.getItem("goodgame");
  const isLoggedIn = token && jwtDecode(token).isLoggedIn;
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const resl = document.getElementById("resl");
    let body = document.getElementsByTagName("body")
    if (menuOpen) {
      body[0].style.cssText = 'overflow:hidden !important;'
      resl.style.display = "flex";
    } else {
      body[0].style.cssText = 'overflow:scroll !important;'

      resl.style.display = "none";
    }
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(prevMenuOpen => !prevMenuOpen);
  };

  return (
    <>
      <header>
        <h1 className="logo" onClick={() => { window.location.href = '/' }}>KEYCAP</h1>
        <nav>
          <Link to="/">POČETNA</Link>
          <Link to="/saigraci">SAIGRAČI</Link>
          <Link to="/forum">FORUM</Link>
          {isLoggedIn ? (
            <Link to="/nalog">NALOG</Link>
          ) : (
            <>
              <Link to="/prijava">PRIJAVI SE</Link>
              <Link to="/registracija">NAPRAVI NALOG</Link>
            </>
          )}
        </nav>
        <div
          id="nav-icon1"
          className={menuOpen ? "open" : ""}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>
      <div id="resl">
        <nav>
          <Link to="/">POČETNA</Link>
          <Link to="/saigraci">SAIGRAČI</Link>
          <Link to="/forum">FORUM</Link>
          {isLoggedIn ? (
            <Link to="/nalog">NALOG</Link>
          ) : (
            <>
              <Link to="/prijava">PRIJAVI SE</Link>
              <Link to="/registracija">NAPRAVI NALOG</Link>
            </>
          )}
        </nav>
      </div>
    </>
  );
};

export default Header;
