import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ThankYouPage.css'; // Make sure the path is correct

const ThankYouPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="thank-you-container">
      <h1>Thank you for your time!</h1>
      <p>You will be redirected to the home page shortly...</p>
    </div>
  );
};

export default ThankYouPage;
