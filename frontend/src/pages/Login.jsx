import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Login.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); 

  const handleLogin = async (e) => {
    e.preventDefault();

try {
    const response = await fetch("http://localhost:5002/login", { 
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, error }),
    });

     const data = await response.json();
     console.log(data); 

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        throw new Error('Login failed');
      } else {
        alert("Login successful!");
        console.log("User logged in:", data.user); 
        console.log("Token:", data.token); 
      }
    } catch (error) {
        console.error("Error:", error);
        setError("Login failed. Please check your details and try again.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2 className="form-h2">LOG IN</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            name="email" 
            placeholder="Enter your email address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            name="password" 
            placeholder="Enter your password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        <span className="last-buttons">
          <button type="submit">Log In</button>
          <p className="button-par text-white">
            Don't have an account? {""} <Link to="/signup">Sign Up</Link>
          </p>
        </span>
      </form>
    </div>
  );
};

export default LoginForm;
