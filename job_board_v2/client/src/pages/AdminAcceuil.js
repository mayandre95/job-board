import { useState,useEffect } from "react"
import { Logo , FormRow , Alert} from "../component"
import Wrapper from "../assets/wrappers_v2/Register_wrapper"
import axios from "axios";





const initialState = {
  lname:'',
  fname:'',
  email:'',
  password :'',
  place : '',
  isMember : true,
  showAlert : false,
  isCompany : '',
};

function Admin  ()  {
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
        <div>
            <P>image ou icone racine</P>
            <h1>Welcome to the ROOT</h1>
            <P>image ou icone racine</P>
        </div>
        <div>
            <div>
                <div>
                    <h1>Companies</h1>
                </div>
                <div>
                    <h1>Jobs Offers</h1>
                </div>
                <div>
                    <h1>Candidates</h1>
                </div>
                <div>
                    <h1>Canditature</h1>
                </div>
            </div>
            
        </div>
    </Wrapper>
  )
}

export default Admin
