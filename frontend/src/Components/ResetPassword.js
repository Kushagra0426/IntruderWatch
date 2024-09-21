import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Constants from '../Constants';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const backendUrl = Constants.BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/reset-password/`, { email });
      alert('Password reset email sent');
      navigate('/login');
    } catch (error) {
      console.error('Password reset error', error);
      alert('Failed to send password reset email');
    }
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Reset Password</h2>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
