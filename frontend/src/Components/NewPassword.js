import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Constants from '../Constants';

const NewPassword = () => {
  const { uidb64, token } = useParams();  // Get UID and token from the URL
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const navigate = useNavigate();

  const backendUrl = Constants.BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/api/new-password/${uidb64}/${token}/`, {
        password
      });
      alert('Password reset successful!');
      navigate('/login');  // Redirect to login page after success
    } catch (error) {
      console.error('Password reset failed', error);
    }
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Set New Password</h2>
        <label>New Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <label>Confirm New Password</label>
        <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} required />

        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default NewPassword;
