import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import './Login.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
//import {useState} from "react";

export default function Login() {

    const navigate = useNavigate();
    // const [formValues,setFormValues] = useState();


    return (
        <>
        <Header />
            <div className='logintemplate d-flex justify-content-center align-items-center mw-100 ' >
                <div className='form_container p-5 rounded'>
                    <form>
                        <div class="card">
                            <div className="card-body">
                                <h3 className='text-center'>Login Page</h3>
                                <form className='needs-validation'></form>
                                <div className=' form-group was-validated mb-2'>
                                    <label htmlFor='username' className='form-label'>User Name</label>
                                    <input type="eusername" placeholder='Enter Username' className='form-control' id='userid' requird />
                                    <div className="invalid-feedback">
                                        Please Enter your username
                                    </div>
                                </div>
                                <div className='form-group was-validated mb-2'>
                                    <label htmlFor='password' className='form-label'>Password</label>
                                    <input type="password" placeholder='Enter password' className='form-control' id="password" requird />
                                    <div className="invalid-feedback">
                                        Please Enter your password
                                    </div>
                                </div>
                                <div className='d-grid'>
                                    <Button className='btn-login' variant='outline-success' >Sign Up</Button>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                                    {/* <Link to="/signup" className='ms-2' style={{ margin: 0 }}>Sign Up</Link> */}
                                    <Button onClick={() => navigate('/Signup')} variant='outline-primary'>Sign Up</Button>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <a href="/forgot-password" style={{ marginLeft: 'auto' }}>Forgot Password?</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>


            <Footer />
        </>


    )
}

