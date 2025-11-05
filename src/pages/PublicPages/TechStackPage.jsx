import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../CSSFiles/PublicPages/TechStackPage.css';

const TechStackPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/techstack/');
        setCategories(response.data);
        console.log(response);
        
      } catch (err) {
        console.error(err);
        setError('Failed to load categories.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="techstack-main-wrapper">
      {/* <section className="techstack-hero-section">
        <div className="techstack-container">
          <h1 className="techstack-hero-title">Our Technology Stack</h1>
          <p className="techstack-hero-subtitle">
            Explore the cutting-edge technologies and frameworks that power our solutions
          </p>
        </div>
      </section> */}

      <section className="techstack-content-section">
        <div className="techstack-container">
          <div className="techstack-hero-header">
            <h1 className="techstack-hero-title">Technology Stacks</h1>
          </div>
          {/* <h2 className="techstack-section-title">Technology Categories</h2> */}
          <div className="techstack-categories-grid">
            {categories.map((category) => (
              <Link
                to={`/techstack/${category._id}`}
                className="techstack-category-card"
                key={category._id}
              >
                <div className="techstack-category-icon">{category.icon}</div>
                <h3 className="techstack-category-name">{category.name}</h3>
                <p className="techstack-category-description">{category.description}</p>
                <div className="techstack-category-footer">
                  <span className="techstack-popularity-badge">
                    Popularity: {category.popularityScore}%
                  </span>
                  <span className="techstack-subcategories-count">
                    {category.subcategories?.length || 0} technologies
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechStackPage;
