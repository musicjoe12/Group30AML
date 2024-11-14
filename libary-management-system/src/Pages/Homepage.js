import React from 'react';
import { Carousel } from 'antd';

const contentStyle = {
    height: '800px',
    color: '#fff',
    lineHeight: '1500px',
    textAlign: 'center',
    background: '#364d79',
  };
  const Homepage = () => (
    <Carousel autoplay>
      <div>
        <h3 style={contentStyle}>1</h3>
        <h1>ss</h1>
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
  );



export default Homepage;