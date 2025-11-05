import React, { useState } from "react";
import CertificatePopup from "../../../Components/CertificatePopup";

const QuizResult = ({ result }) => {
  return (
    <>
      <h2>Result</h2>
      <p>Correct: {result.correct}</p>
      <p>Wrong: {result.wrong}</p>
      <p>Score: {result.scorePercentage}%</p>

      <CertificatePopup
        show={result.passed}
        score={result.scorePercentage}
        correct={result.correct}
        wrong={result.wrong}
        certificateUrl={result.certificateUrl}
        onClose={() => {}}
      />
    </>
  );
};

export default QuizResult;
