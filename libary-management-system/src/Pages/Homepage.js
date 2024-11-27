import React from 'react';
import { Carousel, Button, Flex, Splitter, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../CSS/homepage.css';

//Assets
import logo1 from '../Assets/logo1.png';
import logo2 from '../Assets/logo2.png';
import logo3 from '../Assets/logo3.png';
import slide1 from '../Assets/slide1.jpg';
import slide2 from '../Assets/slide2.jpg';
import slide3 from '../Assets/slide3.jpg';
import slide4 from '../Assets/slide4.jpg';


const blueBoxStyle = {
  height: '60vh',
  backgroundColor: '#F0F5F5',
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

const contentStyle = {
  margin: 0,
  height: '100%',
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

    {/* Carousel Container */}
    <div className='carousel-container'>
    <Carousel autoplay autoplaySpeed={3000} arrows infinite>
      <div>
        <img src={slide1} alt='Slide 1' className='carousel-image' />
      </div>
      <div>
      <img src={slide2} alt='Slide 2' className='carousel-image' />
      </div>
      <div>
      <img
        src={slide3} alt='Slide 3' className='carousel-image' />
      </div>
      <div>
      <img src={slide4} alt='Slide 4' className='carousel-image' />
      </div>
    </Carousel>

    {/* Carousel Hovering Box */}
    <div className='carousel-text-box'>
      <h2>Explore the World of knowledge</h2>
      <p>
        Discover books, movies, and games to enlighten your mind and inspire your imagination
      </p>
      <Button type='primary' onClick={handleGetStarted}>
        Lets Go!
      </Button>
    </div>
    </div>





    
      <div style={blueBoxStyle}>
        <h1 className="heading">Welcome to AML - Your Gateway to the UK's Largest Library Network</h1>
        <p>Discover a world of knowledge with the Advanced Media Library (AML), offering books, journals, multimedia, and more across England's largest library network. Whether you're in Sheffield, Manchester, or a smaller town, AML provides seamless access to resources through our in-branch services, web-mobile app, and 24/7 online systems.</p>
        <Button type="primary" onClick={handleGetStarted}>Get Started!</Button>
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
