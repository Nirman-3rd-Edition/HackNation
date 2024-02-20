import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; 

function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

    if (!password.match(passwordRegex)) {
      alert(
        'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*)'
      );
      setLoading(false);
      return;
    }

    try {
      const existingUserResponse = await axios.get(`http://localhost:3000/users?email=${email}`);

      if (existingUserResponse.data.length > 0) {
        alert('This email is already registered. Please use a different email.');
        setLoading(false);
        return;
      }

      const response = await axios.post('http://localhost:3000/users', {
        fullName,
        email,
        password
      });

      console.log('User signed up:', response.data);
      alert('registration successful! Please log in.');
      navigate('../login');
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
      alert('An error occurred during sign-up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Register-container">
      <div className="Register-background"></div>
      <form className="Register-form" onSubmit={handleSubmit}>
        <h2>REGISTER</h2>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={handleFullNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Registering...' : 'REGISTER'}
        </button>
      </form>
    </div>
  );
}

export default Register;
