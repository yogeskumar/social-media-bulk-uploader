import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const NotFoundPage = () => {
  const [redirect, setRedirect] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(timer);
        setRedirect(true);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [countdown]);

  if (redirect) {
    return navigate('/dashboard');
  }

  return (
    <div>
      <EmojiEventsIcon />
      <Typography variant="h4" align="center" gutterBottom>
        Oops! Page not found
      </Typography>
      <SentimentVeryDissatisfiedIcon />
      <Typography variant="h6" align="center" gutterBottom>
        Don't worry, let's get you back to the homepage.
      </Typography>
      <div>
        {Array.from({ length: countdown }, (_, index) => (
          <Typography key={index} variant="h5">
            {countdown - index}{' '}
            {index === 0 ? 'Redirecting...' : ''}
          </Typography>
        ))}
      </div>
      <Typography variant="body2" align="center">
        Or you can go back to the{' '}
        <Link to="/" style={{ color: 'inherit', textDecoration: 'underline' }}>
          homepage
        </Link>
        .
      </Typography>
    </div>
  );
};

export default NotFoundPage;
