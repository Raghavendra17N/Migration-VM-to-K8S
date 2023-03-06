import React from 'react';
import {useState} from "react";
import Vpc from './Vpc.css';
import noData from "../../assets/NoData.png";
import '../../Components/UI/Table/Table.css'; 
import Button from '../../Components/UI/Button/Button';
import '../../ContainerStyle/ContainerStyles.css' ;
import Notification from '../../Components/UI/Notification/Notification';
import { toast,ToastContainer } from "react-toastify";
import { FaPencilAlt,FaTrashAlt } from 'react-icons/fa'; 
import "react-toastify/dist/ReactToastify.css";
const VpcTable = ({data,handleupdate,handleDelete,bundlematx}) => { 
    const [isDeploying,setIsDeploying]=useState(false); 
    const [buttonText,setButtonText]=useState("Deploy");
    const [showtatification,setshowNotification]=useState(false);
    const [Deployed,SetDeployed]=useState(false);
    const closeSuccessNotification = () => { setshowNotification(false);
    };
    const handleValidateSubmit = (event) =>{
        event.preventDefault();
        console.log(JSON.stringify(data));
        setButtonText("Deploying...")
        setIsDeploying(true);
        console.log(process.env.REACT_APP_BACKEND + `/create_vpc`); 
        fetch(process.env.REACT_APP_BACKEND + `/create_vpc`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
            "Content-Type": "application/json",
            },
        })
        .then(res=>res.json())
        .then((data)=>{
            if(data==="success"){
            setButtonText('Deploy');
            toast.success("VPC Added Successfully",{ 
                position:toast.POSITION.TOP.RIGHT,        
                autoclose:false, 
                type:toast.TYPE.SUCCESS
            
            });
        }
    })
            
            .catch(error=>{
            setIsDeploying(false);
            setButtonText('Deploy');
            toast.error("VPC Creation Failed!", { position:toast.POSITION.TOP.RIGHT,
            autoclose:false, 
            type:toast.TYPE.ERROR
            
            }); });
            
            }
            return (
                <div>
                
                <div className='scrolls_data'> 
                {data.length > 0 ? (
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
                    {data.map((item,index)=>(
                <tr key={index}> 
                <td>{item.project}</td>
                <td>{item.name}</td> 
                <td>{item.description}</td>
                <td>(item.routing mode)</td>
                <td>
                    <a href="#" onclick={()=>handleupdate(index)}><FaPencilAlt style = {{color: '#d04a02', marginRight: '1rem'}}/></a> 
                    <a href="#" onclick={()=>handleDelete(index)}><FaTrashAlt  style = {{color: '#d04a02'}}/></a>
                </td>
                </tr>
                ))}
                </tbody>
                </table>
                ):(
                    <p style={{textAlign:'center',fontSize:'2.0rem',font:'initial',justifyContent:'center'}}><img src={noData} alt='no data'></img><br/><span className='no_data'>No Data</span></p>
                    )}
                    </div>
                    <Button className={data.length>0?'validate':'hide1'} onclick={handleValidateSubmit} disabled={isDeploying}>{buttonText}</Button>
                    </div>
            )
                }
export default VpcTable                