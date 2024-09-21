import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from 'react-router-dom';
import CreateTrackerForm from "../Components/CreateTrackerForm";
import FAQ from "../Components/FAQ";
import TrackerForm from "../Components/TrackerForm";
import axios from 'axios';
import Constants from "../Constants";

const HomePage = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem('name');

  const backendUrl = Constants.BACKEND_URL;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token found
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const token = localStorage.getItem('token');
      if (token) {
        await axios.post(`${backendUrl}/api/logout/`, { refresh: refreshToken });
      }
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('name');
      localStorage.removeItem('_grecaptcha');
      localStorage.removeItem('rzp_checkout_anon_id');
      localStorage.removeItem('rzp_device_id');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div>
        <h1 className="p-4 text-center">IntruderWatch</h1>
        <div className="header">
        <div className="top-right">
          {name && <span>Hi, {name}</span>}
          <Link to="/subscribe"><button className="subscribe-button">Subscribe</button></Link>
          <button onClick={handleLogout} className="logout-button" style={{marginLeft: '10px'}}>Logout</button>
        </div>
      </div>
      <Container>
        <Row xs={1} md={2}>
          <Col>
            <CreateTrackerForm />
          </Col>
          <Col>
            <TrackerForm />
          </Col>
        </Row>
        <Row>
          <FAQ />
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
