import React from "react";
import "./support.scss";
import Button from "../button/Button";
const Support = () => {
  return (
    <div id="support">
      <h1>KEYCAP NEMA REKLAME, ALI NAS ZATO MOŽETE PODRŽATI DONACIJOM</h1>
      <p>
        Pošaljite trade offer i podržite naš rad. Prilikom slanja trade offer-a
        u poruci navedite da je donacija i unesite KEYCAP username. Donatori
        dobijaju badge na profilu.
      </p>
      <Button text="POŠALJI TRADE OFFER" href="https://steamcommunity.com/tradeoffer/new/?partner=1300677302&token=uxNYCPCX" target="_blank"></Button>
    </div>
  );
};

export default Support;
