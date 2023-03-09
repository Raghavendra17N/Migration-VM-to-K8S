import React from 'react'
import { Component, useEffect, useState } from "react";
import InputWithLabel from "../../components/UI/InputWithLabel/InputWithLabel";
import Button from "../../components/UI/Button/Button";
import './Vpc.css';
import { toast,ToastContainer } from "react-toastify";
import noData from '../../assets/NoData.png';

const VpcList = () => {
  const [existingVpcs, setExistingVpcs] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
    const [ProjectId, setProjectId] = useState("");
    
    const [searchProjectId, setSearchProjectId] = useState("");
    const [buttonText, setButtonText] = useState("List VPC");
    const [disabled,setDisabled]=useState(false);
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      console.log('http://'+`${process.env.REACT_APP_HOST}`+`${process.env.REACT_APP_INGRESS_PATH}`+'/list_existing_vpc/'+`${ProjectId}`)
       fetch('http://'+`${process.env.REACT_APP_HOST}`+`${process.env.REACT_APP_INGRESS_PATH}`+'/list_existing_vpc/'+`${ProjectId}`)
        .then((response) => response.json())
        .then((data) => {
           setIsLoading(false);
           console.log(data);
         setExistingVpcs(data[ProjectId]); })
         .catch(error=>{
          setIsLoading(false);
          setExistingVpcs([]);
          toast.error("Please Enter the correct Project Id!",{
            position:toast.POSITION.TOP_CENTER,
            autoClose:false,
            type:toast.TYPE.ERROR
          });
        });
  };
  console.log(existingVpcs);
  return (
    <div>
      <div>
      <div className="">
        <form className="row" style={{marginTop:'2rem',marginLeft:'2rem'}}>
        <div style={{ display: "flex" }}>
          <div className="div-box-smaller" style={{ marginRight: "10px" }}>
          <InputWithLabel
            id="Project"
            text="Project Id:"
            type="text"
            
            name="Project"
            onChange={(e) => {
              setProjectId(e.target.value)}}/>
          
          </div>
            
          <Button
            onClick={handleSubmit}
            
            style={{ marginTop: "28px", marginRight: "10px" }}
            disabled={!ProjectId}
          >
            {buttonText}
          </Button>
        </div>
          
        </form>
        </div>
        <div className="scrolls_existing_data">
        {!isLoading && existingVpcs.length>0 ?(
        <table>
          <thead>
            <tr>
              <th className="cib_vpc_table_heading">Project Id</th>
              <th className="cib_vpc_table_heading">VPC Name</th>
            </tr>
          </thead>
          <tbody style={{ alignItems: "center" }}>
          {existingVpcs.map((obj) => {
          return (
          <>
          <tr>
            <td >{ProjectId}</td>
            <td>{obj}</td>
            </tr>
          </>
          );
          })}
            
            
          </tbody>
        </table>
        
        ):(!isLoading &&
        <p style={{textAlign:'center',fontSize:'2.0rem',font:'initial',justifyContent:'center',margin:'auto',marginTop:'15vh'}}><img src={noData} alt='no data'></img><br/><span className='no_data'>No Data</span></p>
        )
        }
         {isLoading && (
         <div className='spinner-div'><img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" /></div>
         )}
        </div>
      </div>
      
    </div>
  );
};
export default VpcList
