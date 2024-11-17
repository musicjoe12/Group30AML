import React from 'react';
import { Carousel, Button, Flex, Splitter, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

//Assets
import logo1 from '../Assets/logo1.png';
import logo2 from '../Assets/logo2.png';
import logo3 from '../Assets/logo3.png';


const blueBoxStyle = {
  height: '50vh',
  backgroundColor: '#FFFFFF',
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
  height: '40vh',
};

const contentStyle = {
  margin: 0,
  height: '370px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const Desc = ({ title, content, imageUrl }) => (
<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <Typography.Title level={5}>
      {title}
    </Typography.Title>
    <p>{content}</p>
    <img 
      src={imageUrl} 
      alt="Image" 
      style={{ width: '35%', height: 'auto', borderRadius: '8px', margin: '20px 0' }} 
    />
  </div>
);

const Homepage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => navigate('/browse-media');

  return (
    <div style={{display: 'flex', flexDirection: 'column' }}>
      <div style={blueBoxStyle}>
        <h1 className="heading">Welcome to AML - Your Gateway to the UK's Largest Library Network</h1>
        <p>Discover a world of knowledge with the Advanced Media Library (AML), offering books, journals, multimedia, and more across England's largest library network. Whether you're in Sheffield, Manchester, or a smaller town, AML provides seamless access to resources through our in-branch services, web-mobile app, and 24/7 online systems.</p>
        <Button type="primary" onClick={handleGetStarted}>Get Started!</Button>
      </div>

      {/* Carousel Container */}
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

     
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Typography.Title level={2}>Who Do We Work For?</Typography.Title>
      </div>

      
      <Splitter
        style={{
          height: 400,
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          marginTop: '60px', 
        }}
       
      >
        <Splitter.Panel collapsible>
        <Desc 
            title="Students" 
            content="Borrow our books in order to help your studies." 
            imageUrl={logo3}
          />
        </Splitter.Panel>
        <Splitter.Panel collapsible={{ start: false }}>
        <Desc 
            title="Teachers" 
            content="Find resources to help students explore your subject at a deeper level." 
            imageUrl={logo2}
          />
        </Splitter.Panel>
        <Splitter.Panel>
        <Desc 
            title="Libarians" 
            content="Visit us to borrow books of your liking." 
            imageUrl={logo1}
          />
        </Splitter.Panel>
      </Splitter>
    </div>
  );
};

export default Homepage;
