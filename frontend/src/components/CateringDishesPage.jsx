import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Chip,
  TextField,
  InputAdornment
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import { dishesService } from '../services/dishesService';
import { cateringsService } from '../services/cateringsService';

export default function CateringDishesPage() {
  const { cateringId } = useParams();
  const navigate = useNavigate();
  const [catering, setCatering] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const numericId = Number(cateringId); // המרה למספר

    // שליפת פרטי הקייטרינג
    cateringsService.getAll().then((all) => {
      const found = all.find(c => c.id === numericId);
      setCatering(found || null);
    });

    // שליפת המנות לפי קייטרינג
    dishesService.getByCateringId(numericId).then(setDishes);
  }, [cateringId]);

  if (!catering) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>טוען קייטרינג...</Typography>
      </Box>
    );
  }

  const filteredDishes = dishes.filter(dish =>
    dish.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', pb: 8 }}>
      {/* HEADER */}
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: 'white', borderBottom: '1px solid #eee' }}>
        <IconButton onClick={() => navigate(-1)} size="small">
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <Box sx={{ ml: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            מיקום
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <LocationOnIcon sx={{ fontSize: 16, color: 'error.main' }} />
            <Typography variant="body2">{catering.location}</Typography>
          </Box>
        </Box>
      </Box>

      {/* Greeting */}
      <Box sx={{ px: 2, mt: 2 }}>
        <Typography variant="h6">
          הקייטרינג שלנו!, <Typography component="span" color="error.main">Good Afternoon!</Typography>
        </Typography>
      </Box>

      {/* Search */}
      <Box sx={{ px: 2, mt: 2 }}>
        <TextField
          fullWidth
          placeholder="חיפוש בתפריט"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{
            bgcolor: 'white',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': { borderRadius: 2 }
          }}
        />
      </Box>

      {/* Featured Dish */}
      <Box sx={{ px: 2, mt: 3 }}>
        {filteredDishes[0] && (
          <Card sx={{ borderRadius: 3, position: 'relative', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <CardMedia
              component="img"
              height="160"
              image={filteredDishes[0].image}
              alt={filteredDishes[0].name}
            />
            {filteredDishes[0].discount && (
              <Chip
                label={filteredDishes[0].discount}
                color="error"
                size="small"
                sx={{ position: 'absolute', top: 12, left: 12, fontWeight: 'bold', bgcolor: '#b71c1c', color: 'white' }}
              />
            )}
            <CardContent sx={{ position: 'absolute', bottom: 10, left: 16, color: 'white', textShadow: '0 0 6px rgba(0,0,0,0.7)' }}>
              <Typography variant="subtitle2">{catering.name}</Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>{filteredDishes[0].name}</Typography>
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Menu List */}
      <Box sx={{ px: 2, mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>תפריט</Typography>
        {filteredDishes.length === 0 && <Typography sx={{ mb: 2 }}>לא נמצאו מנות</Typography>}
        {filteredDishes.map((dish) => (
          <Card
            key={dish.id}
            sx={{ borderRadius: 3, mb: 2, position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
            onClick={() => navigate(`/dish-checklist/${catering.id}/${dish.id}`, { state: { cateringName: catering.name, categoryName: dish.name } })}
          >
            <CardMedia component="img" height="120" image={dish.image} alt={dish.name} />
            <CardContent sx={{ position: 'absolute', bottom: 10, left: 16, color: 'white', textShadow: '0 0 6px rgba(0,0,0,0.7)' }}>
              <Typography variant="subtitle2">{dish.name}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
