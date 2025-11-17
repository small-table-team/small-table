import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';  // הוספתי את ה- useNavigate

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { items, removeItem, removeCatering, clearCart } = useCart();
  const navigate = useNavigate(); // יצירת הפונקציה לנווט

  // group items by cateringId
  const grouped = items.reduce((acc, it) => {
    const key = it.cateringId || 'unknown';
    if (!acc[key]) acc[key] = { cateringName: it.cateringName || 'Unknown Catering', items: [] };
    acc[key].items.push(it);
    return acc;
  }, {});

  // Calculate the total price
  const totalPrice = items.reduce((acc, item) => acc + (item.price || 0), 0);

  // פונקציה למעבר לדף הבא בהזמנה
  const handleProceedToOrder = () => {
    // כאן תוכל לנווט לדף הבא, לדוגמה דף תשלום או דף פרטי הזמנה
    navigate('/checkout'); // תוודא שיצרת את הנתיב הזה ב-react-router
  };

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        color="primary"
        sx={{
          position: 'fixed',
          right: 16,
          bottom: 16,
          bgcolor: 'white',
          boxShadow: 3,
          zIndex: 1400,
        }}
        aria-label="Open cart"
      >
        <ShoppingCartIcon />
      </IconButton>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 360, p: 2 }} role="presentation">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">העגלה שלי</Typography>
            <IconButton onClick={() => setOpen(false)} aria-label="Close cart">
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ my: 1 }} />

          {items.length === 0 ? (
            <Typography color="text.secondary">העגלה ריקה</Typography>
          ) : (
            Object.keys(grouped).map((cId) => (
              <Box key={cId} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{grouped[cId].cateringName}</Typography>
                  <Button color="error" onClick={() => removeCatering(cId)} size="small">הסר את הקייטרינג</Button>
                </Box>
                <List>
                  {grouped[cId].items.map((item) => (
                    <ListItem
                      key={`${item.id}-${item.cateringId}`}
                      secondaryAction={
                        <Button color="error" onClick={() => removeItem(item.id, item.cateringId)}>
                          הסר
                        </Button>
                      }
                    >
                      <ListItemText
                        primary={item.name}
                        secondary={
                          <>
                            {item.categoryName && `קטגוריה: ${item.categoryName}`}
                            <Typography variant="body2" color="text.secondary">מחיר: ₪{item.price}</Typography>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
                <Divider />
              </Box>
            ))
          )}

          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>מחיר סופי: ₪{totalPrice.toFixed(2)}</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="contained" color="primary" onClick={handleProceedToOrder} disabled={items.length === 0}>
                המשך להזמנה
              </Button>
              <Button variant="outlined" onClick={clearCart} disabled={items.length === 0}>
                נקה עגלה
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
