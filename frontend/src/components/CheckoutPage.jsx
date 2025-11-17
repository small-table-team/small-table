import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid, Divider } from "@mui/material";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();

  // מידע על פרטי המשלוח
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    phone: "",
  });

  // חישוב מחיר כולל
  const totalPrice = items.reduce((acc, item) => acc + (item.price || 0), 0);

  // פונקציה שתהיה אחראית על הגשת ההזמנה
  const handleOrderSubmit = () => {
    // כאן אפשר להוסיף את הלוגיקה להגשת ההזמנה, כמו קריאה ל-API
    alert("ההזמנה בוצעה בהצלחה!");
    clearCart();  // מנקה את העגלה לאחר ההזמנה
    navigate("/");  // מחזיר לדף הבית אחרי שההזמנה הושלמה
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={3}>סיכום הזמנה</Typography>

      {/* סיכום פריטים בעגלה */}
      <Grid container spacing={2}>
        {items.length === 0 ? (
          <Typography color="text.secondary" sx={{ width: "100%" }}>
            אין פריטים בעגלה.
          </Typography>
        ) : (
          items.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1">{item.name}</Typography>
                <Typography variant="body1">₪{item.price}</Typography>
              </Box>
            </Grid>
          ))
        )}
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* פרטי המשלוח */}
      <Typography variant="h6" sx={{ mb: 1 }}>פרטי משלוח</Typography>
      <TextField
        fullWidth
        label="שם"
        value={shippingDetails.name}
        onChange={(e) => setShippingDetails({ ...shippingDetails, name: e.target.value })}
        margin="dense"
      />
      <TextField
        fullWidth
        label="כתובת"
        value={shippingDetails.address}
        onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
        margin="dense"
      />
      <TextField
        fullWidth
        label="טלפון"
        value={shippingDetails.phone}
        onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })}
        margin="dense"
      />

      <Divider sx={{ my: 2 }} />

      {/* סיכום מחיר */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>מחיר סופי:</Typography>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>₪{totalPrice.toFixed(2)}</Typography>
      </Box>

      {/* כפתור לשליחת ההזמנה */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOrderSubmit}
          disabled={items.length === 0 || !shippingDetails.name || !shippingDetails.address || !shippingDetails.phone}
        >
          שלח הזמנה
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => navigate("/")}
        >
          חזור לדף הבית
        </Button>
      </Box>
    </Box>
  );
}
