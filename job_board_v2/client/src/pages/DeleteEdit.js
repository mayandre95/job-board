import React, { useState,useEffect } from 'react'
import Wrapper from '../assets/wrappers_v2/DeleteEdit_wrapper'
import axios from 'axios'
import {Alert , FormRow, FormTextarea} from '../component';








const DeleteEdit = () => {
  const [values, setValues] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [del, setDel] = useState([]);
  const [Upd, setUpd] = useState([]);



  const handleChange = (e, index) => {
    const updatedValues = [...values];
    updatedValues[index] = {
      ...updatedValues[index],
      [e.target.name]: e.target.value
    };
    setValues(updatedValues);
  };

  const onSubmit = (e,index)=>{
    e.preventDefault();

    axios.patch('http://localhost:4000/api/v1/jobs/updateJob',values[index])
    .then((response) => {
      console.log(response.data); 
    })
    .catch((error) => {
      console.error('The error is ',error);
    });
    window.location.reload();
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

  const toggleDescription = (index)=>{
    setExpanded({...expanded,[index]:!expanded[index],})
  }

  const toggleDelete = (index)=>{
    setDel({...del,[index]:!del[index],})
  }
  const toggleUpdate = (index)=>{
    setUpd({...Upd,[index]:!Upd[index],})
  }

  const deleteJob = (index) => {
    console.log(values[index])
    axios.delete('http://localhost:4000/api/v1/jobs/deleteJob', {data: values[index]})
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error('The error is ',error);
    });
    window.location.reload();
  }

  // const updateJob = (index) =>{
  //   axios.patch('http://localhost:4000/api/v1/jobs/updateJob',values)
  //   .then((response) => {
  //     console.log(response.data); 
  //   })
  //   .catch((error) => {
  //     console.error('The error is ',error);
  //   });
  // }


  return (
    <Wrapper>
      {values.map((item, index) => (
        <div className='numerodeux' key={index}>
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
            (<button type='button' onClick={()=>window.location.reload()}><i class='bx bx-x' ></i></button>)}
            
            {!Upd[index] && <button type='button'onClick={()=>toggleDelete(index)}><i class='bx bxs-trash'></i></button>}
          </p>
          {!Upd[index] ? ( <>
            <p>Company : {item.company}</p>
            <p>Title : {item.title}</p>
            <p>Contract : {item.contract}</p>
            <p>Localization : {item.place}</p>
            <p> Description : {' '}
              {expanded[index] ? item.description : item.description.slice(0, 100) + '...'} 
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
              <form onSubmit={(e)=>onSubmit(e,index)}>
                <FormRow type="text" name="title" value={item.title} handleChange={(e)=>handleChange(e,index)} labelText="Title of the job"></FormRow>
                <FormRow type="text" name="contract" value={item.contract} handleChange={(e)=>handleChange(e,index)} labelText="Type of contract"></FormRow>
                <FormRow type="text" name="place" value={item.place} handleChange={(e)=>handleChange(e,index)} labelText="Location of the job"></FormRow>
                <FormRow type="text" name="salary" value={item.salary} handleChange={(e)=>handleChange(e,index)} labelText="Salary for the job"></FormRow>
                <FormRow type="text" name="advantage" value={item.advantage} handleChange={(e)=>handleChange(e,index)} labelText="Advantage of the company"></FormRow>
                <FormTextarea name="description" value={item.description} handleChange={(e)=>handleChange(e,index)} labelText="Describe the offer"></FormTextarea>
                <input type="hidden" name="id_adv" value={item.id_adv} />
                <button type="submit">Submit</button>
              </form>
            </>
          )}
        </div>
      ))}
    </Wrapper>
  )
}

export default DeleteEdit
