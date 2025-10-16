// import React from 'react';
// import '../../CSSFiles/PublicPages/TechStackPage.css';

// const techStackData = [
//   {
//     category: 'Frontend',
//     technologies: ['React', 'Vue.js', 'Angular', 'HTML5', 'CSS3', 'Tailwind CSS', 'SASS']
//   },
//   {
//     category: 'Backend',
//     technologies: ['Node.js', 'Express.js', 'Django', 'Flask', 'Spring Boot', 'Laravel']
//   },
//   {
//     category: 'Database',
//     technologies: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis', 'SQLite', 'Firebase']
//   },
//   {
//     category: 'DevOps & Cloud',
//     technologies: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'Vercel', 'Netlify', 'GitHub Actions']
//   },
//   {
//     category: 'Mobile',
//     technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Java (Android)']
//   },
//   {
//     category: 'Programming Languages',
//     technologies: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'Go', 'Rust']
//   },
//   {
//     category: 'Testing',
//     technologies: ['Jest', 'Mocha', 'Chai', 'Cypress', 'Selenium', 'JUnit']
//   },
//   {
//     category: 'Tools & Others',
//     technologies: ['Git', 'Webpack', 'Babel', 'ESLint', 'Prettier', 'Figma', 'Postman']
//   }
// ];

// const TechStackPage = () => {
//   return (
//     <div className="tech-stack-container">
//       <h1 className="tech-stack-title">💻 Tech Stack</h1>
//       <p className="tech-stack-subtitle">Here are the tools and technologies we use:</p>

//       <div className="tech-stack-grid">
//         {techStackData.map((section, index) => (
//           <div key={index} className="tech-card">
//             <h2 className="tech-category">{section.category}</h2>
//             <ul className="tech-list">
//               {section.technologies.map((tech, idx) => (
//                 <li key={idx} className="tech-item">{tech}</li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TechStackPage;








// import React, { useState } from 'react';
// import '../../CSSFiles/PublicPages/TechStackPage.css';

// const TechStack = () => {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedSubCategory, setSelectedSubCategory] = useState(null);

//   const techStackData = [
//     {
//       _id: "1",
//       name: "Frontend Development",
//       icon: "💻",
//       description: "Technologies for building user interfaces and client-side applications",
//       popularityScore: 95,
//       subcategories: [
//         { name: "React.js", description: "A JavaScript library for building user interfaces" },
//         { name: "Vue.js", description: "The Progressive JavaScript Framework" },
//         { name: "Angular", description: "Platform for building mobile and desktop web applications" },
//         { name: "HTML5", description: "Markup language for structuring web content" },
//         { name: "CSS3", description: "Styling language for web presentation" }
//       ]
//     },
//     {
//       _id: "2",
//       name: "Backend Development",
//       icon: "⚙️",
//       description: "Server-side technologies and frameworks",
//       popularityScore: 88,
//       subcategories: [
//         { name: "Node.js", description: "JavaScript runtime built on Chrome's V8 engine" },
//         { name: "Express.js", description: "Minimal and flexible Node.js web application framework" },
//         { name: "Django", description: "High-level Python Web framework" },
//         { name: "Spring Boot", description: "Java-based framework for microservices" },
//         { name: "Ruby on Rails", description: "Server-side web application framework written in Ruby" }
//       ]
//     },
//     {
//       _id: "3",
//       name: "Database",
//       icon: "🗄️",
//       description: "Database management systems and technologies",
//       popularityScore: 85,
//       subcategories: [
//         { name: "MongoDB", description: "NoSQL document database" },
//         { name: "PostgreSQL", description: "Powerful, open source object-relational database" },
//         { name: "MySQL", description: "Open-source relational database management system" },
//         { name: "Redis", description: "In-memory data structure store" },
//         { name: "Elasticsearch", description: "Distributed, RESTful search and analytics engine" }
//       ]
//     },
//     {
//       _id: "4",
//       name: "Mobile Development",
//       icon: "📱",
//       description: "Technologies for building mobile applications",
//       popularityScore: 82,
//       subcategories: [
//         { name: "React Native", description: "Framework for building native apps using React" },
//         { name: "Flutter", description: "Google's UI toolkit for natively compiled applications" },
//         { name: "Swift", description: "Powerful programming language for iOS development" },
//         { name: "Kotlin", description: "Modern programming language for Android development" },
//         { name: "Ionic", description: "Cross-platform mobile app development" }
//       ]
//     },
//     {
//       _id: "5",
//       name: "DevOps & Cloud",
//       icon: "☁️",
//       description: "Cloud platforms and development operations tools",
//       popularityScore: 90,
//       subcategories: [
//         { name: "Docker", description: "Platform for developing, shipping, and running applications" },
//         { name: "Kubernetes", description: "Container orchestration system" },
//         { name: "AWS", description: "Amazon Web Services cloud platform" },
//         { name: "Azure", description: "Microsoft's cloud computing service" },
//         { name: "Terraform", description: "Infrastructure as code tool" }
//       ]
//     },
//     {
//       _id: "6",
//       name: "AI & Machine Learning",
//       icon: "🤖",
//       description: "Artificial intelligence and machine learning technologies",
//       popularityScore: 87,
//       subcategories: [
//         { name: "TensorFlow", description: "Open-source library for machine learning" },
//         { name: "PyTorch", description: "Open-source machine learning library" },
//         { name: "OpenCV", description: "Computer vision and machine learning software library" },
//         { name: "Hugging Face", description: "Platform for natural language processing" },
//         { name: "LangChain", description: "Framework for developing LLM-powered applications" }
//       ]
//     }
//   ];

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//     setSelectedSubCategory(null);
//   };

