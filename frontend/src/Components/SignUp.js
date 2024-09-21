import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Constants from '../Constants';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const backendUrl = Constants.BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
          alert('Passwords do not match!');
          return;
        }
    
        try {
          const response = await axios.post(`${backendUrl}/api/signup/`, { 
            first_name: name, 
            email,
            password
          });
          localStorage.setItem('name', response.data.first_name); // Save username for later use
          navigate('/login'); // Redirect to home page after signup
        } catch (error) {
          console.error('Signup failed', error);
        }
      };

  return (
    <div className="auth-form-container">
      <div className="top-right">
          <Link to='/login'><button className="register-button">Login</button></Link>
        </div>  
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Signup</h2>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <label>Confirm Password</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
