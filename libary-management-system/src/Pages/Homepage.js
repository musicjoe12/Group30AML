import React from 'react';
import { Carousel, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const blueBoxStyle = {
  height: '50vh',
  backgroundColor: '#BBE5ED',
  color: '#000',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  boxSizing: 'border-box',
  textAlign: 'center',
  gap: '10px',
  fontSize: '24px',
};

const carouselContainerStyle = {
  height: '50vh',
};

const contentStyle = {
  margin: 0,
  height: '350px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const Homepage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => navigate('/browse-media');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={blueBoxStyle}>
        <p>Welcome to the library booking system!</p>
        <Button type="primary" onClick={handleGetStarted}>Get Started!</Button>
      </div>
      <div style={carouselContainerStyle}>
        <Carousel arrows infinite={false}>
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Homepage;
