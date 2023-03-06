import React from "react";
import "./Card.css";

const Card = (props) => {
  const cardCls = "card " + props.className;
  return (
    <>
      <div className={cardCls}>{props.children}</div>
    </>
  );
};

export default Card;
