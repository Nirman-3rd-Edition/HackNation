import React, { useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { Button } from 'react-bootstrap'
import './Signup.css'

export default function Signup() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [errors, setErrors] = useState({}) /***/

  const handleSubmit = (event) => {
    event.preventDefault()
    const errors = validate();
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      alert("Account is created");
    }
  }

  const validate = () => {
    const error = {};

    if (!fullName) {
      error.name = "Full Name is required";
    } else {
      error.fullName = "";
    }

    if (!email) {
      error.email = "Email is Required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      error.email = "Email is not Matched";
    } else {
      error.email = "";
    }

    if (!username) {
      error.username = "username is required";
    }
    else if (username.length > 20) {
      error.username = "user name should be less than 20 characters";
    } else {
      errors.username = "";
    }

    if (password.length < 8) {
      error.password = "Password must be at least 8 characters long";
    } else {
      error.password = "";
    }
    return error;
  }

  return (
    <>
      <Header />
      <div className='wrapper d-flex align-items-center-center w-100'>
        <div className='form_container'>
          <h3 className='my-3'> <b>Signup</b> </h3>
          <form  onSubmit={handleSubmit}>
            <div className='form-group mb-2'>
              <label htmlFor='fullName' className='form-label'>Full Name</label>
              <input type="fullname" onChange={(e) => setFullName(e.target.value)} placeholder='Enter Your Name ' required />
              {errors.fullName && <div className='error'>{errors.fullName}</div>}
            </div>
          <div className='form-group mb-2'>
            <label htmlFor='Email' className='form-label'>Email address</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' required />
            {errors.email && <div className='error'>{errors.email}</div>}
           </div>
        
        <div className='form-group mb-2' >
          <label htmlFor='username'>Username</label>
          <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder='Enter Username' required />
          {errors.username && <div className='error'>{errors.username}</div>}
        </div>
        <div className='form-group mb-2'>
          <label htmlFor='password'>Password</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' required />
          {errors.password && <div className='error'>{errors.password}</div>}
         
        </div>
        <div  className="text-center">
          <Button variant="success">Sign up</Button>
        </div>
        
        </form>
     </div>
     </div>
    <Footer />
    </>
  )
}