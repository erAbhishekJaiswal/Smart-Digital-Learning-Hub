// components/ResourceModal.js
import React from 'react';

const ResourceModal = ({ resource, onClose, onStartLearning }) => {
  if (!resource) return null;

  return (
    <div className="resource-modal">
      <div className="resource-modal__overlay" onClick={onClose}></div>
      
      <div className="resource-modal__content">
        {/* Modal Header */}
        <div className="resource-modal__header">
          <div className="resource-modal__thumbnail">
            {resource.thumbnail}
          </div>
          <div className="resource-modal__header-content">
            <div className="resource-modal__badges">
              <span className={`badge badge--${resource.type}`}>
                {resource.type === 'course' ? '🎓 COURSE' : '📚 EBOOK'}
              </span>
              <span className={`difficulty-badge difficulty-badge--${resource.difficulty.toLowerCase()}`}>
                {resource.difficulty}
              </span>
              {resource.isNew && <span className="badge badge--new">NEW</span>}
              {resource.isFeatured && <span className="badge badge--featured">FEATURED</span>}
            </div>
            <h2 className="resource-modal__title">{resource.title}</h2>
            <p className="resource-modal__author">by {resource.author}</p>
            
            <div className="resource-modal__rating">
              <div className="rating-stars">
                {'★'.repeat(5).split('').map((star, index) => (
                  <span 
                    key={index}
                    className={`rating-star ${index < Math.floor(resource.rating) ? 'rating-star--active' : ''}`}
                  >
                    {star}
                  </span>
                ))}
              </div>
              <span className="rating-value">{resource.rating}</span>
              <span className="rating-count">({resource.reviews} reviews)</span>
            </div>
          </div>
          <button className="resource-modal__close" onClick={onClose}>✕</button>
        </div>

        {/* Modal Body */}
        <div className="resource-modal__body">
          <div className="resource-modal__main">
            <div className="resource-section">
              <h3 className="resource-section__title">Description</h3>
              <p className="resource-section__content">{resource.description}</p>
            </div>

            <div className="resource-section">
              <h3 className="resource-section__title">What You'll Learn</h3>
              <ul className="learning-objectives">
                {resource.tags.map((tag, index) => (
                  <li key={index} className="learning-objective">
                    <span className="learning-objective__icon">✓</span>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="resource-section">
              <h3 className="resource-section__title">Details</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-item__label">Category</span>
                  <span className="detail-item__value">{resource.category}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-item__label">Duration</span>
                  <span className="detail-item__value">{resource.duration}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-item__label">
                    {resource.type === 'course' ? 'Lessons' : 'Pages'}
                  </span>
                  <span className="detail-item__value">
                    {resource.type === 'course' ? resource.lessons : resource.pages}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-item__label">Language</span>
                  <span className="detail-item__value">English</span>
                </div>
              </div>
            </div>
          </div>

          <div className="resource-modal__sidebar">
            <div className="action-card">
              <div className="action-card__content">
                <h4 className="action-card__title">Start Learning</h4>
                <p className="action-card__description">
                  {resource.type === 'course' 
                    ? 'Begin your learning journey with this comprehensive course' 
                    : 'Dive into this eBook and expand your knowledge'
                  }
                </p>
                
                <div className="action-card__features">
                  <div className="feature-item">
                    <span className="feature-item__icon">📱</span>
                    <span className="feature-item__text">Lifetime Access</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-item__icon">📥</span>
                    <span className="feature-item__text">
                      {resource.type === 'course' ? 'Downloadable Resources' : 'Downloadable eBook'}
                    </span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-item__icon">🏆</span>
                    <span className="feature-item__text">Certificate of Completion</span>
                  </div>
                </div>

                <button 
                  className="action-card__button"
                  onClick={() => onStartLearning(resource.id)}
                >
                  {resource.type === 'course' ? 'Enroll in Course' : 'Start Reading'}
                </button>

                <div className="action-card__guarantee">
                  <span className="guarantee-text">30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceModal;