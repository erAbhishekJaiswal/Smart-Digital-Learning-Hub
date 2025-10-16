// import React from 'react';
// import { useParams, Link } from 'react-router-dom';
// // import techStackData from '../../data/techStackData';
// import '../../CSSFiles/PublicPages/TechStackPage.css';

// const SubCategoryPage = ({techStackData}) => {
//   const { categoryId, subcategoryName } = useParams();
//   const category = techStackData.find(cat => cat._id === categoryId);
//   const subCategory = category?.subcategories.find(sub => sub.name === subcategoryName);

//   if (!category || !subCategory) return <p>Subcategory not found.</p>;

//   return (
//     <div className="techstack-container">
//       <div className="techstack-navigation-buttons">
//         <Link to={`/techstack/${categoryId}`} className="techstack-back-button">
//           ← Back to {category.name}
//         </Link>
//         <Link to="/techstack" className="techstack-back-button secondary">
//           ← All Categories
//         </Link>
//       </div>

//       <div className="techstack-subcategory-detail-header">
//         <div className="techstack-subcategory-badge">
//           <span className="techstack-category-icon-small">{category.icon}</span>
//           <span>{category.name}</span>
//         </div>
//         <h2>{subCategory.name}</h2>
//         <p className="techstack-subcategory-detail-description">{subCategory.description}</p>
//       </div>

//       <div className="techstack-subcategory-detail-content">
//         <div className="techstack-detail-card">
//           <h4>About {subCategory.name}</h4>
//           <p>
//             {subCategory.description} This technology is widely used in modern 
//             development practices and offers robust features for building scalable applications.
//           </p>
//         </div>

//         <div className="techstack-detail-card">
//           <h4>Key Features</h4>
//           <ul className="techstack-features-list">
//             <li>High performance and scalability</li>
//             <li>Strong community support</li>
//             <li>Comprehensive documentation</li>
//             <li>Regular updates and maintenance</li>
//             <li>Extensive ecosystem and plugins</li>
//           </ul>
//         </div>

//         <div className="techstack-detail-card">
//           <h4>Use Cases</h4>
//           <div className="techstack-use-cases-grid">
//             <span className="techstack-use-case-tag">Web Applications</span>
//             <span className="techstack-use-case-tag">Mobile Apps</span>
//             <span className="techstack-use-case-tag">APIs</span>
//             <span className="techstack-use-case-tag">Microservices</span>
//             <span className="techstack-use-case-tag">Enterprise Solutions</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubCategoryPage;











import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../../CSSFiles/PublicPages/TechStackPage.css';

const TechSubCategoryPage = () => {
  const { categoryId, subcategoryName } = useParams();
  const [subcategory, setSubcategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [icon, setIcon] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubcategory = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/techstack/${categoryId}/${subcategoryName}`);
        setSubcategory(res.data.subcategory);
        setCategoryName(res.data.categoryName);
        setIcon(res.data.categoryIcon);
        console.log(res);
      } catch (err) {
        console.error(err);
        setError('Failed to load subcategory.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategory();
  }, [categoryId, subcategoryName]);

  if (loading) return <p>Loading subcategory...</p>;
  if (error) return <p>{error}</p>;
  if (!subcategory) return <p>Subcategory not found.</p>;

  return (
    <div className="techstack-container">
      <div className="techstack-navigation-buttons">
        <Link to={`/techstack/${categoryId}`} className="techstack-back-button">
          ← Back to {categoryName}
        </Link>
        <Link to="/techstack" className="techstack-back-button secondary">
          ← All Categories
        </Link>
      </div>

      <div className="techstack-subcategory-detail-header">
        <div className="techstack-subcategory-badge">
          <span className="techstack-category-icon-small">{icon}</span>
          <span>{categoryName}</span>
        </div>
        <h2>{subcategory.name}</h2>
        <p className="techstack-subcategory-detail-description">{subcategory.description}</p>
      </div>

      <div className="techstack-subcategory-detail-content">
        <div className="techstack-detail-card">
          <h4>About {subcategory.name}</h4>
          <p>{subcategory.description} This technology is widely used in modern development practices.</p>
        </div>

        <div className="techstack-detail-card">
          <h4>Key Features</h4>
          <ul className="techstack-features-list">
            <li>High performance and scalability</li>
            <li>Strong community support</li>
            <li>Comprehensive documentation</li>
            <li>Regular updates and maintenance</li>
            <li>Extensive ecosystem and plugins</li>
          </ul>
        </div>

        <div className="techstack-detail-card">
          <h4>Use Cases</h4>
          <div className="techstack-use-cases-grid">
            <span className="techstack-use-case-tag">Web Applications</span>
            <span className="techstack-use-case-tag">Mobile Apps</span>
            <span className="techstack-use-case-tag">APIs</span>
            <span className="techstack-use-case-tag">Microservices</span>
            <span className="techstack-use-case-tag">Enterprise Solutions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechSubCategoryPage;
