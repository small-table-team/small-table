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
  InputAdornment,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';

export default function CateringDishesPage() {
  const { cateringId } = useParams();
  const navigate = useNavigate();
  const [catering, setCatering] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // נתוני דוגמה - כאן ניתן להחליף בקריאה אמיתית לשרת
    const mockCatering = {
      id: cateringId,
      name: 'Shulhan Katan Catering',
      location: 'Jerusalem, Israel',
      dishes: [
        {
          id: 1,
          name: 'מנות פתיחה',
          description: 'Healthy vegetarian combo with salad and soup',
          image: '/images/1.jpg',
          discount: '30% OFF',
        },
        {
          id: 2,
          name: 'מנות עיקריות',
          description: 'Spicy curry with rice and naan bread',
          image: '/images/3.jpg',
        },
        {
          id: 3,
          name: 'מנות צדדיות',
          description: 'Fresh greens, feta, and olives with olive oil dressing',
          image: '/images/2.jpg',
        },
        {
          id: 4,
          name: 'Pasta Alfredo',
          description: 'Creamy pasta with parmesan cheese',
          image: '/images/4.jpg',
        },
      ],
    };

    setCatering(mockCatering);
  }, [cateringId]);

  if (!catering) return <Typography sx={{ p: 3 }}>Loading...</Typography>;

  const filteredDishes = catering.dishes.filter((dish) =>
    dish.name.toLowerCase().includes(search.toLowerCase())
  );

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
        <IconButton onClick={() => navigate(-1)} size="small">
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>

        <Box sx={{ ml: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Location
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
          הקיטרינג שלנו!, <Typography component="span" color="error.main">Good Afternoon!</Typography>
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
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
      </Box>

      {/* Featured Dish */}
      <Box sx={{ px: 2, mt: 3 }}>
        {catering.dishes[0] && (
          <Card
            sx={{
              borderRadius: 3,
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            }}
          >
            <CardMedia
              component="img"
              height="160"
              image={catering.dishes[0].image}
              alt={catering.dishes[0].name}
            />
            {catering.dishes[0].discount && (
              <Chip
                label={catering.dishes[0].discount}
                color="error"
                size="small"
                sx={{
                  position: 'absolute',
                  top: 12,
                  left: 12,
                  fontWeight: 'bold',
                  bgcolor: '#b71c1c',
                  color: 'white',
                }}
              />
            )}
            <CardContent
              sx={{
                position: 'absolute',
                bottom: 10,
                left: 16,
                color: 'white',
                textShadow: '0 0 6px rgba(0,0,0,0.7)',
              }}
            >
              <Typography variant="subtitle2">
                Chenille Caterers
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {catering.dishes[0].name}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Menu List */}
      <Box sx={{ px: 2, mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          תפריט
        </Typography>

        {filteredDishes.map((dish, index) => (
          <Card
            key={dish.id}
            sx={{
              borderRadius: 3,
              mb: 2,
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
            onClick={() => navigate(`/dish/${dish.id}`)}
          >
            <CardMedia
              component="img"
              height="120"
              image={dish.image}
              alt={dish.name}
            />
            <CardContent
              sx={{
                position: 'absolute',
                bottom: 10,
                left: 16,
                color: 'white',
                textShadow: '0 0 6px rgba(0,0,0,0.7)',
              }}
            >
              <Typography variant="subtitle2">
                Day {index + 1}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {dish.name}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
