import { useState,useEffect } from "react"
import { Logo , FormRow , Alert} from "../component"
import Wrapper from "../assets/wrappers_v2/Register_wrapper"
import axios from "axios";
import { Link } from "react-router-dom";

const initialState = {
  lname:'',
  fname:'',
  email:'',
  password :'',
  phone :'',
  place : '',
  isMember : true,
  showAlert : false,
  isCompany : '',
  siret :'',
  date_of_birth :'',
  role :""
};

function Register (){
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
    setValues({ ...values, isCompany : false,role : 1});
    console.log(values['role'])
  };

  const toggleCompany = () => {
    setValues({ ...values, isCompany :true,role : 2});
    console.log(values['role'])
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmit}>
        <div className="logonom">
            <Logo/>
            <br/>
            <Link to="/Dashboard"><button className='candidate' type="button">Demo mode</button></Link>
            <br/>
            <h2 id="register" >Register</h2>
           
        </div>
        <div className="question">
          <span>Are you a : </span>
          <button className='candidate' type="button" onClick={toggleCandidate}>Candidate</button>
          <span> or </span>
          <button className='company' type="button" onClick={toggleCompany}>Company</button>
          
          
          {/* <span> ?</span> */}
        </div>
        {values.showAlert && <Alert/>}
        {values.isCompany !== "" &&(
          <div className="inscription">
            {values.isCompany ===false &&(<FormRow className='custom-input' type="text" name="lname" value={values.lname} handleChange={handleChange} labelText="Last Name : "/>)}
            {values.isCompany === true &&(<FormRow className='custom-input' type="text" name="siret" value={values.siret} handleChange={handleChange} labelText="Siret : " />)}
            <FormRow className='custom-input' type="text" name="fname" value={values.fname} handleChange={handleChange} labelText={!values.isCompany ? "First Name : " :"Name : "} />
            <FormRow className='custom-input' type="email" name="email" value={values.email} handleChange={handleChange} labelText="Email : " />
            <FormRow className='custom-input' type="number" name="phone" value={values.phone} handleChange={handleChange} labelText="Phone number : " />
            {values.isCompany ===false && (<FormRow className='custom-input' type="date" name="date_of_birth" value={values.date_of_birth} handleChange={handleChange} labelText="Date_of_birth : "/>)}
            <FormRow className='custom-input' type="text" name="place" value={values.place} handleChange={handleChange} labelText="Your address : " />
            <FormRow className='custom-input' type="password" name="password" value={values.password} handleChange={handleChange} labelText="Password : " />
            <div className="submit"><button type="submit">Submit</button></div>
          </div>
          )}
      </form>
    </Wrapper>
  )
}


export default Register
