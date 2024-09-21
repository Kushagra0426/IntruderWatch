import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import GoogleSignIn from './GoogleAuth';
import ReCAPTCHA from 'react-google-recaptcha';
import Constants from '../Constants';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [recaptchaToken, setRecaptchaToken] = useState(null); // State for reCAPTCHA token
    const navigate = useNavigate();

    const backendUrl = Constants.BACKEND_URL;

    const googleReCaptchaSiteKey = Constants.GOOGLE_RECAPTCHA_SITE_KEY;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if reCAPTCHA is completed
        if (!recaptchaToken) {
          alert('Please complete the reCAPTCHA');
          return;
        }

        try {
          const response = await axios.post(`${backendUrl}/api/login/`, { 
            email, 
            password ,
            recaptcha: recaptchaToken
          });
          localStorage.setItem('token', response.data.access); // Store access token
          localStorage.setItem('refreshToken', response.data.refresh);  // Store refresh token
          localStorage.setItem('name', response.data.name); // Save name for later use
          navigate('/home'); // Redirect to home page
        } catch (error) {
          console.error('Login failed', error);
        }
      };

    // Handle reCAPTCHA token change
    const onRecaptchaChange = (token) => {
      setRecaptchaToken(token); // Set the reCAPTCHA token
  };

  return (
    <div className="auth-form-container">
        <div className="top-right">
          <Link to='/register'><button className="register-button">Sign Up</button></Link>
        </div>
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <Link to="/reset-password">Forgot password?</Link>

        <ReCAPTCHA 
          sitekey={googleReCaptchaSiteKey} // Replace with your actual site key from Google reCAPTCHA
          onChange={onRecaptchaChange}
        />

        <button type="submit">Login</button>

        <div className="or-separator">OR</div>

        <GoogleSignIn />

      </form>
    </div>
  );
};

export default Login;
