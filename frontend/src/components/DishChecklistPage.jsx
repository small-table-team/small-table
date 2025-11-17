import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Checkbox, FormControlLabel, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { cateringsService } from '../services/cateringsService';
import { dishesService } from '../services/dishesService';

export default function DishChecklistPage() {
  const { cateringId, dishId } = useParams();
  const navigate = useNavigate();
  const { items: cartItems, addItem, removeItem } = useCart();
  
  const [dishes, setDishes] = useState([]);
  const [cateringName, setCateringName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [checked, setChecked] = useState([]);
  const MAX_SELECTION = 2;

  useEffect(() => {
    // שליפת פרטי הקייטרינג
    cateringsService.getAll().then((all) => {
      const catering = all.find(c => String(c.id) === String(cateringId));
      if (catering) setCateringName(catering.name);
    });

    // שליפת מנות מה־JSON לפי cateringId
    dishesService.getByCateringId(cateringId).then((allDishes) => {
      setDishes(allDishes);
      // אם רוצים שם קטגוריה ספציפי (dishId) אפשר למצוא אותו
      const category = allDishes.find(d => String(d.id) === String(dishId));
      if (category) setCategoryName(category.name);

      // אתחול checked לפי פריטים שכבר בקארט
      const initialChecked = cartItems
        .filter(it => String(it.categoryId) === String(dishId) && String(it.cateringId) === String(cateringId))
        .map(it => it.id);
      setChecked(initialChecked);
    });
  }, [cateringId, dishId, cartItems]);

  const handleToggle = (id, dishName) => {
    if (checked.includes(id)) {
      setChecked(prev => prev.filter(item => item !== id));
      removeItem(id, cateringId);
    } else if (checked.length < MAX_SELECTION) {
      setChecked(prev => [...prev, id]);
      addItem({
        id,
        name: dishName,
        categoryId: dishId,
        categoryName,
        cateringId,
        cateringName,
      });
    }
  };

  if (dishes.length === 0) return <Typography sx={{ p: 3 }}>Loading dishes...</Typography>;

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', pb: 8 }}>
      {/* HEADER */}
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: 'white', borderBottom: '1px solid #eee' }}>
        <Button onClick={() => navigate(-1)} size="small" sx={{ minWidth: 0, p: 1 }}>
          <ArrowBackIosNewIcon fontSize="small" />
        </Button>
        <Typography variant="h6" sx={{ ml: 2 }}>
          בחר מנות
        </Typography>
      </Box>

      <Box sx={{ px: 2, mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>רשימת מנות</Typography>
        <Typography color="text.secondary" sx={{ mb: 1 }}>ניתן לבחור עד {MAX_SELECTION} מנות בלבד.</Typography>
        {dishes
          .filter(d => String(d.id) === String(dishId)) // רק המנה שנבחרה
          .map(dish => (
            <Card key={dish.id} sx={{ borderRadius: 3, mb: 2, position: 'relative', overflow: 'hidden' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked.includes(dish.id)}
                      onChange={() => handleToggle(dish.id, dish.name)}
                      color="primary"
                      disabled={!checked.includes(dish.id) && checked.length >= MAX_SELECTION}
                    />
                  }
                  label={<Typography variant="body1">{dish.name}</Typography>}
                />
              </CardContent>
            </Card>
          ))}
      </Box>
    </Box>
  );
}
