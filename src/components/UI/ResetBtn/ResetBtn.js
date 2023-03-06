import React from 'react'
import './ResetBtn.css'
const ResetBtn = (props) => {
    const btnCls = "btn-reset";
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
  )
}

export default ResetBtn
