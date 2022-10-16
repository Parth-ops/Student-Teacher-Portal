import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
  MDBRadio
}
from 'mdb-react-ui-kit';

function Login({updateUser}) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer fefege...'
  }

  const navigate = useNavigate();

  const [loginForm, setLogin] = useState({
    loginEmail: "",
    loginPass: "",
    teacherLogin: false
  });

  const [regForm, setReg] = useState({
    name: "",
    contact: "",
    regEmail: "",
    regPass: "",
    favScore: 0
  });

  async function validateEmail(mail) {
    var re = /\S+@\S+\.\S+/;
    return re.test(mail);
  }

  async function validateContact(phone){
    var re = /^[0]?[789]\d{9}$/;
    return re.test(phone);
   }


  const onChangeLogin = (e) => {
    setLogin({ ...loginForm, [e.target.name]: e.target.value });
    // console.log(e.target.name,  e.target.value)
  };

  const onChangeReg = (e) => {
    setReg({ ...regForm, [e.target.name]: e.target.value });
    // console.log(e.target.name,  e.target.value)
  };

  const [justifyActive, setJustifyActive] = useState('tab1');
  
  const handleJustifyClick = (value) => {


    if (value === justifyActive) {
     
      return;
    }

    setJustifyActive(value);
    // setLogin({...loginForm, ["register"]: !loginForm.register});
    // console.log(formValue.register);
  };


  const isTeacher = (e) => {
    if (e.target.value === 'true')
    {
    setLogin({ ...loginForm, [e.target.name]: true});
    // console.log(e.target.name,  e.target.value)
    }
    else{
      setLogin({ ...loginForm, [e.target.name]: false});
      // console.log(e.target.name,  e.target.value)
    }
  }


  const login = async () => {
    // console.log(loginForm);
 if(loginForm.loginPass && loginForm.loginEmail)
    {
    await axios.post("http://localhost:9002/login", loginForm)
    .then(res => {
        if(res.data.accessToken && res.data.isTeacher) 
        {
          
          alert(res.data.message);
          console.log(res.data.TeacherObj);
          updateUser({data:res.data.TeacherObj, accessToken: res.data.accessToken});
          navigate("/add-stud");
          
        }
        else if(res.data.accessToken && !res.data.isTeacher)
        {
          console.log(res.data.StudentObj);
          alert(res.data.message);
          updateUser({data:res.data.StudentObj, accessToken: res.data.accessToken});
          navigate("/teacher-list");
        }
        else
        {
          alert(res.data.message);
        }
       
        // history.push("/home")

        
    });
  }
  else{
      alert("Password or email/roll_no cannot be empty");
  }


}

const regt = async () => {
  if(await validateEmail(regForm.regEmail))
  {
    if(await validateContact(regForm.contact))
    {
      if(regForm.regPass){
        if(regForm.name)
        {
  await axios.post("http://localhost:9002/register", regForm)
  .then(res => {
      if(res.data.message==="Successfully registered")
      {
        alert("Successfully Registered, please login.");
      }
      else
      {
        alert("Error");
      }
      // updateUser(res.data.user)
      // history.push("/home")
      });
    }
    else{
      alert("Name cannot be empty")
    }
    }
    else{
      alert("Password cannot be empty");
    }
    }
    else{
        alert("Invalid contact number");
      }
}
else{
  alert("Invalid e-mail");
}
}

  return (
    
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            Register (Teachers)
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>

        <MDBTabsPane show={justifyActive === 'tab1'}>

          <div className="text-center mb-3">
            <p>Sign in with:</p>

          </div>

          <MDBInput 
           value={loginForm.loginEmail}
           name = "loginEmail"
           onChange={onChangeLogin}
           wrapperClass='mb-4'
           label='Roll Number (Students) / E-mail (Teachers)'
           id='form1'
           type='email'
          />
          <MDBInput 
          value={loginForm.loginPass}
          name = "loginPass"
          onChange={onChangeLogin}
          wrapperClass='mb-4' 
          label='Password' 
          id='form2' 
          type='password'/>

          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBRadio 
            name='teacherLogin' 
            value="false" 
            onChange={isTeacher}
            id='flexCheckDefault' 
            label='Student' />

            <MDBRadio 
            name='teacherLogin' 
            value="true" 
            onChange={isTeacher}
            id='flexCheckDefault' 
            label='Teacher' />
          </div>

          <MDBBtn className="mb-4 w-100" onClick={login}>Login</MDBBtn>
          {/* <p className="text-center">Not a member? <a href="#!">Register</a></p> */}

        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'tab2'}>

          <div className="text-center mb-3">
            <p>Register as a Teacher:</p>


          </div>

          <MDBInput 
          value={regForm.name}
          name = "name"
          onChange={onChangeReg}
          wrapperClass='mb-4' 
          label='Name' 
          id='form1' 
          type='text'/>

          <MDBInput 
          value={regForm.contact}
          name = "contact"
          onChange={onChangeReg}
          wrapperClass='mb-4' 
          label='Contact Number' 
          id='form1' 
          type='text'/>

          <MDBInput 
          value={regForm.regEmail}
          name = "regEmail"
          onChange={onChangeReg}
          wrapperClass='mb-4' 
          label='Email' 
          id='form1' 
          type='email'/>

          <MDBInput 
          value={regForm.regPass}
          name = "regPass"
          onChange={onChangeReg}
          wrapperClass='mb-4' 
          label='Password' 
          id='form1' 
          type='password'/>

          {/* <div className='d-flex justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
          </div> */}

          <MDBBtn className="mb-4 w-100" onClick={regt}>Sign up</MDBBtn>

        </MDBTabsPane>

      </MDBTabsContent>

    </MDBContainer>
  );
}

export default Login;