import React from "react";
import "./button.scss";
const Button = ({ href, text }) => {
  return (
    <a className="styling" href={href}>
      {text}
    </a>
  );
};

export default Button;
