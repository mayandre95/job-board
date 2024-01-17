import React,{ useState, useEffect } from "react"
import Wrapper from '../assets/wrappers_v2/CreateJob_wrapper';
import {FormRow,FormTextarea} from "../component";
import axios from "axios";

const initialState = {title:'', contract:'', place:'', description :'', salary :'', advantage : '', isMember : true, showAlert : false, isCompany : '', idCompany : '1',};






function CreateJob () {
  const [values, setValues] = useState({idCompany : '1'});

  const handleChange = (e)=>{
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(e.target)
  };

  const onSubmit = (e)=>{
    e.preventDefault();
    console.log(e.target);
    console.log(values)
    
    axios.put('http://localhost:4000/api/v1/jobs/createJob', values)
    .then((response) => {
      console.log(response.data); 
      setValues({title:'', contract:'', place:'', description :'', salary :'', advantage : '', isMember : true, showAlert : false, isCompany : '', idCompany : '1',});
    })
    .catch((error) => {
      // Handle any errors from the request
      console.error(error);
    });
    
  };

  return (
    <Wrapper>
        <form className="jobcreated" onSubmit={onSubmit}>
          <div className="jobcreatedtitle">
            <h1>Job created</h1>
          </div>
            <div className="jobform">
            <FormRow type="text" name="title" value={values.title} handleChange={handleChange} labelText="Title of the job : "></FormRow>
            <FormRow type="text" name="contract" value={values.contract} handleChange={handleChange} labelText="Type of contract : "></FormRow>
            <FormRow type="text" name="place" value={values.place} handleChange={handleChange} labelText="Location of the job : "></FormRow>
            <FormRow type="text" name="salary" value={values.salary} handleChange={handleChange} labelText="Salary for the job : "></FormRow>
            <FormRow type="text" name="advantage" value={values.advantage} handleChange={handleChange} labelText="Advantage of the company : "></FormRow>
          </div>
          <div className="textarea">
          <FormTextarea value={values.description} handleChange={handleChange} name="description" labelText="Describe the offer :" placeholder={"Describe the offer"}></FormTextarea>
          </div>
          <div className="submit"><button type="submit">Submit</button></div>
        </form>
    </Wrapper>
  )
}

export default CreateJob
