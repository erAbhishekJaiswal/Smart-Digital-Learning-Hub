import React from 'react';
import '../../CSSFiles/PublicPages/Home.css';
import HeroBanner from '../../Components/HeroBanner';
import CourseCategories from '../../Components/CourseCategories';
import CTAButtons from '../../Components/CTAButtons';
import TestimonialsCarousel from '../../Components/TestimonialsCarousel';

function App() {
  return (
    <div className="home-page">
    <div className="home-page__container">
      <HeroBanner />
      <CourseCategories />
      <CTAButtons />
      <TestimonialsCarousel />
    </div>
    </div>
  );
}

export default App;