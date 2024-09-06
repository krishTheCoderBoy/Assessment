import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css'; // Make sure the path is correct

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/survey');
  };

  return (
    <div className="welcome-container">
      <h1>Welcome to Our Survey!</h1>
      <button onClick={handleStart}>Start</button>
    </div>
  );
};

export default WelcomePage;
