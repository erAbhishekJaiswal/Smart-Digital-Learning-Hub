import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const BasseUrl = import.meta.env.VITE_BASE_URL

const AddQuestion = () => {
  const { testId } = useParams();
  const createEmptyQuestion = () => ({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    explanation: "",
  });

  const [questions, setQuestions] = useState([createEmptyQuestion()]);
  const [loading, setLoading] = useState(false);

  // 🧠 Handle question text
  const handleQuestionChange = (qIndex, value) => {
    const updated = [...questions];
    updated[qIndex].question = value;
    setQuestions(updated);
  };

  // 🧠 Handle option text
  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  // 🧠 Handle correct answer
  const handleCorrectAnswerChange = (qIndex, oIndex) => {
    const updated = [...questions];
    updated[qIndex].correctAnswer = oIndex;
    setQuestions(updated);
  };

  // 🧠 Handle explanation
  const handleExplanationChange = (qIndex, value) => {
    const updated = [...questions];
    updated[qIndex].explanation = value;
    setQuestions(updated);
  };

  // ➕ Add new question
  const addNewQuestion = () => {
    if (questions.length >= 30) {
      alert("You can only add up to 30 questions at a time!");
      return;
    }
    setQuestions([...questions, createEmptyQuestion()]);
  };

  // 🗑️ Remove question
  const removeQuestion = (index) => {
    if (questions.length <= 1) return;
    setQuestions(questions.filter((_, i) => i !== index));
  };

  // ➕ Add new option for a question
  const addOption = (qIndex) => {
    const updated = [...questions];
    if (updated[qIndex].options.length >= 6) {
      alert("Maximum 6 options allowed per question");
      return;
    }
    updated[qIndex].options.push("");
    setQuestions(updated);
  };

  // 🗑️ Remove option from a question
  const removeOption = (qIndex, oIndex) => {
    const updated = [...questions];
    if (updated[qIndex].options.length <= 2) {
      alert("A question must have at least 2 options");
      return;
    }
    updated[qIndex].options.splice(oIndex, 1);
    setQuestions(updated);
  };

  // ✅ Submit all questions
  const handleSubmitAll = async (e) => {
    e.preventDefault();

    // Validation
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question.trim()) {
        alert(`Question ${i + 1} is empty`);
        return;
      }
      if (q.options.some((opt) => !opt.trim())) {
        alert(`All options are required for question ${i + 1}`);
        return;
      }
    }

    setLoading(true);
    console.log("Submitting all questions:", questions);

    // Simulate API call
    // await new Promise((res) => setTimeout(res, 1500));

    const res = await axios.post(`${BasseUrl}/test/${testId}/questions`, questions);
    const data = res.data;
    console.log(data);

    setLoading(false);
    alert(`${questions.length} questions added successfully!`);

    // Reset form
    setQuestions([createEmptyQuestion()]);
    // if (onQuestionsAdded) onQuestionsAdded();
  };

  return (
    <div className="add-question">
      <div className="add-question__header">
        <h2 className="add-question__title">Add Up to 30 Questions</h2>
        <p className="add-question__subtitle">
          Create multiple-choice questions for your test in one go
        </p>
      </div>

      <form onSubmit={handleSubmitAll}>
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="question-card">
            <div className="question-card__header">
              <h3>Question {qIndex + 1}</h3>
              {questions.length > 1 && (
                <button
                  type="button"
                  className="remove-question-btn"
                  onClick={() => removeQuestion(qIndex)}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Question Text */}
            <textarea
              value={q.question}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              placeholder="Enter your question..."
              rows="3"
              required
              className="form-textarea form-textarea--large"
            />

            {/* Options */}
            <div className="options-list">
              {q.options.map((opt, oIndex) => (
                <div key={oIndex} className="option-item">
                  <input 
                    className="option-item__input-radio"
                    type="radio"
                    name={`correct-${qIndex}`}
                    checked={q.correctAnswer === oIndex}
                    onChange={() =>
                      handleCorrectAnswerChange(qIndex, oIndex)
                    }
                  />
                  <input
                    className="option-item__input-text"
                    type="text"
                    value={opt}
                    onChange={(e) =>
                      handleOptionChange(qIndex, oIndex, e.target.value)
                    }
                    placeholder={`Option ${oIndex + 1}`}
                    required
                  />
                  {q.options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOption(qIndex, oIndex)}
                      className="option-item__remove"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              {q.options.length < 6 && (
                <button
                  type="button"
                  onClick={() => addOption(qIndex)}
                  className="add-option-btn"
                >
                  + Add Another Option
                </button>
              )}
            </div>

            {/* Explanation */}
            <textarea
              value={q.explanation}
              onChange={(e) =>
                handleExplanationChange(qIndex, e.target.value)
              }
              placeholder="Add explanation (optional)"
              rows="2"
              className="form-textarea"
            />
          </div>
        ))}

        {/* Add New Question */}
        {questions.length < 30 && (
          <button
            type="button"
            onClick={addNewQuestion}
            className="add-question-btn"
          >
            + Add Another Question
          </button>
        )}

        {/* Submit All */}
        <div className="form-actions">
          <button
            type="submit"
            className="form-btn form-btn--primary"
            disabled={loading}
          >
            {loading ? "Submitting..." : `Submit ${questions.length} Questions`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestion;
