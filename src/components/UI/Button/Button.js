import React from "react";
import "./Button.css";

const Button = (props) => {
  const btnCls = "btn " + props.className;
  return (
    <>
      <button
        className={btnCls}
        type={props.type || "button"}
        onClick={props.onClick}
        disabled={props.disabled}
        style={props.style}
        name={props.name}
      >
        {props.children}
      </button>
    </>
  );
};

export default Button;
