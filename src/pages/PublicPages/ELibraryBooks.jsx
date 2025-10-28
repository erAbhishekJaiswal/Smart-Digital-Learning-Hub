// import React, { useState, useEffect } from 'react';
// import '../../CSSFiles/PublicPages/ELibraryBooks.css';

// const ELibraryBooks = () => {
//   const [books, setBooks] = useState([]);
// //   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [selectedLevel, setSelectedLevel] = useState('all');
//   const [categories, setCategories] = useState([
//     "HTML",
//     "CSS",
//     "JavaScript",
//     "Python",
//     "React",
//     "Node.js",
//     "Django",
//   ]);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // Sample ads data (in real app, this would come from admin)
//   const ads = [
//     {
//       id: 1,
//       title: "Premium Course Bundle",
//       description: "Get 50% off on all advanced courses",
//       image: "https://cdn.pixabay.com/photo/2017/08/20/20/13/coffee-2663019_960_720.jpg",
//       cta: "Learn More",
//       link: "#"
//     },
//     {
//       id: 2,
//       title: "AI Learning Assistant",
//       description: "Upgrade to AI-powered learning experience",
//       image: "https://cdn.pixabay.com/photo/2021/05/15/10/59/advertising-6255517_1280.jpg",
//       cta: "Try Free",
//       link: "#"
//     },
//     {
//       id: 3,
//       title: "Certification Program",
//       description: "Get certified and boost your career",
//       image: "https://cdn.pixabay.com/photo/2020/02/11/13/57/text-4839644_1280.jpg",
//       cta: "Enroll Now",
//       link: "#"
//     }
//   ];

//   const mockBooks = [
//   {
//     _id: "1",
//     title: "JavaScript for Beginners",
//     author: "John Doe",
//     cover: "https://cdn.pixabay.com/photo/2017/08/16/08/19/blogs-marketing-2646804_1280.png",
//     description: "A complete guide to learning JavaScript from scratch.",
//     pages: 320,
//     category: "Programming"
//   },
//   {
//     _id: "2",
//     title: "React in Action",
//     author: "Jane Smith",
//     cover: "https://cdn.pixabay.com/photo/2024/01/06/15/02/ai-generated-8491550_1280.jpg",
//     description: "Build modern web apps with React and hooks.",
//     pages: 280,
//     category: "Programming"
//   },
//   {
//     _id: "3",
//     title: "CSS Secrets",
//     author: "Lea Verou",
//     cover: "https://via.placeholder.com/150x220?text=CSS+Book",
//     description: "Tips and tricks for creating stunning CSS designs.",
//     pages: 220,
//     category: "Design"
//   },
//   {
//     _id: "4",
//     title: "AI for Everyone",
//     author: "Andrew Ng",
//     cover: "https://via.placeholder.com/150x220?text=AI+Book",
//     description: "Learn the basics of Artificial Intelligence and its applications.",
//     pages: 350,
//     category: "AI"
//   },
//   {
//     _id: "5",
//     title: "Data Structures & Algorithms",
//     author: "Robert Lafore",
//     cover: "https://via.placeholder.com/150x220?text=DSA+Book",
//     description: "Master DSA concepts for interviews and real-world coding.",
//     pages: 400,
//     category: "Programming"
//   }
// ];

