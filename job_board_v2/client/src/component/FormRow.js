import React from 'react'

const FormRow = ({type,name,value,handleChange,labelText,placeholder="",required =false }) => {
  return (
    <div>
        <label htmlFor={name}>{labelText || name}</label>
        <input type={type} value={value} name={name} onChange={handleChange} placeholder={placeholder} require={required}></input>
    </div>
  )
}



export default FormRow