import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import '../../ContainerStyle/ContainerStyles.css';
//import VpcTable from './VpcTable';
import InputWithLabel from '../../components/UI/InputWithLabel/InputWithLabel';
import Dropdown from '../../components/UI/DropDown/DropDown';
import VpcTable1 from './VpcTable1';
import Button from '../../components/UI/Button/Button';
import ResetBtn from '../../components/UI/ResetBtn/ResetBtn';


const VpcForm1 = () => {
  const [buttonText, setButtonText] = useState("Add VPC");
  const [resetbuttonText, setResetButtonText] = useState("Reset");
  const [modeArray,setModeArray]=useState(['GLOBAL','REGIONAL']);
  const[vpcData,setVpcData]=React.useState([]);
  const[selectedEntry,setSelectedEntry]=useState(null);
  const[updateIndex,setUpdateIndex]=useState(-1);
  const[formData,setFormData]=React.useState({
    project:"",
    name:"",
    description:"",
    routing_mode:"",
    auto_create_subnetworks:false,
    delete_default_routes_on_create:false,
  })

  let name,value
  function handleChange(event){
    name=event.target.name;
    value=event.target.value;
    setFormData({...formData,[name]:value});
    //console.log(formData);
    
  };
  const handleEmpty=()=>{
    setVpcData([]);
  }
  const handleUpdate=(index)=>{
    setFormData(vpcData[index]);
    setUpdateIndex(index);
  }
  const handleDelete=(index)=>{
    setVpcData(vpcData.filter((_,i)=>i!==index));
  };

  

  const handleAddFormSubmit=(event)=>{
    event.preventDefault();
    const {project,name,description,routing_mode,auto_create_subnetworks,delete_default_routes_on_create}=formData;
    if(updateIndex===-1){
        const unique=vpcData.every((item)=>item.name!=name);
        if(unique){
            setVpcData([...vpcData,{project,name,description,routing_mode,auto_create_subnetworks,delete_default_routes_on_create}]);
            handleReset();
        }
        else{
            alert("Name should be unique!");
        }
    }
      
    else{
        const updatedData=[...vpcData];
        const currentName=updatedData[updateIndex].name;
        const isUnique=vpcData.every((item,i)=>item.name!==name || i===updateIndex);
        if(isUnique){
            updatedData[updateIndex]=formData;
            setVpcData(updatedData);
            handleReset();
            setUpdateIndex(-1);
        }
        else{
            alert("Name must be unique");
        }
      
    }
    
    };
  const handleReset=()=>{
    setFormData({
      project:'',
      name:'',
      description:'',
      routing_mode:'',
      auto_create_subnetworks:false,
      delete_default_routes_on_create:false,
    });
   
  }
  
  const isDisabled=formData.project===""||formData.name===""||formData.routing_mode==="";
  return (
    <div style={{ padding: "28px",background: 'var(--whiteColor)',
    padding: '0px',
    fontSize: '12px',
    width: '100%',
    minHeight: '70vh',paddingTop:'0px' }}>
    <div className='cib_vpc_forms'>
    
      <form className='formEle'>
      <h5 className="cloud_heading" style={{fontSize:'14px'}}>VPC Configuration</h5>
      <div style={{ display: "flex" }}>
      <div className="div-box-smaller" style={{ marginRight: "10px" }}>
        <InputWithLabel
            id="Project"
            text="Project Id:"
            type="text"
            value={formData.project}
            name="project"
            onChange={handleChange}
            star={true}/>
             
          </div>
          <div className="div-box-smaller" style={{ marginRight: "10px" }}>
          <InputWithLabel
            id="name"
            text="Network Name:"
            type="text"
            value={formData.name}
            name="name"
            onChange={handleChange}
            star={true}/>
           
          </div>
        </div>
        <div style={{ display: "flex" }}>
        <div className="div-box-smaller" style={{ marginRight: "10px" }}>
          <InputWithLabel
            id="description"
            text="Network Description"
            type="text"
            value={formData.description}
            name="description"
            onChange={handleChange}
            
          />
          </div>
        <div className="div-box-smaller" style={{ marginRight: "10px" }}>
        <Dropdown
                text="Routing Mode"
                name="routing_mode"
                value={formData.routing_mode}
                onChange={handleChange} star={true}>
                
                <option value="" selected >
                  Select
                </option>
                {modeArray.map((name) => (<option value={name}>{name}</option>))}
              </Dropdown>
        </div>
      </div>
        <div>
        <Button
          onClick={
            handleAddFormSubmit
          }
          style={{ marginTop: "20px", marginRight: "10px" }}
          disabled={isDisabled}
        >
          {updateIndex===-1 ? 'Add VPC' : 'Update VPC'}
        </Button>
        <ResetBtn
          onClick={
            handleReset
          }
          style={{ marginTop: "20px", marginRight: "10px" }}
        >
          {resetbuttonText}
        </ResetBtn>
      
        </div>
        
       
    </form>
    
    {/* TableData */}
    <div className='gap_between'></div>
    <VpcTable1  data={vpcData} handleUpdate={handleUpdate} handleDelete={handleDelete} handleEmpty={handleEmpty}/>
    </div>
    </div>
    
  )
}

export default VpcForm1
