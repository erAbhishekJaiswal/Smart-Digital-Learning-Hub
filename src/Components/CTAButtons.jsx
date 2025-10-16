// components/CTAButtons.js
import React from 'react';
import "../CSSFiles/PublicPages/Home.css";
const CTAButtons = () => {
  return (
    <section className="cta-section">
      <div className="cta-section__container">
        <div className="cta-section__content">
          <h2 className="cta-section__title">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="cta-section__description">
            Join thousands of students who are already transforming their careers 
            and lives with our courses.
          </p>
          <div className="cta-section__buttons">
            <button className="cta-button cta-button--primary">
              Start Learning Free
            </button>
            <button className="cta-button cta-button--secondary">
              Browse All Courses
            </button>
          </div>
          <div className="cta-section__stats">
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Happy Students</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-label">Completion Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAButtons;