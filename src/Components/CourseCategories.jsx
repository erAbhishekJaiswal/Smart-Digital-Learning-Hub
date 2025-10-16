// components/CourseCategories.js
import React from 'react';
import "../CSSFiles/PublicPages/Home.css";
const CourseCategories = () => {
  const categories = [
    {
      id: 1,
      icon: '💻',
      title: 'Technology',
      courses: '1,200+ Courses',
      color: 'category-card--blue'
    },
    {
      id: 2,
      icon: '📊',
      title: 'Business',
      courses: '850+ Courses',
      color: 'category-card--purple'
    },
    {
      id: 3,
      icon: '🎨',
      title: 'Design',
      courses: '600+ Courses',
      color: 'category-card--pink'
    },
    {
      id: 4,
      icon: '🔬',
      title: 'Science',
      courses: '450+ Courses',
      color: 'category-card--green'
    },
    {
      id: 5,
      icon: '❤️',
      title: 'Health',
      courses: '380+ Courses',
      color: 'category-card--red'
    },
    {
      id: 6,
      icon: '🎵',
      title: 'Music',
      courses: '520+ Courses',
      color: 'category-card--orange'
    }
  ];

  return (
    <section className="course-categories">
      <div className="course-categories__container">
        <div className="course-categories__header">
          <h2 className="course-categories__title">Explore Popular Categories</h2>
          <p className="course-categories__subtitle">
            Browse through our diverse range of categories and find your passion
          </p>
        </div>
        <div className="course-categories__grid">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className={`category-card ${category.color}`}
            >
              <div className="category-card__icon">{category.icon}</div>
              <h3 className="category-card__title">{category.title}</h3>
              <p className="category-card__courses">{category.courses}</p>
              <div className="category-card__hover-effect"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseCategories;