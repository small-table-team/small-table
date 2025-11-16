import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Checkbox, FormControlLabel, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate, useParams } from 'react-router-dom';

// Mock data for checklist (replace with real data as needed)
const mockDishesByCategory = {
  1: [
    { id: 101, name: 'סלט ירקות' },
    { id: 102, name: 'מרק עדשים' },
    { id: 103, name: 'לחמניות' },
  ],
  2: [
    { id: 201, name: 'עוף בתנור' },
    { id: 202, name: 'קציצות דגים' },
    { id: 203, name: 'אורז לבן' },
  ],
  3: [
    { id: 301, name: 'פירה תפוחי אדמה' },
    { id: 302, name: 'שעועית ירוקה' },
    { id: 303, name: 'סלט קולסלאו' },
  ],
  4: [
    { id: 401, name: 'פסטה אלפרדו' },
    { id: 402, name: 'פסטה פומודורו' },
    { id: 403, name: 'פסטה פסטו' },
  ],
};

export default function DishChecklistPage() {
  const { dishId } = useParams();
  const navigate = useNavigate();
  const dishes = mockDishesByCategory[dishId] || [];
  const [checked, setChecked] = useState([]);

  const MAX_SELECTION = 2; // Change this value to set the max allowed selections

  const handleToggle = (id) => {
    if (checked.includes(id)) {
      setChecked((prev) => prev.filter((item) => item !== id));
    } else if (checked.length < MAX_SELECTION) {
      setChecked((prev) => [...prev, id]);
    }
    // If max reached, do nothing
  };

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', pb: 8 }}>
      {/* HEADER */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          bgcolor: 'white',
          borderBottom: '1px solid #eee',
        }}
      >
        <Button onClick={() => navigate(-1)} size="small" sx={{ minWidth: 0, p: 1 }}>
          <ArrowBackIosNewIcon fontSize="small" />
        </Button>
        <Typography variant="h6" sx={{ ml: 2 }}>
          בחר מנות
        </Typography>
      </Box>

      {/* Checklist */}
      <Box sx={{ px: 2, mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          רשימת מנות
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 1 }}>
          ניתן לבחור עד {MAX_SELECTION} מנות בלבד.
        </Typography>
        {dishes.length === 0 ? (
          <Typography color="text.secondary">לא נמצאו מנות לקטגוריה זו.</Typography>
        ) : (
          dishes.map((dish) => (
            <Card
              key={dish.id}
              sx={{ borderRadius: 3, mb: 2, position: 'relative', overflow: 'hidden' }}
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked.includes(dish.id)}
                      onChange={() => handleToggle(dish.id)}
                      color="primary"
                      disabled={!checked.includes(dish.id) && checked.length >= MAX_SELECTION}
                    />
                  }
                  label={<Typography variant="body1">{dish.name}</Typography>}
                />
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </Box>
  );
}
