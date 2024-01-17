import { useState,useEffect } from "react"
import { Logo , FormRow , Alert} from "../component"
import Wrapper from "../assets/wrappers_v2/Home_wrapper"
import axios from "axios";





const initialState = {
  lname:'',
};

function Home  ()  {
  const [values,setValues]= useState(initialState);

  const handleChange = (e)=>{
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(e.target)
  };

  const onSubmit = (e)=>{
    e.preventDefault();
    console.log(e.target);
    console.log(values)
    
    axios.post('http://localhost:4000/api/v1/auth/register', values)
    .then((response) => {
      console.log(response.data); 

    })
    .catch((error) => {
      // Handle any errors from the request
      console.error(error);
    });
  };

  const toggleCandidate = () => {
    setValues({ ...values, isCompany : false });
  };

  const toggleCompany = () => {
    setValues({ ...values, isCompany :true });
  };


  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmit}>
        <Logo/>
        <h2>Register</h2>
        <div>
          <span>Are you a :</span>
          <button type="button" onClick={toggleCandidate}>Candidate</button>
          <span>or </span>
          <button type="button" onClick={toggleCompany}>Company</button>

        </div>
        {values.showAlert && <Alert/>}

        {values.isCompany ===false &&(
          <FormRow type="text" name="lname" value={values.lname} handleChange={handleChange} labelText="Last Name" />
        )}
        {values.isCompany !== "" &&(
          <div>
            <FormRow type="text" name="fname" value={values.fname} handleChange={handleChange} labelText={!values.isCompany ? "First Name" :"Name"} />
            <FormRow type="email" name="email" value={values.email} handleChange={handleChange} labelText="Email" />
            <FormRow type="password" name="password" value={values.password} handleChange={handleChange} labelText="Password" />
            <FormRow type="text" name="place" value={values.place} handleChange={handleChange} labelText="Your address" />
            <button type="submit">Submit</button>
          </div>
          )}
      </form>
    </Wrapper>
  )
}

export default Home
