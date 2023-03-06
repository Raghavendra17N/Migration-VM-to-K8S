import React from "react";
import "./Card3.css";

const Card3 = (props) => {
  const cardCls = "card3 " + props.className;
  return (
    <>
      <div className={cardCls} style={props.style}>{props.children}</div>
    </>
  );
};

export default Card3;
