import { useState,useEffect } from "react"
import { Logo , FormRow , Alert,FormTextarea} from "../component"
import Wrapper from "../assets/wrappers_v2/Admin_wrapper"
import axios from "axios";

function Admin  ()  {
  const [addButton,setaddButton] = useState({addButton : false})
  const [role, setRole] = useState("")
  const [main_select, setMainSelect] = useState("Stat")
  const [values, setValues] = useState([]);
  const [indexValues, setindexValues] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [del, setDel] = useState([]);
  const [Upd, setUpd] = useState([]);
  
  const mainChange = (name)=> {
    setMainSelect(name)
    if (name === "Companies") {setRole(2);}
    else if (name === "Candidate") {setRole(1);}
    else {{setRole("");}}
  }

  const toggleAddButton = ()=>{
    setaddButton({addButton:!addButton.addButton})
  }
  
  const toggleDescription = (index)=>{
    setExpanded({...expanded,[index]:!expanded[index],})
  }

  const toggleDelete = (index)=>{
    setDel({...del,[index]:!del[index],})
    console.log(del)
  }

  const toggleUpdate = (index)=>{
    setUpd({...Upd,[index]:!Upd[index],})
  }

  const toggleCandidate = () => {
    setValues({ ...values, isCompany : false });
  };


  const handleChangeEdit = (e, index) => {
    const updatedValues = [...indexValues];
    updatedValues[index] = {
      ...updatedValues[index],
      [e.target.name]: e.target.indexValues
    };
    setindexValues(updatedValues);
  };
  
  const handleChange = (e)=>{
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(e.target)
  };
  
  if (main_select === "Stat"){
    axios.get('http://localhost:4000/api/v1/auth/getAllCompanies')
    .then ((response)=>{
      let companies = response.data
      let Length_companies = companies.length
      console.log(response.data)
      console.log(companies)
      console.log(Length_companies)
    })  
    .catch((error)=>{
      console.error("The error is : ", error)
    })

    axios.get('http://localhost:4000/api/v1/auth/getAllCandidate')
    .then ((response)=>{
      let candidate = response.data
      let Length_candidate = candidate.length
      console.log(response.data)
      console.log(candidate)
      console.log(Length_candidate)
    })  
    .catch((error)=>{
      console.error("The error is : ", error)
    })
    axios.get('http://localhost:4000/api/v1/auth/getAllJob')
    .then ((response)=>{
      let offer = response.data
      let Length_offer = offer.length
      console.log(response.data)
      console.log(offer)
      console.log(Length_offer)
    })  
    .catch((error)=>{
      console.error("The error is : ", error)
    })

    // axios.get('http://localhost:4000/api/v1/auth/getAllJob')
    // .then ((response)=>{
    //   let offer = response.data
    //   let Length_offer = offer.length
    //   console.log(response.data)
    //   console.log(offer)
    //   console.log(Length_offer)
    // })  
    // .catch((error)=>{
    //   console.error("The error is : ", error)
    // })

  }


  const getAllJob = () =>{
    axios.get('http://localhost:4000/api/v1/jobs/getAllJobs')
    .then((response) => {
      console.log(response.data); 
      setindexValues(response.data);
    })
    .catch((error) => {
      console.error('The error is ',error);
    });
  }
 
  const getAllUser = () =>{
    if (role === 1 ) {var url = "http://localhost:4000/api/v1/auth/getAllCompanies"}
    if (role === 2 ) {var url = "http://localhost:4000/api/v1/auth/getAllCandidate"}
    axios.get(url)
    .then((response) => {
      console.log(response.data); 
      setindexValues(response.data);
    })
    .catch((error) => {
      console.error('The error is ',error);
    });
  }
 
  
  
  const onSubmitEdit = (e,index)=>{
    e.preventDefault();

    axios.patch('http://localhost:4000/api/v1/jobs/updateJob',indexValues[index])
    .then((response) => {
      console.log(response.data); 
    })
    .catch((error) => {
      console.error('The error is ',error);
    });
    window.location.reload();
  };
  
  const onSubmit = (e)=>{
    e.preventDefault();
    console.log(e.target);
    console.log(values)
    
    axios.post('http://localhost:4000/api/v1/auth/register', {date :values, attribution : role})
    .then((response) => {
      const data = response.data
      if (response.data.message === 'Registration failed.' ){}
      if (response.data.message === "Registration succeed." ){
        if (main_select==="Companies"){ setRole(2);getAllUser();toggleAddButton()}
        if (main_select==="Candidature"){ setRole (1) ; getAllUser();toggleAddButton()}
        if (main_select==="Job_of"){ setValues([]); getAllJob();toggleAddButton()}
        // if (main_select==="Candidature"){ setValues([]); getAllCandidature()}
      }
      console.log(response.message)
    })
    .catch((error) => {
      // Handle any errors from the request
      console.error(error);
    });
  };
  
  const deleteJob = (index) => {
    console.log(values[index])
    axios.delete('http://localhost:4000/api/v1/jobs/deleteJob', {data: indexValues[index]})
    .then((response) => {
      console.log(response.data);
      const element = document.getElementById(index);
      if (element) {
        element.style.display = "none";}
    })
    .catch((error) => {
      console.error('The error is ',error);
    });
  }
  var nb_company = 25
  var nb_candidate =10
  var nb_candidature = 10
  var nb_offer = 20


  return (
    <Wrapper>
            <div className="Adminpage">
               <div className="TitleAdmin">
                <h1>Welcome to the ROOT</h1>
               </div>
               <div className="barrede">
                <FormRow type="search" name="search" value={values.search} handleChange={handleChange} labelText={<i class='bx bx-search-alt-2' ></i>} placeholder="Search..."/>
                <select onChange={handleChange} name="filterType" >
                  {(values.filterType !== "First Name" && values.filterType !== "Level of study") && (<option value={values.filterWhere}>Companies</option>)}
                  <option value={values.filterWhere}>Candidates</option>
                  <option value={values.filterWhere}>Offer</option>
                  <option value={values.filterWhere}>Candidatures</option>
                </select>
                <select onChange={handleChange} name="filterWhere">
                  <option value="Name" >Name</option>
                  <option value>First Name</option>
                  <option >Email</option>
                  <option >Localization</option>
                  <option >Siret</option>
                  <option >Title</option>
                  <option >Level of study</option>
                </select>
               </div>
            </div>
            <div className="navigation">
              <div className="nav">
                <nav>
                    <div type="button" name="Stat" onClick={()=>mainChange("Stat")}>
                    <h1>Stats</h1>
                    </div>
                    <div type="button" name="comp" onClick={()=>{mainChange("Companies"); getAllUser();}}>
                        <h1>Companies</h1>
                    </div>
                    <div name="Candidate" onClick={()=>{mainChange("Candidate"); getAllUser();}}>
                        <h1>Candidates</h1>
                    </div>
                    <div name="Job_of" onClick={()=>{mainChange("Job_of");getAllJob();}}>
                        <h1>Jobs Offers</h1>
                    </div>
                    <div name="Candidature" onClick={()=>mainChange("Candidature")}>
                        <h1>Candidature</h1>
                    </div>
                </nav>
                </div>
                {main_select === "Stat" &&(
                  <div className="Stat1">
                <div className="Stat">
                    
                        <table>
                            <tr>
                                <th>Number of Companies</th>
                                <th>Number of Candidates</th>
                                <th>Number of Offers</th>
                                <th>Number of Candidatures</th>
                            </tr>
                            <tr>
                                <td>
                                  <div>
                                    <i class='bx bxs-business'></i>
                                    <span>{nb_company}</span>
                                  </div>
                                </td>
                                <td>
                                  <div>
                                    <i class='bx bxs-briefcase-alt-2' ></i>
                                    <span>{nb_offer}</span>
                                  </div>
                                </td>
                                <td>
                                  <div>
                                    <i class='bx bx-male-female'></i>
                                    <span>{nb_candidate}</span>
                                  </div>
                                </td>
                                <td>
                                  <div>
                                    <i class='bx bx-file' ></i>
                                    <span>{nb_candidature}</span>
                                  </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                )}
                {main_select === "Companies" && ( 
                  <> <div className="form2">
                    <form className="form1" onSubmit={onSubmit}>
                      
                      <div className="question">
                      <button type="button" className='logonom' onClick={()=>toggleAddButton()}>{addButton.addButton ===true ? (<><i class='bx bx-message-square-x'></i></>) : (<><i class='bx bx-plus-medical'></i> Add a Company</>)}</button>
                      </div>
                      {values.showAlert && <Alert/>}
                      {addButton.addButton === true && (
                        <div className="inscription2">
                          <FormRow className='custom-input' type="text" name="siret" value={values.siret} handleChange={handleChange} labelText="Siret : " />
                          <FormRow className='custom-input' type="text" name="fname" value={values.fname} handleChange={handleChange} labelText="Name : " />
                          <FormRow className='custom-input' type="email" name="email" value={values.email} handleChange={handleChange} labelText="Email : " />
                          <FormRow className='custom-input' type="number" name="phone" value={values.phone} handleChange={handleChange} labelText="Phone number : " />
                          <FormRow className='custom-input' type="text" name="place" value={values.place} handleChange={handleChange} labelText="Your address : " />
                          <FormRow className='custom-input' type="password" name="password" value={values.password} handleChange={handleChange} labelText="Password : " />
                          <div className="submit2"><button   type="submit">Submit</button></div>
                        </div>
                        
                        )}
                    </form>
                    </div>
                  {indexValues.map((item, index) => ( <div className='numerocinq'>
                    <div className='numerodeux' id={index} key={index}>
                      {del[index] && (
                        <div> 
                          <Alert text="Do you want to delete" />
                          <p>
                            <button type='button' onClick={()=>deleteJob(index)}>Yes</button>
                            <button type='button' onClick={() => toggleDelete(index)}>No</button>
                          </p>
                        </div>
                      )}
                      <p>
                        {!Upd[index] ? (<button type='button' onClick={()=>toggleUpdate(index)}><i class='bx bxs-pencil' ></i></button>) : 
                        (<button type='button' onClick={()=>toggleUpdate(index)}><i class='bx bx-x' ></i></button>)}
                        
                        {!Upd[index] && <button type='button'onClick={()=>toggleDelete(index)}><i class='bx bxs-trash'></i></button>}
                      </p>
                        {!Upd[index] ? ( <>
                          <p>Company : {item.fname}</p>
                          <p>Siret : {item.siret}</p>
                          <p>Email : {item.email}</p>
                          <p>Localization : {item.place}</p>
                          <p>Phone number :{item.phone}</p>
                          </>
                        ) : (
                          <>
                            <h1>Edit Candidates</h1>
                            <form onSubmit={(e)=>onSubmitEdit(e,index)}>
                              <FormRow className='custom-input' type="text" name="siret" value={item.siret} handleChange={(e)=>handleChangeEdit(e,index)} labelText="Siret : " />
                              <FormRow className='custom-input' type="text" name="fname" value={item.fname} handleChange={(e)=>handleChangeEdit(e,index)} labelText="Name : " />
                              <FormRow className='custom-input' type="email" name="email" value={item.email} handleChange={(e)=>handleChangeEdit(e,index)} labelText="Email : " />
                              <FormRow className='custom-input' type="number" name="phone" value={item.phone} handleChange={(e)=>handleChangeEdit(e,index)} labelText="Phone number : " />
                              <FormRow className='custom-input' type="text" name="place" value={item.place} handleChange={(e)=>handleChangeEdit(e,index)} labelText="Your address : " />
                              <FormRow className='custom-input' type="password" name="password" value={item.password} handleChange={(e)=>handleChangeEdit(e,index)} labelText="Password : " />
                              <button type="submit">Submit</button>
                            </form>
                          </>
                        )}
                      </div>
                      </div>
                    ))}
                  </>
                )}
                {main_select === "Candidate" &&(
                    <>
                    
                      <form className="form" onSubmit={onSubmit}>
                        
                        <div className="question">
                        <button type="button" className='logonom' onClick={()=>toggleAddButton()}>{addButton.addButton ===true ? (<><i class='bx bx-message-square-x'></i></>) : (<><i class='bx bx-plus-medical'></i> Add a Candidate</>)}</button>
                        </div>
                        {values.showAlert && <Alert/>}
                        {addButton.addButton === true && (
                          <div className="inscription">
                            <FormRow className='custom-input' type="text" name="lname" value={values.lname} handleChange={handleChange} labelText="Last Name : "/>
                            <FormRow className='custom-input' type="text" name="fname" value={values.fname} handleChange={handleChange} labelText="Name : " />
                            <FormRow className='custom-input' type="email" name="email" value={values.email} handleChange={handleChange} labelText="Email : " />
                            <FormRow className='custom-input' type="number" name="phone" value={values.phone} handleChange={handleChange} labelText="Phone number : " />
                            <FormRow className='custom-input' type="date" name="date_of_birth" value={values.date_of_birth} handleChange={handleChange} labelText="Date_of_birth : "/>
                            <FormRow className='custom-input' type="text" name="place" value={values.place} handleChange={handleChange} labelText="Your address : " />
                            <FormRow className='custom-input' type="password" name="password" value={values.password} handleChange={handleChange} labelText="Password : " />
                            <div className="submit"><button   type="submit">Submit</button></div>
                          </div>
                          )}
                      </form>
                       
                    {indexValues.map((item, index) => (<div className='numerocinq'>
                      <div className='numerodeux' id={index} key={index}>
                        {del[index] && (
                          <div> 
                            <Alert text="Do you want to delete" />
                            <p>
                              <button type='button' onClick={()=>deleteJob(index)}>Yes</button>
                              <button type='button' onClick={() => toggleDelete(index)}>No</button>
                            </p>
                          </div>
                        )}
                        <p>
                          {!Upd[index] ? (<button type='button' onClick={()=>toggleUpdate(index)}><i class='bx bxs-pencil' ></i></button>) : 
                          (<button type='button' onClick={()=>toggleUpdate(index)}><i class='bx bx-x' ></i></button>)}
                          
                          {!Upd[index] && <button type='button'onClick={()=>toggleDelete(index)}><i class='bx bxs-trash'></i></button>}
                        </p>
                          {!Upd[index] ? ( <>
                            <p>Last Name : {item.lname}</p>
                            <p>First Name : {item.fname}</p>
                            <p>Email : {item.email}</p>
                            <p>Phone number : {item.Place}</p>
                            <p>Localization : {item.place}</p>
                            <p>Date of Birth : {item.date_of_birth}</p>
                            </>
                          ) : (
                            <>
                              <h1>Edit Company</h1>
                              <form onSubmit={(e)=>onSubmitEdit(e,index)}>
                                <FormRow className='custom-input' type="text" name="siret" value={item.siret} handleChange={(e)=>handleChangeEdit(e,index)} labelText="Siret : " />
                                <FormRow className='custom-input' type="text" name="fname" value={item.fname} handleChange={(e)=>handleChangeEdit(e,index)} labelText="Name : " />
                                <FormRow className='custom-input' type="email" name="email" value={item.email} handleChange={(e)=>handleChangeEdit(e,index)} labelText="Email : " />
                                <FormRow className='custom-input' type="number" name="phone" value={item.phone} handleChange={(e)=>handleChangeEdit(e,index)} labelText="Phone number : " />
                                <FormRow className='custom-input' type="date" name="date_of_birth" value={item.date_of_birth} handleChange={(e)=>handleChangeEdit(e,index)} labelText="Date_of_birth : "/>
                                <FormRow className='custom-input' type="text" name="place" value={item.place} handleChange={(e)=>handleChangeEdit(e,index)} labelText="Your address : " />
                                <FormRow className='custom-input' type="password" name="password" value={item.password} handleChange={(e)=>handleChangeEdit(e,index)} labelText="Password : " />
                                <button type="submit">Submit</button>
                              </form>
                            </>
                          )}
                        </div></div>
                      ))}
                    </>
                  )}
                  {main_select === "Job_of" &&(
                    <>
                      <form className="form" onSubmit={onSubmit}>
                        
                        <div className="question">
                        <button type="button" className='logonom' onClick={()=>toggleAddButton()}>{addButton.addButton ===true ? (<><i class='bx bx-message-square-x'></i></>) : (<><i class='bx bx-plus-medical'></i> Add a Offer</>)}</button>
                        </div>
                        {values.showAlert && <Alert/>}
                        {addButton.addButton === true && (
                          <div className="inscription1">
                              <FormRow type="text" name="company" value={values.company} handleChange={handleChange} labelText="Company : "></FormRow>
                              <FormRow type="text" name="title" value={values.title} handleChange={handleChange} labelText="Title of the job : "></FormRow>
                              <FormRow type="text" name="contract" value={values.contract} handleChange={handleChange} labelText="Type of contract : "></FormRow>
                              <FormRow type="text" name="place" value={values.place} handleChange={handleChange} labelText="Location of the job : "></FormRow>
                              <FormRow type="text" name="salary" value={values.salary} handleChange={handleChange} labelText="Salary for the job : "></FormRow>
                              <FormRow type="text" name="advantage" value={values.advantage} handleChange={handleChange} labelText="Advantage of the company : "></FormRow>
                            <div className="submit1"><button   type="submit">Create</button></div>
                          </div>
                          )}
                      </form>
                    {indexValues.map((item, index) => (
                      <div className="numeroquatre">
                      <div className='numerotrois' id={index} key={index}>
                        {del[index] && (
                          <div> 
                            <Alert text="Do you want to delete" />
                            <p>
                              <button type='button' onClick={()=>deleteJob(index)}>Yes</button>
                              <button type='button' onClick={() => toggleDelete(index)}>No</button>
                            </p>
                          </div>
                        )}
                        <p>
                          {!Upd[index] ? (<button type='button' onClick={()=>toggleUpdate(index)}><i class='bx bxs-pencil' ></i></button>) : 
                          (<button type='button' onClick={()=>toggleUpdate(index)}><i class='bx bx-x' ></i></button>)}
                          
                          {!Upd[index] && <button type='button'onClick={()=>toggleDelete(index)}><i class='bx bxs-trash'></i></button>}
                        </p>
                          {!Upd[index] ? ( <>
                            <p>Company : {item.company}</p>
                            <p>Title : {item.title}</p>
                            <p>Contract : {item.contract}</p>
                            <p>Localization : {item.place}</p>
                            <p> Description : {' '}
                              {expanded[index] && item.description.length ? item.description : item.description.slice(0, 100) + '...'} 
                            </p>
                              {expanded[index] && (<p>Salary : {item.salary}</p>)}
                              {expanded[index]  && (<p>Advantage : {item.advantage}</p>)}
                            <p>
                                <button onClick={() => toggleDescription(index)}>
                                  {expanded[index] ? 'Read Less' : 'Read More'}
                                </button>
                            </p> </>
                          ) : (
                            <>
                              <h1>Edit job</h1>
                              <form onSubmit={(e)=>onSubmitEdit(e,index)}>
                                <FormRow type="text" name="title" value={item.title} handleChange={(e)=>handleChange(e,index)} labelText="Title of the job"></FormRow>
                                <FormRow type="text" name="contract" value={item.contract} handleChange={(e)=>handleChange(e,index)} labelText="Type of contract"></FormRow>
                                <FormRow type="text" name="place" value={item.place} handleChange={(e)=>handleChange(e,index)} labelText="Location of the job"></FormRow>
                                <FormRow type="text" name="salary" value={item.salary} handleChange={(e)=>handleChange(e,index)} labelText="Salary for the job"></FormRow>
                                <FormRow type="text" name="advantage" value={item.advantage} handleChange={(e)=>handleChange(e,index)} labelText="Advantage of the company"></FormRow>
                                <FormTextarea name="description" value={item.description} handleChange={(e)=>handleChange(e,index)} labelText="Describe the offer"></FormTextarea>
                                <button type="submit">Submit</button>
                              </form>
                            </>
                          )}
                        </div>
                        </div>
                      ))}
                    </>
                  )}
                {main_select === "Candidature" &&(
                    <>
                    {indexValues && indexValues.length > 0 && indexValues.map((item, index) => (
                       <div className='numerodeux' id={index} key={index}>
                        {del[index] && (
                          <div> 
                            <Alert text="Do you want to delete" />
                            <p>
                              <button type='button' onClick={()=>deleteJob(index)}>Yes</button>
                              <button type='button' onClick={() => toggleDelete(index)}>No</button>
                            </p>
                          </div>
                        )}
                        <p>
                          {!Upd[index] ? (<button type='button' onClick={()=>toggleUpdate(index)}><i class='bx bxs-pencil' ></i></button>) : 
                          (<button type='button' onClick={()=>toggleUpdate(index)}><i class='bx bx-x' ></i></button>)}
                          
                          {!Upd[index] && <button type='button'onClick={()=>toggleDelete(index)}><i class='bx bxs-trash'></i></button>}
                        </p>
                          {!Upd[index] ? ( <>
                            
                            <p>Company : {item.company}</p>
                            <p>Title : {item.title}</p>
                            <p>Contract : {item.contract}</p>
                            <p>Localization : {item.place}</p>
                            <p> Description : {' '}
                            {expanded[index] && item.description.length ? item.description : item.description.slice(0, 100) + '...'}  
                            </p>
                              {expanded[index] && (<p>Salary : {item.salary}</p>)}
                              {expanded[index]  && (<p>Advantage : {item.advantage}</p>)}
                            <p>
                                <button onClick={() => toggleDescription(index)}>
                                  {expanded[index] ? 'Read Less' : 'Read More'}
                                </button>
                            </p> </>
                          ) : (
                            <>
                              <h1>Edit job</h1>
                              <form onSubmit={(e)=>onSubmitEdit(e,index)}>
                                <FormRow type="text" name="title" value={item.title} handleChange={(e)=>handleChange(e,index)} labelText="Title of the job"></FormRow>
                                <FormRow type="text" name="contract" value={item.contract} handleChange={(e)=>handleChange(e,index)} labelText="Type of contract"></FormRow>
                                <FormRow type="text" name="place" value={item.place} handleChange={(e)=>handleChange(e,index)} labelText="Location of the job"></FormRow>
                                <FormRow type="text" name="salary" value={item.salary} handleChange={(e)=>handleChange(e,index)} labelText="Salary for the job"></FormRow>
                                <FormRow type="text" name="advantage" value={item.advantage} handleChange={(e)=>handleChange(e,index)} labelText="Advantage of the company"></FormRow>
                                <FormTextarea name="description" value={item.description} handleChange={(e)=>handleChange(e,index)} labelText="Describe the offer"></FormTextarea>
                                <button type="submit">Submit</button>
                              </form>
                            </>
                          )}
                        </div>
                      ))}
                    </>
                  )}

            </div>
    </Wrapper>
  )
}

export default Admin
