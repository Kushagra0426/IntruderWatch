import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Constants from '../Constants';

const GoogleSignIn = () => {
  const navigate = useNavigate();

  const backendUrl = Constants.BACKEND_URL;
  const googleOAuthClientId = Constants.GOOGLE_OAUTH_CLIENT_ID;

  const handleGoogleLoginSuccess = async (response) => {
    const { credential } = response;

    try {
      const result = await axios.post(`${backendUrl}/api/auth/google/`, {
        token: credential,
      });

      if (result.status === 200) {
        // Store token and user info in local storage or state
        localStorage.setItem('token', result.data.access_token);
        localStorage.setItem('name', result.data.name);
        localStorage.setItem('refreshToken', result.data.refresh_token);
        if(localStorage.getItem('token')) {
            navigate('/home');
        }
      } else {
        console.error('Login failed:', result);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <GoogleOAuthProvider clientId={googleOAuthClientId}>
      <div className="google-signin-container">
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onFailure={(error) => console.log("Google Login Failed", error)}
          useOneTap
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleSignIn;