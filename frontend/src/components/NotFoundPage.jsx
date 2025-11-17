import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Box sx={{ textAlign: 'center', p: 4 }}>
      <Typography variant="h3" color="error">
        404 - דף לא נמצא
      </Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        הדף שברצונך לגשת אליו לא קיים.
      </Typography>
      <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleGoHome}>
        חזור לדף הבית
      </Button>
    </Box>
  );
}
