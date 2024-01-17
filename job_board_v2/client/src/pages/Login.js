import { useState,useEffect } from "react"
import { Logo , FormRow , Alert} from "../component"
import Wrapper from "../assets/wrappers_v2/Login_wrapper"
import axios from "axios";





const initialState = {
  email:'',
  password :'',
  place : '',
  isMember : true,
  showAlert : false,
  isCompany : '',

};

function Login  ()  {
  const [values,setValues]= useState(initialState);

  const handleChange = (e)=>{
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(e.target)
  };

  const onSubmit = async (e)=>{
    e.preventDefault();
    console.log(e.target);
    console.log(values)
    
    axios.post('http://localhost:4000/api/v1/auth/login', values)
    .then((response) => {

    var token = response.data['token']
    localStorage.setItem('token',token)

    })
    .catch((error) => {
      // Handle any errors from the request
      console.error("Login failed : ",error);
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
        <h2>Login</h2>
        <div>
          <span>Are you a :</span>
          <button type="button" onClick={toggleCandidate}>Candidate</button>
          <span>or </span>
          <button type="button" onClick={toggleCompany}>Company</button>
        </div>
        {values.showAlert && <Alert/>}

        {values.isCompany !== "" &&(
          <div>
            <FormRow type="email" name="email" value={values.email} handleChange={handleChange} labelText="Email" />
            <FormRow type="password" name="password" value={values.password} handleChange={handleChange} labelText="Password" />
            <button type="submit">Submit</button>
          </div>
          )}
      </form>
    </Wrapper>
  )
}

export default Login
