import React from "react";
import "./Dropdown3.css";

const Dropdown3 = (props) => {
  const labelCls = "label3 " + props.labelStyle;
  const dropdownCls = "dropdownClass3 " + props.className;
  return (
    <>
      <label htmlFor={props.id} className={labelCls}>
        {props.text}
        &nbsp;{props.star===true && <span className="star">*</span>}
      </label>
      <select
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        className={dropdownCls}
        onClick={props.onClick}
        name={props.name}
        id={props.id}
        onMouseLeave={props.onMouseLeave}
        disabled={props.disabled}
      >
        {props.children}
      </select>
    </>
  );
};

export default Dropdown3;
