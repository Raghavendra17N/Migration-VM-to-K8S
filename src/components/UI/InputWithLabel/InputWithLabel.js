import React from "react";
import "./InputWithLabel.css";

const InputWithLabel = (props, ref) => {
  const labelCls = "label " + props.className;
  const inputCls = "input " + props.className + " " + props.inputClassName;

  return (
    <>
      <label htmlFor={props.id} className={labelCls}  style={props.labelStyle}>
        {props.text}
        &nbsp;{props.star===true && <span className="star">*</span>}
      </label>
      <input
        id={props.id}
        className={inputCls}
        type={props.type}
        ref={ref}
        onChange={props.onChange}
        value={props.value}
        onBlur={props.onBlur}
        style={props.inputStyle}
        checked={props.checked}
        name={props.name}
        defaultValue={props.defaultValue}
        min={props.min}
        disabled={props.disabled}
      />
    </>
  );
};

export default React.forwardRef(InputWithLabel);
