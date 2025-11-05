import React from "react";
import "../CSSFiles/component/CertificatePopup.css";

const CertificatePopup = ({ show, score, correct, wrong, certificateUrl, onClose }) => {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2>🎉 Congratulations!</h2>
        <p>You passed the quiz 🎓</p>

        <div className="score-box">
          <p><strong>Score:</strong> {score}%</p>
          <p><strong>Correct:</strong> {correct}</p>
          <p><strong>Wrong:</strong> {wrong}</p>
        </div>

        <a
          href={certificateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="download-btn"
        >
          Download Certificate
        </a>

        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CertificatePopup;
