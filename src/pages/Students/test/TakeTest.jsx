import React, { useEffect, useState } from "react";
import axios from "axios";
import QuizResult from "./QuizResult";
const BasseUrl = import.meta.env.VITE_BASE_URL
const TakeTest = ({ testId }) => {
  const [test, setTest] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    axios.get(`${BasseUrl}/api/test/${testId}`)
      .then(res => {
        setTest(res.data);
        setAnswers(Array(res.data.questions.length).fill(null));
      });
  }, [testId]);

  const submitTest = async () => {
    const token = localStorage.getItem("token");
    const { data } = await axios.post(
      `/api/test/${testId}/submit`,
      { answers },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setResult(data.result);
  };

  if (!test) return <p>Loading...</p>;
  if (result) return <QuizResult result={result} />;

  return (
    <div>
      <h2>{test.subcategory}</h2>
      {test?.questions.map((q, i) => (
        <div key={i}>
          <p>{i + 1}. {q.question}</p>
          {q.options.map((opt, idx) => (
            <label key={idx}>
              <input
                type="radio"
                name={`q-${i}`}
                onChange={() => {
                  const newAnswers = [...answers];
                  newAnswers[i] = idx;
                  setAnswers(newAnswers);
                }}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}
      <button onClick={submitTest}>Submit</button>
    </div>
  );
};

export default TakeTest;
