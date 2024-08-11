import React from "react";
import "./button.scss";
const Button = ({ href, text, target }) => {
  return (
    <a className="styling" href={href} target={target}>
      {text}
    </a>
  );
};

export default Button;
