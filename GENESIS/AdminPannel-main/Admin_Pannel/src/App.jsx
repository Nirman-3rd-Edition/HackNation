import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Components/Login/Login'
import Profile from './Components/Profile/Profile_Setup'
import { useAuth } from './Components/Context/Authcontext'
import Navbs from './Components/Navbar/Navbs'
import Active from './Components/Order/Active'

export default function App() {
  const { token,login } = useAuth();

  useEffect(() => {
    const authtoken = localStorage.getItem("auth-token");
    if (authtoken) {
      login(authtoken);
    }
  },[]);
  return (
    <>
      <BrowserRouter>
      {token!=undefined ? 
      <>
      <Navbs></Navbs>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path ="/home" element={<Active/>} />
      </Routes>
      </>
      :<Login></Login>}
      </BrowserRouter>
    </>
  )
}
