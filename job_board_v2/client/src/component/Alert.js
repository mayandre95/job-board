import React from 'react'

const Alert = (props) => {
  return (
    <div className='alert alert-danger'>{props.text}</div>
  )
}

export default Alert
