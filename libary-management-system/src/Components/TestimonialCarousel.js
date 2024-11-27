import React from "react";
import { Carousel, Typography, Avatar } from "antd";
import '../CSS/homepage.css';

import alice from '../Assets/alice.jpg';
import james from '../Assets/james.jpg';
import mark from '../Assets/mark.jpeg';
import samantha from '../Assets/samantha.jpg';



const testimonials = [
    {
      name: 'Alice Johnson',
      review: 'AML has completely transformed the way i study. The vast collection of books is amazing!',
      image: alice,
    },
    {
      name: 'Mark Smith',
      review: 'As a teacher, AML has been a lifesaver. I can always find resources for my students.',
      image: mark,
    },
    {
      name: 'Samantha Lee',
      review: 'The multimedia options make AML fun for the whole family. Highly Recommend!',
      image: samantha,
    },
    {
      name: 'James Brown',
      review: 'The Website ease of use and 24/7 availability are great for a busy professional who likes to read.',
      image: james,
    },
  ];

  const TestimonialCarousel = () => {
    return (
        <div className="testimonial-carousel-container">
            <Typography.Title level={1} className="testimonial-title">
                Hear From Our Users!
            </Typography.Title>
            <Carousel autoplay dots>
                {testimonials.map((testimonials, index) => (
                    <div key={index} className="testimonial-slide">
                        <Avatar src={testimonials.image} size={80} />
                        <Typography.Text className="testimonial-name">{testimonials.name}</Typography.Text>
                        <Typography.Paragraph className="testimonial-review">
                            "{testimonials.review}"
                        </Typography.Paragraph>
                    </div>
                ))}
            </Carousel>
        </div>
    );
  };

  export default TestimonialCarousel;