// components/ChallengePanel.js
import React from 'react';
import './ChallengePanel.css';

const ChallengePanel = ({ challenges, currentChallenge, setCurrentChallenge }) => {
  const challenge = challenges[currentChallenge];

  return (
    <div className="student-challenge-panel">
      <div className="student-challenge-header">
        <h3 className="student-challenge-title">Coding Challenges</h3>
        <div className="student-challenge-nav">
          <button 
            className="student-nav-btn"
            onClick={() => setCurrentChallenge(prev => Math.max(0, prev - 1))}
            disabled={currentChallenge === 0}
          >
            ← Previous
          </button>
          <span className="student-challenge-counter">
            {currentChallenge + 1} / {challenges.length}
          </span>
          <button 
            className="student-nav-btn"
            onClick={() => setCurrentChallenge(prev => Math.min(challenges.length - 1, prev + 1))}
            disabled={currentChallenge === challenges.length - 1}
          >
            Next →
          </button>
        </div>
      </div>

      <div className="student-challenge-content">
        <div className="student-challenge-card">
          <div className="student-challenge-meta">
            <span className={`student-difficulty-badge student-${challenge.difficulty.toLowerCase()}`}>
              {challenge.difficulty}
            </span>
            <span className="student-challenge-id">#{challenge.id}</span>
          </div>
          
          <h4 className="student-challenge-name">{challenge.title}</h4>
          <p className="student-challenge-description">{challenge.description}</p>
          
          <div className="student-requirements">
            <h5 className="student-requirements-title">Requirements:</h5>
            <ul className="student-requirements-list">
              {challenge.requirements.map((req, index) => (
                <li key={index} className="student-requirement-item">
                  <span className="student-check-icon">✓</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div className="student-challenge-actions">
            <button className="student-submit-btn">Submit Solution</button>
            <button className="student-hint-btn">Get Hint</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengePanel;