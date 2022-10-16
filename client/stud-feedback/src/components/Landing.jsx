import React from 'react';
import '../styles/Landing.css';
import { useNavigate } from "react-router";
function Landing(){
    const navigate = useNavigate();
    return (
        <div class="gfg">
        <img src={require("../assets/Landing.jpg")} height="685px" width="1390px"/>
        <h3 class="first-txt">
           <button onClick={() => navigate("/login")}> Login </button> 
        </h3>
          
        <h3 class="second-txt">
           A student-teacher portal
        </h3>
    </div>
        
    )
}
export default Landing;