import React from 'react'
import Wrapper from '../assets/wrappers_v2/Error_wrapper'
import { Link } from 'react-router-dom'
import img from '../assets/images/Error.svg'

const Error = () => {
  return (
    <Wrapper>
      <div className="error-ele">
        <img  src={img} alt='not found'/>
        <h1>Error</h1>
        <p>The page that your are looking for doas not existe</p>
        <Link to="/">Back Home</Link>
      </div>
    </Wrapper>
    
  )
}

export default Error