// // Example usage
// const [filteredBooks, setFilteredBooks] = useState(mockBooks);

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   useEffect(() => {
//     filterBooks();
//   }, [books, searchTerm, selectedCategory, selectedLevel]);

//   const fetchBooks = async () => {
//     try {
//       setLoading(true);
//       // Replace with your actual API endpoint
//     //   const response = await axios.get('http://localhost:5000/api/v1/books');
//       setBooks(filteredBooks);

//       // Extract unique categories
//     //   const uniqueCategories = [...new Set(response.data.map(book => book.techStacksubcategory))];
//     //   setCategories(uniqueCategories);
//     } catch (error) {
//       console.error('Error fetching books:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterBooks = () => {
//     let filtered = books;

//     // Search filter
//     if (searchTerm) {
//       filtered = filtered.filter(book =>
//         book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         book.description?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Category filter
//     if (selectedCategory !== 'all') {
//       filtered = filtered.filter(book => book.techStacksubcategory === selectedCategory);
//     }

//     // Level filter
//     if (selectedLevel !== 'all') {
//       filtered = filtered.filter(book => book.level === selectedLevel);
//     }

//     setFilteredBooks(filtered);
//   };

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//     setSidebarOpen(false); // Close sidebar on mobile after selection
//   };

//   const handleLevelSelect = (level) => {
//     setSelectedLevel(level);
//   };

//   const handleReadBook = (bookId) => {
//     // Implement read book functionality
//     console.log('Reading book:', bookId);
//     // Navigate to book reader or open PDF
//   };

//   const handleTestSkill = (bookId) => {
//     // Implement test skill functionality
//     console.log('Testing skill for book:', bookId);
//     // Navigate to test page
//   };

//   const handleAskAI = (bookId) => {
//     // Implement AI chat functionality
//     console.log('Asking AI about book:', bookId);
//     // Open AI chat interface
//   };

//   const clearFilters = () => {
//     setSearchTerm('');
//     setSelectedCategory('all');
//     setSelectedLevel('all');
//   };

//   return (
//     <div className="elibrary__container">

//       {/* Mobile Sidebar Toggle */}
//       <button
//         className="elibrary__sidebar-toggle"
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//       >
//         ☰
//       </button>

//       {/* Left Sidebar - Categories */}
//       <div className={`elibrary__sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
//         <div className="elibrary__sidebar-header">
//           <h3>Categories</h3>
//           <button
//             className="elibrary__close-sidebar"
//             onClick={() => setSidebarOpen(false)}
//           >
//             ×
//           </button>
//         </div>

//         <div className="elibrary__category-section">
//           <h4>By Subject</h4>
//           <div className="elibrary__category-list">
//             <button
//               className={`elibrary__category-item ${selectedCategory === 'all' ? 'active' : ''}`}
//               onClick={() => handleCategorySelect('all')}
//             >
//               <span className="elibrary__category-icon">📚</span>
//               All Books
//             </button>
//             {categories.map(category => (
//               <button
//                 key={category}
//                 className={`elibrary__category-item ${selectedCategory === category ? 'active' : ''}`}
//                 onClick={() => handleCategorySelect(category)}
//               >
//                 <span className="elibrary__category-icon">📖</span>
//                 {category}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* <div className="category-section">
//           <h4>By Level</h4>
//           <div className="level-list">
//             {['all', 'Beginner', 'Intermediate', 'Advanced'].map(level => (
//               <button
//                 key={level}
//                 className={`level-item ${selectedLevel === level ? 'active' : ''}`}
//                 onClick={() => handleLevelSelect(level)}
//               >
//                 <span className={`level-dot level-${level.toLowerCase()}`}></span>
//                 {level === 'all' ? 'All Levels' : level}
//               </button>
//             ))}
//           </div>
//         </div> */}

//         <div className="elibrary__sidebar-footer">
//           <button className="elibrary__clear-filters-btn" onClick={clearFilters}>
//             🗑️ Clear Filters
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="elibrary__main-content">
//         {/* Header with Search */}
//         <header className="elibrary__header">
//           <div className="elibrary__header-content">
//             <div className="elibrary__header-text">
//               <h1>Digital Library</h1>
//               <p>Explore our collection of books and learning materials</p>
//             </div>

//             <div className="elibrary__search-section">
//               <div className="elibrary__search-container">
//                 <input
//                   type="text"
//                   placeholder="Search books by title, author, or topic..."
//                   value={searchTerm}
//                   onChange={handleSearch}
//                   className="elibrary__search-input"
//                 />
//                 <button className="elibrary__search-btn">
//                   🔍 Search
//                 </button>
//               </div>
//               <div className="elibrary__header-stats">
//                 <span>{filteredBooks.length} books available</span>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Books Grid */}
//         <main className="elibrary__books-main">
//           {loading ? (
//             <div className="elibrary__loading-container">
//               <div className="elibrary__loading-spinner"></div>
//               <p>Loading books...</p>
//             </div>
//           ) : filteredBooks.length === 0 ? (
//             <div className="elibrary__no-books">
//               <div className="elibrary__no-books-icon">📚</div>
//               <h3>No books found</h3>
//               <p>Try adjusting your search or filters</p>
//               <button className="elibrary__clear-filters-btn" onClick={clearFilters}>
//                 Clear All Filters
//               </button>
//             </div>
//           ) : (
//             <div className="elibrary__books-grid">
//               {filteredBooks.map(book => (
//                 <BookCard
//                   key={book._id}
//                   book={book}
//                   onRead={handleReadBook}
//                   onTestSkill={handleTestSkill}
//                   onAskAI={handleAskAI}
//                 />
//               ))}
//             </div>
//           )}
//         </main>
//       </div>

//       {/* Right Sidebar - Ads */}
//       <div className="elibrary__ads-sidebar">
//         <div className="elibrary__ads-header">
//           <h3>Featured</h3>
//           <span className="elibrary__ad-badge">Sponsored</span>
//         </div>

//         <div className="elibrary__ads-container">
//           {ads.map(ad => (
//             <AdCard key={ad.id} ad={ad} />
//           ))}
//         </div>

//         <div className="elibrary__ads-footer">
//           <p>Advertisement space managed by admin</p>
//         </div>
//       </div>

//       {/* Overlay for mobile sidebar */}
//       {sidebarOpen && (
//         <div
//           className="elibrary__sidebar-overlay"
//           onClick={() => setSidebarOpen(false)}
//         ></div>
//       )}
//     </div>
//   );
// };

// // Book Card Component
// const BookCard = ({ book, onRead, onTestSkill, onAskAI }) => {
//   // const getLevelColor = (level) => {
//   //   switch (level) {
//   //     case 'Beginner': return '#22c55e';
//   //     case 'Intermediate': return '#f59e0b';
//   //     case 'Advanced': return '#ef4444';
//   //     default: return '#6b7280';
//   //   }
//   // };

//   return (
//     <div className="elibrary__book-card">
//       <div className="elibrary__book-image">
//         {book.cover ? (
//           <img src={book.cover} alt={book.title} />
//         ) : (
//           <div className="elibrary__book-image-placeholder">
//             <span className="elibrary__book-emoji">📖</span>
//           </div>
//         )}
//         {/* <div className="elibrary__book-badges">
//           <span
//             className="elibrary__level-badge"
//             style={{ backgroundColor: getLevelColor(book.level) }}
//           >
//             {book.level}
//           </span>
//           {book.aiSummary && (
//             <span className="ai-badge">AI Ready</span>
//           )}
//         </div> */}
//       </div>

//       <div className="elibrary__book-content">
//         <h3 className="elibrary__book-title">{book.title}</h3>
//         {/* <p className="elibrary__book-author">by {book.author || 'Unknown Author'}</p>
//         <p className="elibrary__book-description">
//           {book.description?.substring(0, 120)}...
//         </p> */}

//         <div className="elibrary__book-meta">
//           <div className="elibrary__meta-item">
//             <span className="elibrary__meta-icon">📚</span>
//             <span>{book.techStacksubcategory}</span>
//           </div>
//           <div className="elibrary__meta-item">
//             <span className="elibrary__meta-icon">⭐</span>
//             <span>{book.averageRating || 'No ratings'}</span>
//           </div>
//           <div className="elibrary__meta-item">
//             <span className="elibrary__meta-icon">👁️</span>
//             <span>{book.viewsCount || 0} views</span>
//           </div>
//         </div>

//         <div className="elibrary__book-actions">
//           <button
//             className="elibrary__action-btn elibrary__read-btn"
//             onClick={() => onRead(book._id)}
//           >
//             View/Read
//           </button>
//           <button
//             className="elibrary__action-btn elibrary__test-btn"
//             onClick={() => onTestSkill(book._id)}
//           >
//           Test Skill
//           </button>
//           <button
//             className="elibrary__action-btn elibrary__ai-btn"
//             onClick={() => onAskAI(book._id)}
//           >
//           Ask to AI
//           </button>
//           <button className="elibrary__action-btn elibrary__code-yourself">
//           Code Yourself
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Ad Card Component
// const AdCard = ({ ad }) => {
//   return (
//     <div className="elibrary__ad-card">
//       <div className="elibrary__ad-image">
//         <img src={ad.image} alt={ad.title} />
//       </div>
//       <div className="elibrary__ad-content">
//         <h4>{ad.title}</h4>
//         <p>{ad.description}</p>
//         <button className="elibrary__ad-cta-btn">{ad.cta}</button>
//       </div>
//     </div>
//   );
// };

// export default ELibraryBooks;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../CSSFiles/PublicPages/ELibraryBooks.css";

const ELibraryBooks = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Ads data (static)
  const ads = [
    {
      id: 1,
      title: "Premium Course Bundle",
      description: "Get 50% off on all advanced courses",
      image:
        "https://cdn.pixabay.com/photo/2017/08/20/20/13/coffee-2663019_960_720.jpg",
      cta: "Learn More",
      link: "#",
    },
    {
      id: 2,
      title: "AI Learning Assistant",
      description: "Upgrade to AI-powered learning experience",
      image:
        "https://cdn.pixabay.com/photo/2021/05/15/10/59/advertising-6255517_1280.jpg",
      cta: "Try Free",
      link: "#",
    },
    {
      id: 3,
      title: "Certification Program",
      description: "Get certified and boost your career",
      image:
        "https://cdn.pixabay.com/photo/2020/02/11/13/57/text-4839644_1280.jpg",
      cta: "Enroll Now",
      link: "#",
    },
  ];

  // Fetch books from backend
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/v1/ebooks");
      const data = response.data || [];

      setBooks(data);
      setFilteredBooks(data);

      // Extract unique categories from "language" or "tags"
      const uniqueCategories = [
        "all",
        ...new Set(
          data
            .map((book) => (book.language ? book.language : "Others"))
            .filter(Boolean)
        ),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    filterBooks();
  }, [books, searchTerm, selectedCategory]);

  const filterBooks = () => {
    let filtered = books;

    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((book) => book.language === selectedCategory);
    }

    setFilteredBooks(filtered);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSidebarOpen(false);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setFilteredBooks(books);
  };

  const handleReadBook = (book) => {
    // Assuming you want to open the file (PDF or book URL)
    // const fileUrl = `http://localhost:5000/${book.filePublicId}`;

    //encodeURIComponent
    // const fileUrl = `http://localhost:5000/ebooks/download/${encodeURIComponent(book)}`;

    const fileUrl = encodeURIComponent(book.filePublicId);
    console.log(fileUrl);
    
    // navigate(`/ebooks/viewer?id=${book}`);
    navigate(`/flipbook/${fileUrl}`);
    // window.open(fileUrl, "_blank");
  };

  return (
    <div className="elibrary__container">
      {/* Mobile Sidebar Toggle */}
      <button
        className="elibrary__sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      {/* Left Sidebar */}
      <div className={`elibrary__sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="elibrary__sidebar-header">
          <h3>Categories</h3>
          <button
            className="elibrary__close-sidebar"
            onClick={() => setSidebarOpen(false)}
          >
            ×
          </button>
        </div>

        <div className="elibrary__category-section">
          <h4>By Language</h4>
          <div className="elibrary__category-list">
            {categories.map((category) => (
              <button
                key={category}
                className={`elibrary__category-item ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => handleCategorySelect(category)}
              >
                <span className="elibrary__category-icon">📖</span>
                {category === "all" ? "All Books" : category}
              </button>
            ))}
          </div>
        </div>

        <div className="elibrary__sidebar-footer">
          <button
            className="elibrary__clear-filters-btn"
            onClick={clearFilters}
          >
            🗑️ Clear Filters
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="elibrary__main-content">
        <header className="elibrary__header">
          <div className="elibrary__header-content">
            <div className="elibrary__header-text">
              <h1>Digital Library</h1>
              <p>Explore our collection of books and learning materials</p>
            </div>

            <div className="elibrary__search-section">
              <div className="elibrary__search-container">
                <input
                  type="text"
                  placeholder="Search books by title or author..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="elibrary__search-input"
                />
                <button className="elibrary__search-btn">🔍</button>
              </div>
              <div className="elibrary__header-stats">
                <span>{filteredBooks.length} books available</span>
              </div>
            </div>
          </div>
        </header>

        {/* Books Grid */}
        <main className="elibrary__books-main">
          {loading ? (
            <div className="elibrary__loading-container">
              <div className="elibrary__loading-spinner"></div>
              <p>Loading books...</p>
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="elibrary__no-books">
              <div className="elibrary__no-books-icon">📚</div>
              <h3>No books found</h3>
              <p>Try adjusting your search or filters</p>
              <button
                className="elibrary__clear-filters-btn"
                onClick={clearFilters}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="elibrary__books-grid">
              {filteredBooks.map((book) => (
                <BookCard key={book._id} book={book} onRead={handleReadBook} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Right Sidebar - Ads */}
      <div className="elibrary__ads-sidebar">
        <div className="elibrary__ads-header">
          <h3>Featured</h3>
          <span className="elibrary__ad-badge">Sponsored</span>
        </div>
        <div className="elibrary__ads-container">
          {ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="elibrary__sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

// Book Card Component
const BookCard = ({ book, onRead }) => {
  return (
    <div className="elibrary__book-card">
      <div className="elibrary__book-image">
        {book.coverImage ? (
          <img src={book.coverImage} alt={book.title} />
        ) : (
          <div className="elibrary__book-image-placeholder">
            <span className="elibrary__book-emoji">📘</span>
          </div>
        )}
      </div>

      <div className="elibrary__book-content">
        <h3 className="elibrary__book-title">{book.title}</h3>
        <p className="elibrary__book-author">by {book.author || "Unknown"}</p>
        <p className="elibrary__book-language">Language: {book.language}</p>

        <div className="elibrary__book-meta">
          <span>⭐ {book.averageRating || 0}</span>
          <span>💬 {book.totalComment || 0} comments</span>
        </div>

        {/* <div className="elibrary__book-actions">
          <button className="elibrary__action-btn elibrary__read-btn" onClick={() => onRead(book)}>
            📖 Read
          </button>
        </div> */}

        <div className="elibrary__book-actions">
          <button
            className="elibrary__action-btn elibrary__read-btn"
            onClick={() => onRead(book)}
          >
            View/Read
          </button>
          <button
            className="elibrary__action-btn elibrary__test-btn"
            // onClick={() => onTestSkill(book._id)}
          >
            Test Skill
          </button>
          <button
            className="elibrary__action-btn elibrary__ai-btn"
            // onClick={() => onAskAI(book._id)}
          >
            Ask to AI
          </button>
          <button className="elibrary__action-btn elibrary__code-yourself">
            Code Yourself
          </button>
        </div>
      </div>
    </div>
  );
};

// Ad Card Component
const AdCard = ({ ad }) => (
  <div className="elibrary__ad-card">
    <div className="elibrary__ad-image">
      <img src={ad.image} alt={ad.title} />
    </div>
    <div className="elibrary__ad-content">
      <h4>{ad.title}</h4>
      <p>{ad.description}</p>
      <button className="elibrary__ad-cta-btn">{ad.cta}</button>
    </div>
  </div>
);

export default ELibraryBooks;
