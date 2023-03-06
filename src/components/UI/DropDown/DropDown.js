import React from "react";
import './DropDown.css';

const Dropdown = (props) => {
  const labelCls = "label " + props.labelStyle;
  const dropdownCls = "dropdownClass " + props.className;
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
        
      >
        {props.children}
      </select>
    </>
  );
};

export default Dropdown;
