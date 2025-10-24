// components/ResourceGrid.js
import React from 'react';

const ResourceGrid = ({ resources, onResourceClick, onStartLearning }) => {
  if (resources.length === 0) {
    return (
      <div className="resource-grid resource-grid--empty">
        <div className="empty-state">
          <div className="empty-state__icon">🔍</div>
          <h3 className="empty-state__title">No resources found</h3>
          <p className="empty-state__description">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="resource-grid">
      {resources.map(resource => (
        <div 
          key={resource.id} 
          className="resource-card"
          onClick={() => onResourceClick(resource)}
        >
          {/* Card Header */}
          <div className="resource-card__header">
            <div className="resource-card__thumbnail">
              {resource.thumbnail}
            </div>
            <div className="resource-card__badges">
              {resource.isNew && <span className="badge badge--new">NEW</span>}
              {resource.isFeatured && <span className="badge badge--featured">FEATURED</span>}
              <span className={`badge badge--${resource.type}`}>
                {resource.type === 'course' ? '🎓 COURSE' : '📚 EBOOK'}
              </span>
            </div>
          </div>

          {/* Card Body */}
          <div className="resource-card__body">
            <h3 className="resource-card__title">{resource.title}</h3>
            <p className="resource-card__author">by {resource.author}</p>
            <p className="resource-card__description">{resource.description}</p>
            
            <div className="resource-card__meta">
              <div className="meta-item">
                <span className="meta-item__icon">
                  {resource.type === 'course' ? '⏱️' : '📄'}
                </span>
                <span className="meta-item__text">
                  {resource.type === 'course' ? `${resource.lessons} lessons` : `${resource.pages} pages`}
                </span>
              </div>
              <div className="meta-item">
                <span className="meta-item__icon">🕒</span>
                <span className="meta-item__text">{resource.duration}</span>
              </div>
              <div className="meta-item">
                <span className="meta-item__icon">⭐</span>
                <span className="meta-item__text">{resource.rating}</span>
              </div>
            </div>

            <div className="resource-card__tags">
              {resource.tags.slice(0, 3).map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>

          {/* Card Footer */}
          <div className="resource-card__footer">
            <div className="resource-card__difficulty">
              <span className={`difficulty-badge difficulty-badge--${resource.difficulty.toLowerCase()}`}>
                {resource.difficulty}
              </span>
            </div>
            
            {resource.progress > 0 ? (
              <div className="resource-card__progress">
                <div className="progress-bar">
                  <div 
                    className="progress-bar__fill"
                    style={{ width: `${resource.progress}%` }}
                  ></div>
                </div>
                <span className="progress-text">{resource.progress}% complete</span>
              </div>
            ) : (
              <button 
                className="resource-card__action"
                onClick={(e) => {
                  e.stopPropagation();
                  onStartLearning(resource.id);
                }}
              >
                {resource.type === 'course' ? 'Start Course' : 'Read eBook'}
              </button>
            )}
          </div>
        </div>
      ))}
    </main>
  );
};

export default ResourceGrid;