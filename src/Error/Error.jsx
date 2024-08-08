import React from "react";
import Header from "../Header/Header";
import "./error.scss";
const Error = () => {
  return (
    <>
      <Header></Header>
      <h1 id="snp">STRANICA NIJE PRONAĐENA</h1>
      <center>
        <button
          id="csnps"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          VRATI SE NA POČETNU STRANICU
        </button>
      </center>
    </>
  );
};

export default Error;
