import React from 'react'
import './style.css'

const Footer = () => {
  return (
    <><section className="footer">

    <div className="box-container">

        <div className="box About">
            <h3>About us</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. In praesentium veniam tenetur iusto perspiciatis. Unde debitis necessitatibus amet eaque omnis!
            </p>
        </div>

        <div className="box">
            <h3>Languages</h3>
            <a href="#">India</a>
            <a href="#">USA</a>
            <a href="#">Japan</a>
            <a href="#">France</a>
        </div>

        <div className="box">
            <h3>Quick links</h3>
            <a href="#home">Home</a>
            <a href="#Problems">Problems</a>
            <a href="#Contests">Contests</a>
            <a href="#Contact">Contact</a>
            <a href="#Sign_In">Sign_In</a>
        </div>

        <div className="box">
            <h3>Follow us</h3>
            <a href="#">facebook</a>
            <a href="#">Instagram</a>
            <a href="#">twitter</a>
            <a href="#">Linkedin</a>
        </div>

    </div>

    <h1 className="credit"> created by <span>The Catalyst</span></h1>

</section>
</>
  )
}

export default Footer