import React from "react";
import "./InputWithCheckbox.css";

const InputWithCheckbox = (props, ref) => {
  const labelCls = "label";
  return (
    <div className="checkbox-div">
      <input
        id={props.id}
        type='checkbox'
        defaultChecked={props.defaultChecked}
        ref={ref}
        onChange={props.onChange}
      />
      <label htmlFor={props.id} className={labelCls}>
        &nbsp;&nbsp;{props.text}
      </label>
    </div>
  );
};

export default React.forwardRef(InputWithCheckbox);
