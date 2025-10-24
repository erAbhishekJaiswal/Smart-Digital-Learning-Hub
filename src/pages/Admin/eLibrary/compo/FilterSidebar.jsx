// components/FilterSidebar.js
import React from 'react';

const FilterSidebar = ({ filters, onFiltersChange, sortBy, onSortChange }) => {
  const categories = [
    'All Categories',
    'Programming',
    'Web Development',
    'Data Science',
    'Design',
    'Mobile Development',
    'Database',
    'DevOps'
  ];

  const difficulties = [
    'All Levels',
    'Beginner',
    'Intermediate',
    'Advanced'
  ];

  const resourceTypes = [
    'All Types',
    'course',
    'ebook'
  ];

  const ratings = [
    'All Ratings',
    '4.5',
    '4.0',
    '3.5',
    '3.0'
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'title', label: 'Title A-Z' }
  ];

  const handleFilterChange = (filterType, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [filterType]: value === 'All Categories' || value === 'All Levels' || value === 'All Types' || value === 'All Ratings' 
        ? 'all' 
        : value.toLowerCase()
    }));
  };

  return (
    <aside className="filter-sidebar">
      <div className="filter-sidebar__content">
        {/* Sort Options */}
        <div className="filter-group">
          <h3 className="filter-group__title">Sort By</h3>
          <div className="sort-options">
            {sortOptions.map(option => (
              <button
                key={option.value}
                className={`sort-option ${sortBy === option.value ? 'sort-option--active' : ''}`}
                onClick={() => onSortChange(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Resource Type */}
        <div className="filter-group">
          <h3 className="filter-group__title">Resource Type</h3>
          <div className="filter-options">
            {resourceTypes.map(type => (
              <label key={type} className="filter-option">
                <input
                  type="radio"
                  name="type"
                  value={type}
                  checked={filters.type === (type === 'All Types' ? 'all' : type.toLowerCase())}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="filter-option__input"
                />
                <span className="filter-option__checkmark"></span>
                <span className="filter-option__label">
                  {type === 'course' ? '🎓 Courses' : 
                   type === 'ebook' ? '📚 eBooks' : 
                   '📦 All Resources'}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="filter-group">
          <h3 className="filter-group__title">Categories</h3>
          <div className="filter-options">
            {categories.map(category => (
              <label key={category} className="filter-option">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={filters.category === (category === 'All Categories' ? 'all' : category.toLowerCase())}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="filter-option__input"
                />
                <span className="filter-option__checkmark"></span>
                <span className="filter-option__label">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Difficulty Level */}
        <div className="filter-group">
          <h3 className="filter-group__title">Difficulty Level</h3>
          <div className="filter-options">
            {difficulties.map(difficulty => (
              <label key={difficulty} className="filter-option">
                <input
                  type="radio"
                  name="difficulty"
                  value={difficulty}
                  checked={filters.difficulty === (difficulty === 'All Levels' ? 'all' : difficulty.toLowerCase())}
                  onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                  className="filter-option__input"
                />
                <span className="filter-option__checkmark"></span>
                <span className="filter-option__label">
                  {difficulty === 'Beginner' ? '🟢 Beginner' :
                   difficulty === 'Intermediate' ? '🟡 Intermediate' :
                   difficulty === 'Advanced' ? '🔴 Advanced' :
                   '🌈 All Levels'}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div className="filter-group">
          <h3 className="filter-group__title">Minimum Rating</h3>
          <div className="filter-options">
            {ratings.map(rating => (
              <label key={rating} className="filter-option">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={filters.rating === (rating === 'All Ratings' ? 'all' : rating)}
                  onChange={(e) => handleFilterChange('rating', e.target.value)}
                  className="filter-option__input"
                />
                <span className="filter-option__checkmark"></span>
                <span className="filter-option__label">
                  {rating === 'All Ratings' ? '⭐ All Ratings' : `⭐ ${rating}+`}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <button 
          className="clear-filters-btn"
          onClick={() => onFiltersChange({
            search: '',
            category: 'all',
            difficulty: 'all',
            type: 'all',
            rating: 'all'
          })}
        >
          🗑️ Clear All Filters
        </button>
      </div>
    </aside>
  );
};

export default FilterSidebar;