//   const handleSubCategoryClick = (subCategory) => {
//     setSelectedSubCategory(subCategory);
//   };

//   const handleBackToCategories = () => {
//     setSelectedCategory(null);
//     setSelectedSubCategory(null);
//   };

//   const handleBackToSubCategories = () => {
//     setSelectedSubCategory(null);
//   };

//   return (
//     <div className="techstack-main-wrapper">
//       {/* Hero Section */}
//       <section className="techstack-hero-section">
//         <div className="techstack-container">
//           <h1 className="techstack-hero-title">Our Technology Stack</h1>
//           <p className="techstack-hero-subtitle">
//             Explore the cutting-edge technologies and frameworks that power our solutions
//           </p>
//         </div>
//       </section>

//       {/* Main Content */}
//       <section className="techstack-content-section">
//         <div className="techstack-container">
//           {!selectedCategory ? (
//             <div className="techstack-categories-view">
//               <h2 className="techstack-section-title">Technology Categories</h2>
//               <p className="techstack-section-subtitle">
//                 Click on any category to explore its technologies and frameworks
//               </p>
//               <div className="techstack-categories-grid">
//                 {techStackData.map((category) => (
//                   <div 
//                     key={category._id}
//                     className="techstack-category-card"
//                     onClick={() => handleCategoryClick(category)}
//                   >
//                     <div className="techstack-category-icon">{category.icon}</div>
//                     <h3 className="techstack-category-name">{category.name}</h3>
//                     <p className="techstack-category-description">{category.description}</p>
//                     <div className="techstack-category-footer">
//                       <span className="techstack-popularity-badge">
//                         Popularity: {category.popularityScore}%
//                       </span>
//                       <span className="techstack-subcategories-count">
//                         {category.subcategories.length} technologies
//                       </span>
//                     </div>
//                     <div className="techstack-click-indicator">
//                       Click to explore →
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ) : !selectedSubCategory ? (
//             <div className="techstack-subcategories-view">
//               <button className="techstack-back-button" onClick={handleBackToCategories}>
//                 ← Back to Categories
//               </button>

//               <div className="techstack-category-header">
//                 <div className="techstack-category-header-icon">{selectedCategory.icon}</div>
//                 <div className="techstack-category-header-info">
//                   <h2>{selectedCategory.name}</h2>
//                   <p>{selectedCategory.description}</p>
//                   <div className="techstack-category-stats">
//                     <span className="techstack-stat">
//                       <strong>{selectedCategory.subcategories.length}</strong> Technologies
//                     </span>
//                     <span className="techstack-stat">
//                       <strong>{selectedCategory.popularityScore}%</strong> Popularity
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="techstack-subcategories-grid">
//                 {selectedCategory.subcategories.map((subCategory, index) => (
//                   <div
//                     key={index}
//                     className="techstack-subcategory-card"
//                     onClick={() => handleSubCategoryClick(subCategory)}
//                   >
//                     <div className="techstack-subcategory-content">
//                       <h4 className="techstack-subcategory-name">{subCategory.name}</h4>
//                       <p className="techstack-subcategory-description">{subCategory.description}</p>
//                     </div>
//                     <div className="techstack-subcategory-arrow">→</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <div className="techstack-subcategory-detail-view">
//               <div className="techstack-navigation-buttons">
//                 <button className="techstack-back-button" onClick={handleBackToSubCategories}>
//                   ← Back to {selectedCategory.name}
//                 </button>
//                 <button className="techstack-back-button secondary" onClick={handleBackToCategories}>
//                   ← All Categories
//                 </button>
//               </div>

//               <div className="techstack-subcategory-detail-header">
//                 <div className="techstack-subcategory-badge">
//                   <span className="techstack-category-icon-small">{selectedCategory.icon}</span>
//                   <span>{selectedCategory.name}</span>
//                 </div>
//                 <h2>{selectedSubCategory.name}</h2>
//                 <p className="techstack-subcategory-detail-description">
//                   {selectedSubCategory.description}
//                 </p>
//               </div>

//               <div className="techstack-subcategory-detail-content">
//                 <div className="techstack-detail-card">
//                   <h4>About {selectedSubCategory.name}</h4>
//                   <p>
//                     {selectedSubCategory.description} This technology is widely used in modern 
//                     development practices and offers robust features for building scalable applications.
//                   </p>
//                 </div>

//                 <div className="techstack-detail-card">
//                   <h4>Key Features</h4>
//                   <ul className="techstack-features-list">
//                     <li>High performance and scalability</li>
//                     <li>Strong community support</li>
//                     <li>Comprehensive documentation</li>
//                     <li>Regular updates and maintenance</li>
//                     <li>Extensive ecosystem and plugins</li>
//                   </ul>
//                 </div>

//                 <div className="techstack-detail-card">
//                   <h4>Use Cases</h4>
//                   <div className="techstack-use-cases-grid">
//                     <span className="techstack-use-case-tag">Web Applications</span>
//                     <span className="techstack-use-case-tag">Mobile Apps</span>
//                     <span className="techstack-use-case-tag">APIs</span>
//                     <span className="techstack-use-case-tag">Microservices</span>
//                     <span className="techstack-use-case-tag">Enterprise Solutions</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default TechStack;






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
      <section className="techstack-hero-section">
        <div className="techstack-container">
          <h1 className="techstack-hero-title">Our Technology Stack</h1>
          <p className="techstack-hero-subtitle">
            Explore the cutting-edge technologies and frameworks that power our solutions
          </p>
        </div>
      </section>

      <section className="techstack-content-section">
        <div className="techstack-container">
          <h2 className="techstack-section-title">Technology Categories</h2>
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
