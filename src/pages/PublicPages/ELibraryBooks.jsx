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
  const [ads, setAds] = useState([]);
const [selectedCategoryType, setSelectedCategoryType] = useState("all"); // "stack" or "subcategory"



  const fatchAds = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/ads/landingpage"
      );
      console.log(response.data);
      setAds(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/v1/ebooks");
      const data = response.data || [];

      setBooks(data);
      setFilteredBooks(data);

      // Extract unique tech stacks
      const uniqueTechStacks = [];
      data.forEach((book) => {
        if (
          book.techStack &&
          !uniqueTechStacks.some((t) => t._id === book.techStack._id)
        ) {
          uniqueTechStacks.push(book.techStack);
        }
      });

      setCategories(uniqueTechStacks);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
    fatchAds();
  }, []);

  useEffect(() => {
    filterBooks();
  }, [books, searchTerm, selectedCategory]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategorySelect = (id, type = "all") => {
  setSelectedCategory(id);
  setSelectedCategoryType(type);
  setSidebarOpen(false);
};

const filterBooks = () => {
  let filtered = books;

  // Text search
  if (searchTerm) {
    filtered = filtered.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Tech Stack / Subcategory filtering
  if (selectedCategory !== "all") {
    if (selectedCategoryType === "stack") {
      filtered = filtered.filter(
        (book) => book.techStack?._id === selectedCategory
      );
    } else if (selectedCategoryType === "subcategory") {
      filtered = filtered.filter(
        (book) => book.techStacksubcategory === selectedCategory
      );
    }
  }

  setFilteredBooks(filtered);
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
    navigate(`/pdfbooks/${fileUrl}`);
    // window.open(fileUrl, "_blank");
  };

  const onTestSkill = (bookId) => {
    navigate(`/testattempt/${bookId}`);
  }

  const handleCodeYourself = () => {
    navigate(`/codeeditor`);
  }

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
          <h4>Tech Stack</h4>
          <div className="elibrary__category-list">
            <button
              className={`elibrary__category-item ${
                selectedCategory === "all" ? "active" : ""
              }`}
              onClick={() => handleCategorySelect("all")}
            >
              🌐 All Books
            </button>

            {categories.map((stack) => (
              <div key={stack._id} className="elibrary__techstack-group">
                <button
                  className={`elibrary__category-item ${
                    selectedCategory === stack._id ? "active" : ""
                  }`}
                  onClick={() => handleCategorySelect(stack._id, "stack")}
                >
                  {/* <span className="elibrary__category-icon">
                    {stack.icon || "💻"}
                  </span> */}
                  {stack.name}
                </button>

                {/* Subcategories */}
                {stack.subcategories && stack.subcategories.length > 0 && (
                  <div className="elibrary__subcategory-list">
                    {stack.subcategories.map((sub) => (
                      <button
                        key={sub._id}
                        className={`elibrary__subcategory-item ${
                          selectedCategory === sub._id ? "active" : ""
                        }`}
                        onClick={() =>
                          handleCategorySelect(sub._id, "subcategory")
                        }
                      >
                        ↳ {sub.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
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
                <BookCard key={book._id} book={book} handleCodeYourself={handleCodeYourself} onRead={handleReadBook} onTestSkill={onTestSkill} />
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
            <AdCard key={ad._id} ad={ad} />
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
const BookCard = ({ book, onRead, onTestSkill, handleCodeYourself }) => {
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
        <div className="elibrary__book-title-rating-box">
          <h3 className="elibrary__book-title">{book.title}</h3>
          <span>⭐ {book.averageRating || 0}</span>
        </div>

        <div className="elibrary__book-actions">
          <button
            className="elibrary__action-btn elibrary__read-btn"
            onClick={() => onRead(book)}
          >
            View/Read
          </button>
          <button
            className="elibrary__action-btn elibrary__test-btn"
            onClick={() => onTestSkill(book._id)}
          >
            Test Skill
          </button>
          <button
            className="elibrary__action-btn elibrary__ai-btn"
            // onClick={() => onAskAI(book._id)}
          >
            Ask to AI
          </button>
          <button className="elibrary__action-btn elibrary__code-yourself" 
          onClick={handleCodeYourself}>
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
      <button
        className="elibrary__ad-cta-btn"
        onClick={() => window.open(ad.link)}
      >
        view more
      </button>
    </div>
  </div>
);

export default ELibraryBooks;
