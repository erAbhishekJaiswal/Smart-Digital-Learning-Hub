// TestAttemptsList.js
import React, { useState, useEffect } from 'react';
import './TestAttemptsList.css';
import { GetMyTests } from "../../../Api/StudentApi/SApi"
import axios from 'axios';
import { isUserLoggedIn } from "../../../utils/localstorage";
import { useNavigate } from 'react-router-dom';
const BasseUrl = import.meta.env.VITE_BASE_URL
const TestAttemptsList = () => {
  const navigate = useNavigate();
  const token = isUserLoggedIn();
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    search: ''
  });
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchAttempts();
  }, []);

  const fetchAttempts = async () => {
    setLoading(true);
    const Attemptsdata = await GetMyTests();
    console.log("Attempt data :",Attemptsdata);
    
    setAttempts(Attemptsdata);
    setLoading(false);
  };

  // Filter and sort attempts
  const filteredAttempts = attempts
    .filter(attempt => {
      const matchesStatus = filters.status === 'all' || 
        (filters.status === 'passed' && attempt.passed) ||
        (filters.status === 'failed' && !attempt.passed);
      
      const matchesSearch = filters.search === '' ||
        attempt.userId.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        attempt.testId.title.toLowerCase().includes(filters.search.toLowerCase());
      
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.attemptedAt) - new Date(a.attemptedAt);
        case 'oldest':
          return new Date(a.attemptedAt) - new Date(b.attemptedAt);
        case 'score-high':
          return b.scorePercentage - a.scorePercentage;
        case 'score-low':
          return a.scorePercentage - b.scorePercentage;
        default:
          return 0;
      }
    });

  const handleExportData = () => {
    // Simulate export functionality
    alert('Exporting attempts data...');
  };

  const handleDownloadCertificate = async (attemptId) => {
      try {
    const response = await axios.get(
      `https://learning-backend-rust.vercel.app/api/test/attempts/${attemptId}/certificate`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    // navigate(response.data.pdfUrl);
    window.open(response.data.pdfUrl, '_blank');
    // setCertificateLink(response.data.pdfUrl);
  } catch (err) {
    console.error("Certificate fetch failed:", err);
    // setCertificateLink(null);
  }
  }

  const handleDeleteAttempt = async (attemptId) => {
    if (window.confirm('Are you sure you want to delete this attempt record?')) {
      setAttempts(prev => prev.filter(attempt => attempt._id !== attemptId));
    }
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return date.toLocaleDateString();
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'var(--success)';
    if (percentage >= 60) return 'var(--warning)';
    return 'var(--danger)';
  };

  const getPerformanceLabel = (percentage) => {
    if (percentage >= 90) return 'Excellent';
    if (percentage >= 80) return 'Very Good';
    if (percentage >= 70) return 'Good';
    if (percentage >= 60) return 'Average';
    if (percentage >= 50) return 'Below Average';
    return 'Poor';
  };

  return (
    <div className="test-attempts-list">
      {/* Header Section */}
      <div className="attempts-list-header">
        <div className="attempts-list-header__content">
          <h1 className="attempts-list-header__title">
            Test Attempts <span className="attempts-list-header__count">({filteredAttempts.length})</span>
          </h1>
          <p className="attempts-list-header__subtitle">
            Monitor and analyze all test attempts with detailed performance metrics
          </p>
        </div>
        
        {/* <div className="attempts-list-header__actions">
          <button 
            className="attempts-export-btn"
            onClick={handleExportData}
          >
            <span className="attempts-export-btn__icon">📊</span>
            Export Data
          </button>
        </div> */}
      </div>

      {/* Stats Overview */}
      <div className="attempts-stats-overview">
        <div className="attempt-stat-card">
          <div className="attempt-stat-card__icon">📝</div>
          <div className="attempt-stat-card__content">
            <div className="attempt-stat-card__value">{attempts.length}</div>
            <div className="attempt-stat-card__label">Total Attempts</div>
          </div>
        </div>
        
        <div className="attempt-stat-card">
          <div className="attempt-stat-card__icon">✅</div>
          <div className="attempt-stat-card__content">
            <div className="attempt-stat-card__value">
              {attempts.filter(a => a.passed).length}
            </div>
            <div className="attempt-stat-card__label">Passed</div>
          </div>
        </div>
        
        <div className="attempt-stat-card">
          <div className="attempt-stat-card__icon">❌</div>
          <div className="attempt-stat-card__content">
            <div className="attempt-stat-card__value">
              {attempts.filter(a => !a.passed).length}
            </div>
            <div className="attempt-stat-card__label">Failed</div>
          </div>
        </div>
        
        <div className="attempt-stat-card">
          <div className="attempt-stat-card__icon">📈</div>
          <div className="attempt-stat-card__content">
            <div className="attempt-stat-card__value">
              {attempts.length > 0 
                ? Math.round(attempts.reduce((sum, a) => sum + a.scorePercentage, 0) / attempts.length)
                : 0
              }%
            </div>
            <div className="attempt-stat-card__label">Avg. Score</div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="attempts-controls">
        <div className="attempts-controls__left">
          <div className="search-box">
            <span className="search-box__icon">🔍</span>
            <input
              type="text"
              placeholder="Search by user or test name..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="search-box__input"
            />
          </div>
        </div>
        
        <div className="attempts-controls__right">
          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="passed">Passed Only</option>
            <option value="failed">Failed Only</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="score-high">Highest Score</option>
            <option value="score-low">Lowest Score</option>
          </select>
        </div>
      </div>

      {/* Attempts List */}
      <div className="attempts-list-container">
        {loading ? (
          <div className="attempts-loading">
            <div className="attempts-loading__spinner"></div>
            <p>Loading test attempts...</p>
          </div>
        ) : (
          <div className="attempts-list">
            {filteredAttempts?.map((attempt) => (
              <div key={attempt._id} className="attempt-card">
                {/* Card Header */}
                <div className="attempt-card__header">
                  <div className="attempt-card__user">
                    {/* <div className="attempt-card__avatar">
                      {attempt?.user?.profileImage}
                    </div> */}
                    <div className="attempt-card__user-info">
                      <h3 className="attempt-card__username">{attempt.userId?.name}</h3>
                      <p className="attempt-card__user-email">{attempt.userId?.email}</p>
                    </div>
                  </div>
                  
                  <div className="attempt-card__status">
                    <div className={`status-badge ${attempt?.passed ? 'status-badge--passed' : 'status-badge--failed'}`}>
                      <span className="status-badge__icon">
                        {attempt?.passed ? '✅' : '❌'}
                      </span>
                      <span className="status-badge__text">
                        {attempt?.passed ? 'PASSED' : 'FAILED'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Test Info */}
                <div className="attempt-card__test-info">
                  <h4 className="attempt-card__test-title">{attempt.test?.title}</h4>
                  <div className="attempt-card__test-meta">
                    <span className="test-meta-item">{attempt.test?.subcategory}</span>
                    <span className="test-meta-separator">•</span>
                    <span className="test-meta-item">{attempt.test?.difficulty}</span>
                    <span className="test-meta-separator">•</span>
                    <span className="test-meta-item">{attempt?.totalQuestions} questions</span>
                  </div>
                </div>

                {/* Score and Performance */}
                <div className="attempt-card__performance">
                  <div className="performance-score">
                    <div 
                      className="performance-score__circle"
                      style={{ 
                        '--percentage': `${attempt.scorePercentage}%`,
                        '--score-color': getScoreColor(attempt.scorePercentage)
                      }}
                    >
                      <div className="performance-score__value">
                        {Math.round(attempt.scorePercentage)}%
                      </div>
                    </div>
                    
                    <div className="performance-score__info">
                      <div className="performance-score__label">
                        {getPerformanceLabel(attempt.scorePercentage)}
                      </div>
                      <div className="performance-score__details">
                        {attempt.correct}/{attempt.totalQuestions} correct
                      </div>
                    </div>
                  </div>
                  
                  <div className="performance-breakdown">
                    <div className="performance-metric performance-metric--correct">
                      <span className="performance-metric__value">{attempt.correct}</span>
                      <span className="performance-metric__label">Correct</span>
                    </div>
                    
                    <div className="performance-metric performance-metric--wrong">
                      <span className="performance-metric__value">{attempt.wrong}</span>
                      <span className="performance-metric__label">Wrong</span>
                    </div>
                    
                    <div className="performance-metric performance-metric--accuracy">
                      <span className="performance-metric__value">
                        {Math.round((attempt.correct / attempt.totalQuestions) * 100)}%
                      </span>
                      <span className="performance-metric__label">Accuracy</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="attempt-card__progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-bar__fill progress-bar__fill--correct"
                      style={{ width: `${(attempt.correct / attempt.totalQuestions) * 100}%` }}
                    ></div>
                    <div 
                      className="progress-bar__fill progress-bar__fill--wrong"
                      style={{ width: `${(attempt.wrong / attempt.totalQuestions) * 100}%` }}
                    ></div>
                  </div>
                  <div className="progress-bar__labels">
                    <span className="progress-bar__label progress-bar__label--correct">
                      Correct: {attempt.correct}
                    </span>
                    <span className="progress-bar__label progress-bar__label--wrong">
                      Wrong: {attempt.wrong}
                    </span>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="attempt-card__footer">
                  <div className="attempt-card__meta">
                    <div className="attempt-meta">
                      <span className="attempt-meta__icon">🕒</span>
                      <span className="attempt-meta__text">
                        {getTimeAgo(attempt.attemptedAt)}
                      </span>
                    </div>
                    
                    {attempt.certificateUrl && (
                      <div className="attempt-meta">
                        <span className="attempt-meta__icon">🏆</span>
                        <span className="attempt-meta__text">Certificate Issued</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="attempt-card__actions">
                    {attempt.certificateUrl && (
                      <button
                        onClick={() => handleDownloadCertificate(attempt._id)}
                        download
                        className="attempt-action attempt-action--certificate"
                        title="Download Certificate"
                      >
                        📥 Certificate
                      </button>
                    )}
                    
                    <button 
                      className="attempt-action attempt-action--details"
                      title="View Detailed Results"
                    >
                      🔍 Details
                    </button>
                    
                    <button 
                      className="attempt-action attempt-action--delete"
                      onClick={() => handleDeleteAttempt(attempt._id)}
                      title="Delete Attempt"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredAttempts.length === 0 && (
          <div className="attempts-empty">
            <div className="attempts-empty__icon">📊</div>
            <h3 className="attempts-empty__title">No Attempts Found</h3>
            <p className="attempts-empty__description">
              {filters.search || filters.status !== 'all' 
                ? 'No attempts match your current filters. Try adjusting your search criteria.'
                : 'No test attempts have been recorded yet.'
              }
            </p>
            {(filters.search || filters.status !== 'all') && (
              <button 
                className="attempts-empty__action"
                onClick={() => setFilters({ status: 'all', dateRange: 'all', search: '' })}
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Performance Summary */}
      {!loading && filteredAttempts.length > 0 && (
        <div className="performance-summary">
          <h3 className="performance-summary__title">Performance Summary</h3>
          <div className="performance-summary__grid">
            <div className="summary-card">
              <div className="summary-card__icon">🎯</div>
              <div className="summary-card__content">
                <div className="summary-card__value">
                  {Math.round(filteredAttempts.reduce((sum, a) => sum + a.scorePercentage, 0) / filteredAttempts.length)}%
                </div>
                <div className="summary-card__label">Average Score</div>
              </div>
            </div>
            
            <div className="summary-card">
              <div className="summary-card__icon">⚡</div>
              <div className="summary-card__content">
                <div className="summary-card__value">
                  {Math.round((filteredAttempts.filter(a => a.passed).length / filteredAttempts.length) * 100)}%
                </div>
                <div className="summary-card__label">Pass Rate</div>
              </div>
            </div>
            
            <div className="summary-card">
              <div className="summary-card__icon">📚</div>
              <div className="summary-card__content">
                <div className="summary-card__value">
                  {new Set(filteredAttempts.map(a => a.testId)).size}
                </div>
                <div className="summary-card__label">Unique Tests</div>
              </div>
            </div>
            
            <div className="summary-card">
              <div className="summary-card__icon">👥</div>
              <div className="summary-card__content">
                <div className="summary-card__value">
                  {new Set(filteredAttempts.map(a => a.userId)).size}
                </div>
                <div className="summary-card__label">Unique Users</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestAttemptsList;