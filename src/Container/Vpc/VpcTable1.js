import React from "react";
import { useState } from "react";
import Vpc from "./Vpc.css";
import noData from "../../assets/NoData.png";
import "../../components/UI/Table/Table.css";
import Button from "../../components/UI/Button/Button";
import "../../ContainerStyle/ContainerStyles.css";

import { toast, ToastContainer } from "react-toastify";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const VpcTable = ({ data, handleUpdate, handleDelete, handleEmpty }) => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [buttonText, setButtonText] = useState("Deploy");
  const [showNotification, setShowNotification] = useState(false);
  const [Deployed, setDeployed] = useState(false);
  const closeSuccessNotification = () => {
    setShowNotification(false);
  };
  const handleValidateSubmit = (event) => {
    event.preventDefault();
    console.log(JSON.stringify(data));

    setButtonText("Deploying...");
    setIsDeploying(true);
    console.log('http://'+`${process.env.REACT_APP_HOST}`+`${process.env.REACT_APP_INGRESS_PATH}`+'/create_vpc');
    fetch('http://'+`${process.env.REACT_APP_HOST}`+`${process.env.REACT_APP_INGRESS_PATH}`+'/create_vpc', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === "success") {
          setButtonText("Deploy");
          setIsDeploying(false);
          handleEmpty();
          toast.success("VPC Added Successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: false,
            type: toast.TYPE.SUCCESS,
          });
        }
      })

      .catch((error) => {
        setIsDeploying(false);
        setButtonText("Deploy");
        toast.error("VPC Creation Failed!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: false,
          type: toast.TYPE.ERROR,
        });
      });
  };

  return (
    <div>
      {isDeploying === true ? (
        <div className="spinner-div">
          <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" />
        </div>
      ) : data.length > 0 ? (
        <div className="scrolls_data">
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Name</th>
                <th>Description</th>
                <th>Mode</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.project}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.routing_mode}</td>
                  <td>
                    <a href="#" onClick={() => handleUpdate(index)}>
                      <FaPencilAlt
                        style={{ color: "#d04a02", marginRight: "1rem" }}
                      />
                    </a>
                    <a href="#" onClick={() => handleDelete(index)}>
                      <FaTrashAlt style={{ color: "#d04a02" }} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p
          style={{
            textAlign: "center",
            fontSize: "2.0rem",
            font: "initial",
            justifyContent: "center",
          }}
        >
          <img src={noData} alt="no data"></img>
          <br />
          <span className="no_data">No Data</span>
        </p>
      )}

      <Button
        className={
          data.length > 0 && isDeploying === false ? "validate" : "hide1"
        }
        onClick={handleValidateSubmit}
        disabled={isDeploying}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default VpcTable;
