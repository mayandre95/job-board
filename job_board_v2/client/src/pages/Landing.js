import styled  from 'styled-components';
import {Logo} from '../component';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Wrapper>
      <div className='Landing'>
        <nav>
            <Logo/>
        </nav>
        <div className='container_page'>
            {/*info*/}
            <div className='info'>
                <h1> Job Board App</h1>
                <p>Welcome to The Forest Job, your gateway to a world of exciting career opportunities in 
                  the environmental and forestry sectors. Our platform is dedicated to connecting passionate 
                  professionals with employers who share their commitment to preserving and sustaining our 
                  planet's invaluable natural resources. Explore our diverse range of job listings and take 
                  the first step toward a rewarding and impactful career. Join us in making a positive 
                  difference in the world.</p>
                <div className='link'>
                <Link to="/login" className='btn btn-hero'>Login</Link>
                <Link to='/register' className='btn btn-hero'>Register/Demo mode</Link>
                </div>
            </div>
        </div>
        </div>
    </Wrapper>
  )
}

const Wrapper = styled.main``

export default Landing
