import React, { useState,useEffect } from 'react'
import Wrapper from '../assets/wrappers_v2/Dashboard_wapper'
import axios from 'axios'
import {Alert , FormRow, FormTextarea} from '../component';
import { Link } from 'react-router-dom';



const Dashboard = () => {
  const [values, setValues] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [showApplyForm, setShowApplyForm] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [login, setLogin] = useState(false);

  const handleChange = (e, index) => {
    const updatedValues = [...values];
    updatedValues[index] = {
      ...updatedValues[index],
      [e.target.name]: e.target.value
    };
    setValues(updatedValues);
  };

  useEffect(() =>{
    axios.get('http://localhost:4000/api/v1/jobs/getAllJobs')
    .then((response) => {
      console.log(response.data); 
      setValues(response.data);
    })
    .catch((error) => {
      console.error('The error is ',error);
    });
  },[]);

  const onSubmit = (e,index)=>{
    e.preventDefault();
    axios.put('http://localhost:4000/api/v1/jobs/applyJob',values[index])
    .then((response) => {
      console.log(response.data); 
      const data = response.data
    })
    .catch((error) => {
      console.error('The error is ',error);
      if (error.response && error.response.status === 404) //ou 500
      {setErrorMessage("Please create an account to apply.");
      console.log ("Please creat an accont to apply ");
      setLogin(true)
      } 
      // else {window.location.reload();}
    }); 
  }

  const toggleDescription = (index)=>{
    setExpanded({...expanded,[index]:!expanded[index],})
  }

  console.log(expanded)

  const toggleApply = (index) => {
    setShowApplyForm({ ...showApplyForm, [index]: !showApplyForm[index], });
  }

  return (
    <Wrapper>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {values.map((item, index) => (
         <>
          <div class='numeroun' key={index}>
          {login ? (
            <div>
              <h1>You are not registered</h1>
              <h2>Please sign up</h2>
              <Link to="/login" ><button>Register</button></Link>
            </div>
          ): (<><p>Company : {item.company}</p>
          <p>Title : {item.title}</p>
          <p>Contract : {item.contract}</p>
          <p>Localization : {item.place}</p>
          <p> Description : {' '}
            {expanded[index] ? item.description : item.description.slice(0, 100) + '...'} 
          </p>
          {expanded[index] && (<p>Advantage : {item.advantage}</p>)}
          {expanded[index] && (<p>Salary : {item.salary}</p>)}
          <p>
              <button onClick={() => toggleDescription(index)}>
                {expanded[index] ? 'Read Less' : 'Read More'}
              </button>
              <button onClick={() => toggleApply(index)}>Apply</button>
          </p>
          {showApplyForm[index] && (
          <form onSubmit={(e)=>onSubmit(e,index)}>
            <FormRow type="text" name="fname" value={item.fname} handleChange={(e)=>handleChange(e,index)} labelText="Your first name"></FormRow>
            <FormRow type="text" name="lname" value={item.lname} handleChange={(e)=>handleChange(e,index)} labelText="Your last name"></FormRow>
            <FormRow type="text" name="email" value={item.email} handleChange={(e)=>handleChange(e,index)} labelText="Your email"></FormRow>
            <FormRow type="number" name="phone" value={item.phone} handleChange={(e)=>handleChange(e,index)} labelText="Your phone number"></FormRow>
            <FormTextarea name="message" value={item.message} handleChange={(e)=>handleChange(e,index)} labelText="Describe Type your message"></FormTextarea>
            <input type="file" id="pdfFile" accept=".pdf" />
            <input type="submit" value="Use this curriculum" />
            <input type="hidden" name="id_adv" value={item.id_adv} />
            <input type="hidden" name="id_people" value={item.id_people} />
            <button type='submit'>Submit</button>
          </form>)}
          </>)}
        </div>
       </>
      ))}
    </Wrapper>
  )
}

export default Dashboard
