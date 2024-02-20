import React from 'react';
import logo from './images/logo.jpeg';
import avatar from './images/avatar.png'
import './Header.css';
import { NavLink } from 'react-router-dom';

export default function Home() {
    return (
        <>
            {/* <h1>Farm Guru Project</h1> */}
            <div className="header-cont">
                <div className="img-cont">
                    <a href="#home"><img className='h-img' src={logo} alt="logo" /></a>
                </div>
                <div className="link-cont">
                    <ul>
                        <li className='nav-link'><NavLink to="/">Home</NavLink></li>
                        <li className='nav-link'><NavLink to="/Weather">Weather</NavLink></li>
                        <li className='nav-link'><NavLink to="/Community">Community</NavLink></li>
                        <li className='nav-link'><NavLink to="/Market">Market</NavLink></li>
                        <li className='nav-link'><NavLink to="/Rentals">Rentals</NavLink></li>
                        <li className='nav-link'><NavLink to="/Tutorials">Tutorilas</NavLink></li>
                        <li className='nav-link'><NavLink to="/about">About us</NavLink></li>
                        <li className="nav-link"><NavLink to="/Login"><img className="l-img" src={avatar} alt="avatar logo" /></NavLink></li>
                    </ul>
                </div>
            </div>
        </>
    )
}
