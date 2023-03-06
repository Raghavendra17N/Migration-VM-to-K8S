import React, { useState } from 'react'
//import VpcForm from './VpcForm';
import VpcList from './VpcList';

import '../../ContainerStyle/ContainerStyles.css';
import'./Vpc.css';
import VpcForm1 from './VpcForm1';


const Vpc = () => {
 


  const [showlist,setShowList]=useState(false);
  const[showForm,setShowForm]=useState(true);

  const handleListButtonClick=()=>{
    setShowList(true);
    setShowForm(false);
    
  }
  const handleFormButtonClick=()=>{
    setShowList(false);
    setShowForm(true);
    
  }
  return (
  
    <div>
      
      <div className='cib_vpc_form'>
        <div> 
          <div classname='cib_vpc_button' style={{marginTop:'2rem'}}> 
                
          <button className={showlist?'c1 first':'c2 second'}  id="list-peering"  onClick={handleListButtonClick} style={{fontFamily:'Helvetica',fontSize:'14px',textAlign:'center',justifyContent:'center',width:'210px'}}>List of existing VPCs</button>
          <button className={showForm?'c1 first':'c2 second'} id="form-peering"  onClick={handleFormButtonClick} style={{fontFamily:'Helvetica',fontSize:'14px',textAlign:'center',justifyContent:'center',width:'210px'}}>Create new VPC</button>
          </div>
           {showForm && <VpcForm1/>}
           {showlist && <VpcList/>}
        </div>
        
        </div>
      
      </div>
    
    
  )
}

export default Vpc
