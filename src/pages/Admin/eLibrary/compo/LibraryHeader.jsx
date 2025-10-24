// components/LibraryHeader.js
import React from 'react';

const LibraryHeader = ({ searchQuery, onSearchChange, resultCount }) => {
  return (
    <section className="library-header">
      <div className="library-header__container">
        <div className="library-header__content">
          <h1 className="library-header__title">
            Digital <span className="library-header__highlight">eLibrary</span>
          </h1>
          <p className="library-header__subtitle">
            Explore our vast collection of courses and eBooks. Learn at your own pace with expert-curated content.
          </p>
          
          <div className="library-header__search">
            <div className="search-box">
              <span className="search-box__icon">🔍</span>
              <input
                type="text"
                placeholder="Search courses, eBooks, authors, or topics..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="search-box__input"
              />
              {searchQuery && (
                <button 
                  className="search-box__clear"
                  onClick={() => onSearchChange('')}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="library-header__stats">
            <div className="stat-badge">
              <div className="stat-badge__icon">📚</div>
              <div className="stat-badge__info">
                <div className="stat-badge__value">500+</div>
                <div className="stat-badge__label">eBooks</div>
              </div>
            </div>
            <div className="stat-badge">
              <div className="stat-badge__icon">🎓</div>
              <div className="stat-badge__info">
                <div className="stat-badge__value">300+</div>
                <div className="stat-badge__label">Courses</div>
              </div>
            </div>
            <div className="stat-badge">
              <div className="stat-badge__icon">👨‍🏫</div>
              <div className="stat-badge__info">
                <div className="stat-badge__value">50+</div>
                <div className="stat-badge__label">Experts</div>
              </div>
            </div>
          </div>
        </div>

        <div className="library-header__visual">
          <div className="floating-books">
            <div className="floating-book floating-book--1">📘</div>
            <div className="floating-book floating-book--2">📗</div>
            <div className="floating-book floating-book--3">📙</div>
            <div className="floating-book floating-book--4">📕</div>
          </div>
        </div>
      </div>

      <div className="library-header__results">
        <div className="results-info">
          <span className="results-info__count">{resultCount}</span>
          <span className="results-info__text">
            {resultCount === 1 ? 'resource found' : 'resources found'}
          </span>
        </div>
      </div>
    </section>
  );
};

export default LibraryHeader;