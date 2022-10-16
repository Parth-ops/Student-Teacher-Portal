import './App.css';
// import {useNavigate, Navigate, Routes, Route, Router } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { BrowserRouter , Routes, Route } from "react-router-dom";
// import MenuBar from './components/MenuBar';
import Login from './components/Login-Register';
import Landing from './components/Landing';
import AddStudent from './components/AddStudent';
import TeacherList from './components/TeacherList';

function App() {
  // const history = useNavigate();
  const [ user, setLoginUser] = useState({});

  const updateUser = (user) => {
    localStorage.setItem("User", JSON.stringify(user));
    setLoginUser(user);
  }


  useEffect(() => {
    setLoginUser(JSON.parse(localStorage.getItem("User")));
  }, [])


  // const Layout = () => (
  //   <>
  //     <MenuBar  updateUser= {updateUser} />
  //     {/* <div>
  //       <AddStudent  updateUser= { updateUser} /> 
  //     </div> */}

  //   </>
  // );

  return (
    <div className="App">
      
          {/* <MenuBar/> */}
          {/* <Login/> */}
          {/* <Landing/> */}
          {/* <AddStudent/> */}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing/>} /> 
          <Route path="/login" element={<Login updateUser={updateUser} />} />
          <Route path="/add-stud" element={user && user.accessToken ? <AddStudent  updateUser= { updateUser} /> : <Login updateUser={updateUser} />}/>    
          <Route path="/teacher-list" element={user && user.accessToken ? <TeacherList  updateUser= { updateUser} /> : <Login updateUser={updateUser} />} />
          
        </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
