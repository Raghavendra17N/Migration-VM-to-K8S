import React from "react";
import { AiFillCloseCircle, AiOutlineClose } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { FcInfo } from "react-icons/fc";
import "./Notification.css";

const Notification = (props) => {
  let notificationCls = "";
  if (props.type === "success") {
    notificationCls = "green-notification " + props.className;
  } else if (props.type === "failure") {
    notificationCls = "red-notification " + props.className;
  } else{
    notificationCls='blue-notification '+props.className;
  }

  return (
    <div className={notificationCls} style={props.style}>
      {props.type === "success" && (
        <BsFillCheckCircleFill className="notification-icon" />
      )}
      {props.type === "failure" && (
        <AiFillCloseCircle className="notification-icon" />
      )}
      {props.type === "info" && <FcInfo className="notification-icon"/>}
      &nbsp;&nbsp;
      <span>{props.message}</span>
      {props.showCloseBtn && (
        <AiOutlineClose
          className="close-icon"
          onClick={() => {
            props.closeNotification();
          }}
        />
      )}
    </div>
  );
};

export default Notification;
