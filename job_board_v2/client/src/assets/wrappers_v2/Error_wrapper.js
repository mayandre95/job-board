import styled from "styled-components";
import image from "../images/error-bg.png"


const Wrapper = styled.div`
background-image : url(${image});
background-size : cover;
background-position: center;
background-repeat: no-repeat;
width: 100%;
height:900px;
padding: 5rem;

.error-ele{
    display : flex;
    flex-direction : column;
    align-items :center;
    justify-content : flex-end;
}
`

export default Wrapper;