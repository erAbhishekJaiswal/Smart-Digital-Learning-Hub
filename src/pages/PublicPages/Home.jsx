import React from 'react';
import '../../CSSFiles/PublicPages/Home.css';
import Header from '../../Components/PublicComp/Header';
import Footer from '../../Components/PublicComp/Footer';
import ELibraryBooks from './ELibraryBooks';
function App() {
  return (
    <div className="home-page">
    {/* <div className="home-page__container">
      <HeroBanner />
      <CourseCategories />
      <CTAButtons />
      <TestimonialsCarousel />
    </div> */}
    <ELibraryBooks />
    </div>
  );
}

export default App;