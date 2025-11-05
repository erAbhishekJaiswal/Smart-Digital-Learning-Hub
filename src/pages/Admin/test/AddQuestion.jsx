// import React, { useState } from "react";
// import axios from "axios";

// const AddQuestion = () => {
//   const [question, setQuestion] = useState("");
//   const [options, setOptions] = useState(["", "", "", ""]);
//   const [correctAnswer, setCorrectAnswer] = useState(0);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const testId = localStorage.getItem("testId");
//     const token = localStorage.getItem("token");

//     try {
//       await axios.post(
//         `/api/test/${testId}/question`,
//         { question, options, correctAnswer },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert("Question Added ✅");
//       setQuestion("");
//       setOptions(["", "", "", ""]);
//     } catch (error) {
//       alert(error.response.data.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Add Question</h2>

//       <textarea
//         placeholder="Enter Question"
//         value={question}
//         onChange={(e) => setQuestion(e.target.value)}
//         required
//       />

//       {options.map((opt, i) => (
//         <input
//           key={i}
//           placeholder={`Option ${i + 1}`}
//           value={opt}
//           onChange={(e) => {
//             const newOptions = [...options];
//             newOptions[i] = e.target.value;
//             setOptions(newOptions);
//           }}
//           required
//         />
//       ))}

//       <label>Correct Answer Index</label>
//       <select
//         value={correctAnswer}
//         onChange={(e) => setCorrectAnswer(Number(e.target.value))}
//       >
//         {options.map((_, i) => (
//           <option key={i} value={i}>
//             Option {i + 1}
//           </option>
//         ))}
//       </select>

//       <button type="submit">Add Question</button>
//     </form>
//   );
// };

// export default AddQuestion;








// AddQuestion.js
// import React, { useState } from 'react';

// const AddQuestion = ({ testId, onQuestionAdded }) => {
//   const [formData, setFormData] = useState({
//     question: '',
//     options: ['', '', '', ''],
//     correctAnswer: 0,
//     explanation: ''
//   });

//   const [loading, setLoading] = useState(false);

//   const handleQuestionChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       question: e.target.value
//     }));
//   };

//   const handleOptionChange = (index, value) => {
//     const newOptions = [...formData.options];
//     newOptions[index] = value;
//     setFormData(prev => ({
//       ...prev,
//       options: newOptions
//     }));
//   };

//   const handleCorrectAnswerChange = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       correctAnswer: index
//     }));
//   };

//   const handleExplanationChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       explanation: e.target.value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate form
//     if (!formData.question.trim()) {
//       alert('Please enter a question');
//       return;
//     }
    
//     if (formData.options.some(opt => !opt.trim())) {
//       alert('Please fill all options');
//       return;
//     }

//     setLoading(true);
    
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1500));
    
//     console.log('Adding question:', formData);
//     setLoading(false);
    
//     // Reset form
//     setFormData({
//       question: '',
//       options: ['', '', '', ''],
//       correctAnswer: 0,
//       explanation: ''
//     });
    
//     if (onQuestionAdded) {
//       onQuestionAdded();
//     }
    
//     alert('Question added successfully!');
//   };

//   const addAnotherOption = () => {
//     setFormData(prev => ({
//       ...prev,
//       options: [...prev.options, '']
//     }));
//   };

//   const removeOption = (index) => {
//     if (formData.options.length <= 2) {
//       alert('A question must have at least 2 options');
//       return;
//     }
    
//     const newOptions = formData.options.filter((_, i) => i !== index);
//     setFormData(prev => ({
//       ...prev,
//       options: newOptions,
//       correctAnswer: prev.correctAnswer >= index ? Math.max(0, prev.correctAnswer - 1) : prev.correctAnswer
//     }));
//   };

//   return (
//     <div className="add-question">
//       <div className="add-question__header">
//         <h2 className="add-question__title">Add New Question</h2>
//         <p className="add-question__subtitle">
//           Create multiple choice questions for your test
//         </p>
//       </div>

//       <form className="question-form" onSubmit={handleSubmit}>
//         {/* Question Input */}
//         <div className="form-group">
//           <label className="form-label">Question Text *</label>
//           <textarea
//             value={formData.question}
//             onChange={handleQuestionChange}
//             className="form-textarea form-textarea--large"
//             placeholder="Enter your question here..."
//             rows="3"
//             required
//           />
//         </div>

//         {/* Options */}
//         <div className="form-group">
//           <label className="form-label">Options *</label>
//           <div className="options-list">
//             {formData.options.map((option, index) => (
//               <div key={index} className="option-item">
//                 <label className="option-item__radio">
//                   <input
//                     type="radio"
//                     name="correctAnswer"
//                     checked={formData.correctAnswer === index}
//                     onChange={() => handleCorrectAnswerChange(index)}
//                     className="option-item__radio-input"
//                   />
//                   <span className="option-item__radio-checkmark"></span>
//                 </label>
                
//                 <input
//                   type="text"
//                   value={option}
//                   onChange={(e) => handleOptionChange(index, e.target.value)}
//                   className="option-item__input"
//                   placeholder={`Option ${index + 1}`}
//                   required
//                 />
                
//                 {formData.options.length > 2 && (
//                   <button
//                     type="button"
//                     onClick={() => removeOption(index)}
//                     className="option-item__remove"
//                     title="Remove option"
//                   >
//                     ✕
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
          
//           {formData.options.length < 6 && (
//             <button
//               type="button"
//               onClick={addAnotherOption}
//               className="add-option-btn"
//             >
//               + Add Another Option
//             </button>
//           )}
//         </div>

//         {/* Explanation */}
//         <div className="form-group">
//           <label className="form-label">Explanation (Optional)</label>
//           <textarea
//             value={formData.explanation}
//             onChange={handleExplanationChange}
//             className="form-textarea"
//             placeholder="Add explanation for the correct answer..."
//             rows="2"
//           />
//         </div>

//         {/* Form Actions */}
//         <div className="form-actions">
//           <button
//             type="button"
//             className="form-btn form-btn--secondary"
//             onClick={() => setFormData({
//               question: '',
//               options: ['', '', '', ''],
//               correctAnswer: 0,
//               explanation: ''
//             })}
//             disabled={loading}
//           >
//             Clear Form
//           </button>
//           <button
//             type="submit"
//             className="form-btn form-btn--primary"
//             disabled={loading}
//           >
//             {loading ? (
//               <>
//                 <div className="form-btn__spinner"></div>
//                 Adding Question...
//               </>
//             ) : (
//               'Add Question'
//             )}
//           </button>
//         </div>
//       </form>

//       {/* Quick Tips */}
//       <div className="question-tips">
//         <h4 className="question-tips__title">💡 Question Creation Tips</h4>
//         <ul className="question-tips__list">
//           <li>Write clear and concise questions</li>
//           <li>Ensure only one correct answer</li>
//           <li>Make distractors plausible but incorrect</li>
//           <li>Keep options similar in length and structure</li>
//           <li>Add explanations to help students learn</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default AddQuestion;


import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
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

    const res = await axios.post(`http://localhost:5000/api/test/${testId}/questions`, questions);
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
