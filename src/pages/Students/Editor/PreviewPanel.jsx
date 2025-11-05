// components/PreviewPanel.js
import React from 'react';
import './PreviewPanel.css';

const PreviewPanel = ({ srcDoc }) => {
  return (
    <div className="student-preview-container">
      <div className="student-preview-header">
        <h3 className="student-preview-title">
          <span className="student-preview-icon">👁️</span>
          Live Preview
        </h3>
        <div className="student-preview-actions">
          <span className="student-preview-status">Running...</span>
          <button className="student-refresh-btn">🔄</button>
        </div>
      </div>
      
      <div className="student-preview-content">
        <iframe
          srcDoc={srcDoc}
          title="preview"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
          className="student-preview-iframe"
        />
      </div>
    </div>
  );
};

export default PreviewPanel;