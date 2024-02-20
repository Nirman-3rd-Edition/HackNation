import React from 'react';
import './About.css'; 

function About() {
  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <p>Welcome to our website! We are dedicated to providing high-quality services and products to our customers.</p>
      <h2>Our Mission</h2>
      <p>Our mission is to deliver exceptional value to our customers through innovative solutions and excellent customer service.</p>
      <h2>Our Team</h2>
      <p>Meet the team behind our success:</p>
      <ul className="team-list">
        <li>John Doe - CEO</li>
        <li>Jane Smith - CTO</li>
        <li>Michael Johnson - Head of Product Development</li>
      </ul>
      <h2>Contact Us</h2>
      <p>If you have any questions or inquiries, feel free to contact us:</p>
      <ul className="contact-info">
        <li>Email: info@example.com</li>
        <li>Phone: 123-456-7890</li>
      </ul>
    </div>
  );
}

export default About;

