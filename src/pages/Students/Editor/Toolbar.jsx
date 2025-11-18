// components/Toolbar.js
import React from 'react';
import './Toolbar.css';

const Toolbar = ({ activeTab, setActiveTab, runCode, resetCode, isRunning }) => {
  return (
    <div className="student-toolbar">
      <div className="student-tab-buttons">
        <button 
          className={`student-tab-btn ${activeTab === 'html' ? 'student-tab-active' : ''}`}
          onClick={() => setActiveTab('html')}
        >
          <span className="student-tab-icon">📄</span>
          HTML
        </button>
        <button 
          className={`student-tab-btn ${activeTab === 'css' ? 'student-tab-active' : ''}`}
          onClick={() => setActiveTab('css')}
        >
          <span className="student-tab-icon">🎨</span>
          CSS
        </button>
        <button 
          className={`student-tab-btn ${activeTab === 'js' ? 'student-tab-active' : ''}`}
          onClick={() => setActiveTab('js')}
        >
          <span className="student-tab-icon">⚡</span>
          JavaScript
        </button>
      </div>

      <div className="student-action-buttons">
        <button 
          className={`student-run-btn ${isRunning ? 'student-running' : ''}`}
          onClick={runCode}
          disabled={isRunning}
        >
          <span className="student-run-icon">
            {isRunning ? '⏳' : '▶️'}
          </span>
          {isRunning ? 'Running...' : 'Run Code'}
        </button>
        
        <button 
          className="student-reset-btn"
          onClick={resetCode}
        >
          <span className="student-reset-icon">🔄</span>
          Reset
        </button>

        {/* <button className="student-save-btn">
          <span className="student-save-icon">💾</span>
          Save
        </button> */}
      </div>
    </div>
  );
};

export default Toolbar;