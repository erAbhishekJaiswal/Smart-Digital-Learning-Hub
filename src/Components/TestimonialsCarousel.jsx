// components/TestimonialsCarousel.js
import React, { useState, useEffect } from 'react';
import "../CSSFiles/PublicPages/Home.css";
const TestimonialsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Web Developer',
      company: 'TechCorp',
      image: '👩‍💼',
      content: 'The courses here completely transformed my career. From beginner to professional in just 6 months!',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'UX Designer',
      company: 'DesignStudio',
      image: '👨‍🎨',
      content: 'Outstanding quality and expert instructors. The projects helped me build a strong portfolio.',
      rating: 5
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Data Scientist',
      company: 'DataInsights',
      image: '👩‍🔬',
      content: 'The practical approach to learning made all the difference. I landed my dream job thanks to these courses!',
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="testimonials-carousel">
      <div className="testimonials-carousel__container">
        <div className="testimonials-carousel__header">
          <h2 className="testimonials-carousel__title">What Our Students Say</h2>
          <p className="testimonials-carousel__subtitle">
            Don't just take our word for it - hear from our successful students
          </p>
        </div>
        
        <div className="testimonials-carousel__wrapper">
          <button 
            className="testimonials-carousel__btn testimonials-carousel__btn--prev"
            onClick={prevSlide}
          >
            ‹
          </button>
          
          <div className="testimonials-carousel__track">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`testimonial-card ${
                  index === currentSlide ? 'testimonial-card--active' : ''
                }`}
              >
                <div className="testimonial-card__content">
                  <div className="testimonial-card__quote">"</div>
                  <p className="testimonial-card__text">{testimonial.content}</p>
                  <div className="testimonial-card__rating">
                    {'★'.repeat(testimonial.rating)}
                  </div>
                </div>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">
                    {testimonial.image}
                  </div>
                  <div className="testimonial-card__info">
                    <h4 className="testimonial-card__name">{testimonial.name}</h4>
                    <p className="testimonial-card__role">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            className="testimonials-carousel__btn testimonials-carousel__btn--next"
            onClick={nextSlide}
          >
            ›
          </button>
        </div>
        
        <div className="testimonials-carousel__dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`testimonials-carousel__dot ${
                index === currentSlide ? 'testimonials-carousel__dot--active' : ''
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;