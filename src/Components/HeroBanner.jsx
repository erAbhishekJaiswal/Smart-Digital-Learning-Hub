// components/HeroBanner.js
import React from 'react';
import "../CSSFiles/PublicPages/Home.css";
const HeroBanner = () => {
  return (
    <section className="hero-banner">
      <div className="hero-banner__container">
        <div className="hero-banner__content">
          <h1 className="hero-banner__title">
            Unlock Your <span className="hero-banner__highlight">Potential</span> with Expert-Led Courses
          </h1>
          <p className="hero-banner__description">
            Discover thousands of courses in tech, business, creative arts, and more. 
            Learn at your own pace with industry experts guiding your journey.
          </p>
          <div className="hero-banner__search">
            <input 
              type="text" 
              placeholder="What do you want to learn today?"
              className="hero-banner__search-input"
            />
            <button className="hero-banner__search-btn">
              Search Courses
            </button>
          </div>
        </div>
        <div className="hero-banner__visual">
          <div className="hero-banner__floating-card hero-banner__card-1">
            <div className="hero-banner__card-icon">🎓</div>
            <span>10,000+ Courses</span>
          </div>
          <div className="hero-banner__floating-card hero-banner__card-2">
            <div className="hero-banner__card-icon">👨‍🏫</div>
            <span>Expert Instructors</span>
          </div>
          <div className="hero-banner__floating-card hero-banner__card-3">
            <div className="hero-banner__card-icon">⭐</div>
            <span>4.9/5 Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;