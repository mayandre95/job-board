
const FormTextarea = ({type,name,value,handleChange,labelText,placeholder=""}) => {
    return (
      <div>
          <label htmlFor={name}>{labelText || name}</label>
          <textarea type={type} value={value} name={name} onChange={handleChange} placeholder={placeholder}/>
      </div>
    )
  }
  
  export default FormTextarea