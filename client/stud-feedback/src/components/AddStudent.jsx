import React, { useState } from 'react';
import MenuBar from './MenuBar';
import axios from 'axios';
import {
  MDBInput,
  MDBBtn,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';

export default function App({updateUser}) {
  const [formValue, setFormValue] = useState({
    name: '',
    age: '',
    grade: '',
    roll: '',
    pass: '',
    favTeachers: []
  });

  const onChange = (e) => {
    console.log("Hello");
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

    async function validateFormData()
    {
      for(const elem in formValue)
      {
        console.log(`${elem}: ${formValue[elem]}`);
        if(!formValue[elem])
        {
          alert(`${elem} cannot be empty`);
          return false;
        }
      }
      return true;
    }
  function RegStud(){
    //Logic to submit the form data to backend
    validateFormData.then(
      axios.post("http://localhost:9002/add-stud", formValue)
      .then(res => {
        if(res.data.message==="Successfully registered")
      {
        alert("Successfully Registered Student!");
      }
      else
      {
        alert(res.data.message);
      }
      })
    )
  
  }
  return (
    <div>
      <div>
        <MenuBar/>
      </div>
      <div>
        <h1 style={{color: "blue", padding: "50px"}}>Add Student to database</h1>


      </div>
      <div>
    <MDBRow tag="form" className='g-3'>
      <MDBCol md="4">
        <MDBInput
          value={formValue.name}
          name='name'
          onChange={onChange}
          id='validationCustom01'
          required
          label="Student's full name"
        />
      </MDBCol>
      <MDBCol md="4">
        <MDBInput
          value={formValue.grade}
          name='grade'
          onChange={onChange}
          id='validationCustom02'
          required
          label='Class/Grade'
        />
      </MDBCol>
      <MDBCol md="4">
        <MDBInput
          value={formValue.age}
          name='age'
          onChange={onChange}
          id='validationCustom02'
          required
          label='Age'
        />
      </MDBCol>

      <MDBCol md="6">
        <MDBInput
          value={formValue.roll}
          name='roll'
          onChange={onChange}
          id='validationCustom02'
          required
          label='Roll Number'
          placeholder='Unique field'
        />
      </MDBCol>
      <MDBCol md="6">
        <MDBInput
          value={formValue.pass}
          name='pass'
          onChange={onChange}
          id='validationCustom05'
          required
          label='Password'
        />
      </MDBCol>

      <MDBCol size="12">
        <MDBBtn type='submit' onClick={ () => RegStud()}>Add Student</MDBBtn>
      </MDBCol>
    </MDBRow>
    </div>
  </div>
  );
}