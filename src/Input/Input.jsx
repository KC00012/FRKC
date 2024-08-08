import React from "react";
import "./input.scss";

const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="input_style"
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
