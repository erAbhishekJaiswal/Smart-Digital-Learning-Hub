import React, { useEffect } from 'react';
import '../../CSSFiles/PublicPages/Home.css';
import Header from '../../Components/PublicComp/Header';
import Footer from '../../Components/PublicComp/Footer';
import ELibraryBooks from './ELibraryBooks';
import axios from 'axios';

const BasseUrl = import.meta.env.VITE_BASE_URL
function App() {
    useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    console.log(today);
    
    const visited = sessionStorage.getItem("visitedDate");
    console.log(visited);
    
    if (visited === today) return; // already counted today
    const response = axios.post(`${BasseUrl}/visitors/count`);
    console.log(response.data);
    
    sessionStorage.setItem("visitedDate", today);
  }, []);
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