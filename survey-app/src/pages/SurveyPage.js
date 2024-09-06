import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SurveyPage.css'; 

const questions = [
  { id: 1, question: "How satisfied are you with our products?", type: "rating", scale: 5 },
  { id: 2, question: "How fair are the prices compared to similar retailers?", type: "rating", scale: 5 },
  { id: 3, question: "How satisfied are you with the value for money of your purchase?", type: "rating", scale: 5 },
  { id: 4, question: "On a scale of 1-10 how would you recommend us to your friends and family?", type: "rating", scale: 10 },
  { id: 5, question: "What could we do to improve our service?", type: "text" }
];

const SurveyPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [sessionId, setSessionId] = useState('');
  const navigate=useNavigate();

  useEffect(() => {
    // Generate unique session ID
    setSessionId(Date.now().toString());
  }, []);

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const handleSubmit = async () => {
    const res=await axios.post('http://localhost:5000/api/submit', { sessionId, answers });
    alert('Survey completed!');
    console.log(answers);
    console.log(res);
    navigate('/thank-you');

  };

  return (
    <div className="survey-container">
      <div className="survey-card">
        <h2 className="survey-title">Survey {currentQuestion + 1} of {questions.length}</h2>
        <p className="survey-question">{questions[currentQuestion].question}</p>
        {questions[currentQuestion].type === 'rating' ? (
          <input
            type="number"
            min="1"
            max={questions[currentQuestion].scale}
            className="survey-input"
            onChange={(e) => handleAnswer(questions[currentQuestion].id, e.target.value)}
          />
        ) : (
          <textarea
            className="survey-input"
            onChange={(e) => handleAnswer(questions[currentQuestion].id, e.target.value)}
            rows="3"
          />
        )}
        <div className="button-group">
          <button onClick={handlePrevious} disabled={currentQuestion === 0} className="btn btn-secondary">
            Previous
          </button>
          <button onClick={handleSkip} className="btn btn-secondary">
            Skip
          </button>
          {currentQuestion < questions.length - 1 ? (
            <button onClick={handleNext} className="btn btn-primary">
              Next
            </button>
          ) : (
            <button onClick={handleSubmit} className="btn btn-submit">
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;