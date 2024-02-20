import React, { useState } from "react";
import { useRouter } from "next/router";
import "./Login.css";
import axios from "axios";

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get("http://localhost:3000/users");
      const users = response.data;

      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        alert("Login successful!");
        router.push("/home");
      } else {
        alert("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
    }

    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="login-container">
      <div className="login-background"></div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <button type="submit" className="submit-button">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Log In
        </button>
        
        <div>
          <p>
            <b style={{ color: "white" }}>Don't have an account?</b>
            <a href="/Register">Register</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
