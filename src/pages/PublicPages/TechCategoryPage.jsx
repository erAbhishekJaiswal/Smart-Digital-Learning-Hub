// import React from 'react';
// import { useParams, Link } from 'react-router-dom';
// // import techStackData from '../../data/techStackData';
// import '../../CSSFiles/PublicPages/TechStackPage.css';

// const TechCategoryPage = ({techStackData}) => {
//   const { categoryId } = useParams();
//   const category = techStackData.find(cat => cat._id === categoryId);

//   if (!category) return <p>Category not found.</p>;

//   return (
//     <div className="techstack-container">
//       <Link to="/techstack" className="techstack-back-button">← Back to Categories</Link>

//       <div className="techstack-category-header">
//         <div className="techstack-category-header-icon">{category.icon}</div>
//         <div className="techstack-category-header-info">
//           <h2>{category.name}</h2>
//           <p>{category.description}</p>
//         </div>
//       </div>

//       <div className="techstack-subcategories-grid">
//         {category.subcategories.map((sub, index) => (
//           <Link
//             to={`/techstack/${category._id}/${sub.name}`}
//             className="techstack-subcategory-card"
//             key={index}
//           >
//             <div className="techstack-subcategory-content">
//               <h4 className="techstack-subcategory-name">{sub.name}</h4>
//               <p className="techstack-subcategory-description">{sub.description}</p>
//             </div>
//             <div className="techstack-subcategory-arrow">→</div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TechCategoryPage;











import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../../CSSFiles/PublicPages/TechStackPage.css';

const TechCategoryPage = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/techstack/${categoryId}`);
        setCategory(response.data);
        console.log(response);
      } catch (err) {
        console.error(err);
        setError('Failed to load category.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  if (loading) return <p>Loading category...</p>;
  if (error) return <p>{error}</p>;
  if (!category) return <p>No category found.</p>;

  return (
    <div className="techstack-container">
      {/* <Link to="/techstack" className="techstack-back-button">← Back to Categories</Link> */}

      <div className="techstack-category-header">
        <div className="techstack-category-header-icon">{category.icon}</div>
        <div className="techstack-category-header-info">
          <h2>{category.name}</h2>
          <p>{category.description}</p>
        </div>
      </div>

      <div className="techstack-subcategories-grid">
        {category.subcategories.map((sub, index) => (
          <Link
            to={`/techstack/${category._id}/${sub.name}`}
            className="techstack-subcategory-card"
            key={index}
          >
            <div className="techstack-subcategory-content">
              <h4 className="techstack-subcategory-name">{sub.name}</h4>
              <p className="techstack-subcategory-description">{sub.description}</p>
            </div>
            <div className="techstack-subcategory-arrow">→</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TechCategoryPage;
