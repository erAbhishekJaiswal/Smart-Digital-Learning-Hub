// TestResults.js
import axios from "axios";
import React, { useState, useEffect } from "react";
import { isUserLoggedIn } from "../../../utils/localstorage";

const TestResults = ({ test, answers, result }) => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attemptId, setAttemptId] = useState(null);
  const token = isUserLoggedIn();
  // console.log(result);
  const [certificateLink, setCertificateLink] = useState(null);


  

  useEffect(() => {
    if (test?._id && answers?.length && result) {
      fetchLatestAttempt();
    }
  }, [test, answers, result]);

  const fetchLatestAttempt = async () => {
  setLoading(true);
  try {
    const response = await axios.get(
      `https://learning-backend-rust.vercel.app/api/test/${test._id}/attempt`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const attempts = response.data;
    const latestAttempt = Array.isArray(attempts)
      ? attempts[attempts.length - 1]
      : attempts;

    console.log("Latest attempt:", latestAttempt);
    setAttemptId(latestAttempt?._id);

    const finalResults = {
      correct: latestAttempt?.correct ?? 0,
      wrong: latestAttempt?.wrong ?? 0,
      scorePercentage: Math.round(latestAttempt?.scorePercentage ?? 0),
      passed: latestAttempt?.passed ?? false,
      timeSpent: latestAttempt?.timeSpent ?? "00:00",
      rank: latestAttempt?.rank ?? "N/A",
      attemptedAt: latestAttempt?.attemptedAt,
      totalQuestions: latestAttempt?.totalQuestions ?? test.questions?.length ?? 0,

      // ✅ Use actual Cloudinary link from backend
      certificateUrl:
        latestAttempt?.passed && latestAttempt?.certificateUrl
          ? latestAttempt.certificateUrl
          : null,

      correctAnswers: latestAttempt?.correctAnswers ?? [],
    };

    setResults(finalResults);
    console.log(result);
    
  } catch (error) {
    console.error("Error fetching test attempt:", error);
    setResults({
      correct: 0,
      wrong: test.questions?.length || 0,
      scorePercentage: 0,
      passed: false,
      timeSpent: "00:00",
      rank: "N/A",
      correctAnswers: [],
    });
  } finally {
    setLoading(false);
  }
};

// ✅ Fetch Signed Certificate URL
const fetchCertificateUrl = async () => {
  try {
    const response = await axios.get(
      `https://learning-backend-rust.vercel.app/api/test/attempts/${attemptId}/certificate`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setCertificateLink(response.data.pdfUrl);
  } catch (err) {
    console.error("Certificate fetch failed:", err);
    setCertificateLink(null);
  }
};

// ✅ Fetch on first load if passed
useEffect(() => {
  if (results?.passed && attemptId) {
    fetchCertificateUrl();
  }
}, [results]);

  if (loading || !results) {
    return (
      <div className="results-loading">
        <div className="results-loading__spinner"></div>
        <p>Calculating your results...</p>
      </div>
    );
  }

  return (
    <div className="test-results">
      {/* Header */}
      <div className="test-results__header">
        <h1 className="test-results__title">Test Results</h1>
        <p className="test-results__subtitle">{test.title}</p>
      </div>

      {/* Results Summary */}
      <div className="results-summary">
        <div className="results-score">
          <div className="results-score__circle">
            <div className="results-score__value">{results.scorePercentage}%</div>
            <div className="results-score__label">Score</div>
          </div>
          <div
            className={`results-badge ${
              results.passed ? "results-badge--passed" : "results-badge--failed"
            }`}
          >
            {results.passed ? "🎉 PASSED" : "❌ FAILED"}
          </div>
        </div>

        <div className="results-stats">
          <div className="result-stat result-stat--correct">
            <div className="result-stat__value">{results.correct}</div>
            <div className="result-stat__label">Correct</div>
          </div>
          <div className="result-stat result-stat--wrong">
            <div className="result-stat__value">{results.wrong}</div>
            <div className="result-stat__label">Wrong</div>
          </div>
          <div className="result-stat result-stat--time">
            <div className="result-stat__value">{results.timeSpent}</div>
            <div className="result-stat__label">Time Spent</div>
          </div>
          <div className="result-stat result-stat--rank">
            <div className="result-stat__value">{results.rank}</div>
            <div className="result-stat__label">Rank</div>
          </div>
        </div>
      </div>

      {/* Certificate Section */}
      {/* {results.passed && results.certificateUrl && (
        <div className="certificate-section">
          <div className="certificate-card">
            <div className="certificate-card__icon">🏆</div>
            <div className="certificate-card__content">
              <h3 className="certificate-card__title">Certificate Earned!</h3>
              <p className="certificate-card__description">
                Congratulations! You've passed the test. Download your certificate.
              </p>
              <a href={results.certificateUrl} download className="certificate-card__btn">
                📥 Download Certificate
              </a>
            </div>
          </div>
        </div>
      )} */}
      {results.passed && (
  <div className="certificate-section">
    <div className="certificate-card">
      <div className="certificate-card__icon">🏆</div>
      <div className="certificate-card__content">
        <h3 className="certificate-card__title">Certificate Earned!</h3>
        <p className="certificate-card__description">
          Congratulations! You've passed the test. Download your certificate.
        </p>

        {certificateLink ? (
          <a
            href={certificateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="certificate-card__btn"
            onClick={fetchCertificateUrl} // ✅ refresh expired link
          >
            📥 Download Certificate
          </a>
        ) : (
          <button className="certificate-card__btn" onClick={fetchCertificateUrl}>
            🔄 Generate Download Link
          </button>
        )}
      </div>
    </div>
  </div>
)}

      {/* Question Review */}
      <div className="results-review">
        <h3 className="results-review__title">Question Review</h3>
        <div className="questions-review">
          {test.questions?.map((question, index) => {
            const userAnswer = answers?.[index];
            const correctAnswer = results?.correctAnswers?.[index];
            const isCorrect =
              userAnswer !== undefined &&
              correctAnswer !== undefined &&
              userAnswer === correctAnswer;

            return (
              <div
                key={index}
                className={`review-item ${
                  isCorrect ? "review-item--correct" : "review-item--incorrect"
                }`}
              >
                <div className="review-item__header">
                  <span className="review-item__number">Q{index + 1}</span>
                  <span className="review-item__status">
                    {/* {isCorrect ? "✅ Correct" : "❌ Incorrect"} */}
                  </span>
                </div>
                <p className="review-item__question">{question.question}</p>

                <div className="review-item__answers">
                  <div className="answer-info">
                    <span className="answer-info__label">Your Answer:</span>
                    <span className="answer-info__value">
                      {userAnswer !== undefined && userAnswer !== null
                        ? question.options[userAnswer]
                        : "Not answered"}
                    </span>
                  </div>

                  {!isCorrect && correctAnswer !== undefined && (
                    <div className="answer-info">
                      <span className="answer-info__label">Correct Answer:</span>
                      <span className="answer-info__value answer-info__value--correct">
                        {question.options[correctAnswer]}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="results-actions">
        <button className="results-action results-action--retry">🔄 Retry Test</button>
        <button className="results-action results-action--home">🏠 Back to Tests</button>
        <button className="results-action results-action--share">📤 Share Results</button>
      </div>
    </div>
  );
};

export default TestResults;
