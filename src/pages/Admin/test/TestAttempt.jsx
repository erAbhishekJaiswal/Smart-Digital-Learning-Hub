// TestAttempt.js
import React, { useState, useEffect } from 'react';
import TestResults from './TestResults';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {isUserLoggedIn} from "../../../utils/localstorage";
const TestAttempt = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const token = isUserLoggedIn(); // Assuming token is stored in localStorage
  const[result , setResults] = useState(null);



  // chack the user is logged in or not
  if (!isUserLoggedIn()) {
    toast.error('You are not logged in');
    navigate('/signin');
  }

    useEffect(() => {
    fetchTest();
  }, [bookId]);

  // Function to fetch test data
  const fetchTest = async () => {
    setLoading(true);
    // Fetch test data from backend (mocked here)
    const res = await axios.get(`https://learning-backend-rust.vercel.app/api/test/${bookId}`);
    const data = res.data;
    console.log(data);

    // Mock test data
    // const mockTest = {
    //   _id: bookId,
    //   title: 'JavaScript Fundamentals',
    //   subcategory: 'Programming',
    //   duration: 30, // minutes
    //   totalQuestions: 5,
    //   difficulty: 'Beginner',
    //   questions: [
    //     {
    //       _id: 'q1',
    //       question: 'What does HTML stand for?',
    //       options: [
    //         'Hyper Text Markup Language',
    //         'High Tech Modern Language',
    //         'Hyper Transfer Markup Language',
    //         'Home Tool Markup Language'
    //       ]
    //     },
    //     {
    //       _id: 'q2',
    //       question: 'Which of the following is a JavaScript framework?',
    //       options: [
    //         'React',
    //         'Laravel',
    //         'Django',
    //         'Spring'
    //       ]
    //     },
    //     {
    //       _id: 'q3',
    //       question: 'What is the output of: console.log(typeof null)?',
    //       options: [
    //         'object',
    //         'null',
    //         'undefined',
    //         'string'
    //       ]
    //     },
    //     {
    //       _id: 'q4',
    //       question: 'Which method adds an element to the end of an array?',
    //       options: [
    //         'push()',
    //         'pop()',
    //         'shift()',
    //         'unshift()'
    //       ]
    //     },
    //     {
    //       _id: 'q5',
    //       question: 'What does CSS stand for?',
    //       options: [
    //         'Cascading Style Sheets',
    //         'Computer Style Sheets',
    //         'Creative Style System',
    //         'Colorful Style Sheets'
    //       ]
    //     }
    //   ]
    // };
    
    setTest(data); // assuming data is an array of tests
    setTimeLeft(data.duration * 60); // Convert to seconds
    setAnswers(new Array(data?.questions?.length).fill(null));
    setLoading(false);
  };

  const startTest = () => {
    setTestStarted(true);
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmitTest = async () => {
    if (window.confirm('Are you sure you want to submit the test? You cannot change answers after submission.')) {
      setTestSubmitted(true);
      // Submit answers to backend
      console.log('Submitting answers:', answers);

         try {
        // send with userId hardcoded for testing
        const res = await axios.post(`https://learning-backend-rust.vercel.app/api/test/${test._id}/submit`, {
          answers: answers, // Hardcoded userId for testing
        },{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Add auth token if needed
          }
        });
        console.log(res);
        setResults(res.data);
        return res.data.result;
      } catch (error) {
        toast.error(error.response.data.message);
        navigate('/');
        // console.error("Error submitting test:", error);
        return null;
      }
    }
  };

  // Timer effect
  useEffect(() => {
    if (!testStarted || testSubmitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted, testSubmitted, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="test-loading">
        <div className="test-loading__spinner"></div>
        <p>Loading test...</p>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="test-error">
        <div className="test-error__icon">❌</div>
        <h3>Test Not Found</h3>
        <p>The requested test could not be loaded.</p>
      </div>
    );
  }

  if (!testStarted) {
    return (
      <div className="test-instructions">
        <div className="test-instructions__card">
          <h1 className="test-instructions__title">{test.title}</h1>
          <div className="test-instructions__info">
            <div className="test-info-item">
              <span className="test-info-item__label">Category:</span>
              <span className="test-info-item__value">{test?.techstackId?.subcategories?.map(sub => sub._id === test.subcategory ? sub.name : '')}</span>
            </div>
            <div className="test-info-item">
              <span className="test-info-item__label">Difficulty:</span>
              <span className="test-info-item__value">{test.difficulty}</span>
            </div>
            <div className="test-info-item">
              <span className="test-info-item__label">Duration:</span>
              <span className="test-info-item__value">{test.duration} minutes</span>
            </div>
            <div className="test-info-item">
              <span className="test-info-item__label">Questions:</span>
              <span className="test-info-item__value">{test.totalQuestions}</span>
            </div>
          </div>

          <div className="test-instructions__rules">
            <h3>Instructions:</h3>
            <ul>
              <li>✅ You have {test.duration} minutes to complete the test</li>
              <li>✅ There are {test.totalQuestions} multiple choice questions</li>
              <li>✅ Each question has only one correct answer</li>
              <li>✅ You can navigate between questions using Next/Previous buttons</li>
              <li>✅ The test will auto-submit when time expires</li>
              <li>❌ Do not refresh the page during the test</li>
            </ul>
          </div>

          <button 
            className="test-start-btn"
            onClick={startTest}
          >
            Start Test
          </button>
        </div>
      </div>
    );
  }

  if (testSubmitted && result) {
    return <TestResults test={test} answers={answers} result={result} />;
  }

  const currentQ = test.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / test.questions.length) * 100;

  return (
    <div className="test-attempt">
      {/* Test Header */}
      <div className="test-header">
        <div className="test-header__info">
          <h1 className="test-header__title">{test.title}</h1>
          <div className="test-header__meta">
            Question {currentQuestion + 1} of {test.questions.length}
          </div>
        </div>
        
        <div className="test-timer">
          <div className={`test-timer__display ${timeLeft < 300 ? 'test-timer__display--warning' : ''}`}>
            ⏱️ {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="test-progress">
        <div 
          className="test-progress__bar"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Question Navigation */}
      <div className="question-navigation">
        {test.questions.map((_, index) => (
          <button
            key={index}
            className={`question-nav-btn ${currentQuestion === index ? 'question-nav-btn--active' : ''} ${answers[index] !== null ? 'question-nav-btn--answered' : ''}`}
            onClick={() => setCurrentQuestion(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Current Question */}
      <div className="question-container">
        <div className="question-card">
          <h3 className="question-card__text">{currentQ.question}</h3>
          
          <div className="options-list">
            {currentQ.options.map((option, index) => (
              <label 
                key={index}
                className={`option-label ${answers[currentQuestion] === index ? 'option-label--selected' : ''}`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  checked={answers[currentQuestion] === index}
                  onChange={() => handleAnswerSelect(currentQuestion, index)}
                  className="option-label__input"
                />
                <span className="option-label__text">{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="test-navigation">
        <button
          onClick={handlePrevQuestion}
          disabled={currentQuestion === 0}
          className="nav-btn nav-btn--prev"
        >
          ← Previous
        </button>
        
        <div className="navigation-status">
          {answers.filter(a => a !== null).length} / {test.questions.length} answered
        </div>

        {currentQuestion === test.questions.length - 1 ? (
          <button
            onClick={handleSubmitTest}
            className="nav-btn nav-btn--submit"
          >
            Submit Test
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="nav-btn nav-btn--next"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
};

export default TestAttempt;