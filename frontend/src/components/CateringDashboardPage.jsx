import React, { useState, useEffect } from "react";
import {
  Box, Typography, Grid, Card, CardContent, CardMedia,
  Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, FormHelperText
} from "@mui/material";
import { dishesService } from "../services/dishesService";
import { usersService } from "../services/usersService";

export default function CateringDashboardPage() {
  const [loggedUser, setLoggedUser] = useState(() => usersService.getLoggedUser());
  const [dishes, setDishes] = useState([]);
  const [editingDish, setEditingDish] = useState(null);
  const [newDish, setNewDish] = useState({ name: "", description: "", price: "", image_url: "" });
  const [openDialog, setOpenDialog] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (loggedUser?.role === "catering") {
      dishesService.getByCateringId(loggedUser.id).then(setDishes);
    }
  }, [loggedUser?.id]);

  const handleDelete = (dishId) => {
    dishesService.deleteDish(dishId);
    setDishes(prev => prev.filter(d => d.id !== dishId));
  };

  const handleOpenEdit = (dish) => {
    setEditingDish(dish);
    setNewDish({ ...dish });
    setOpenDialog(true);
  };

  const validateForm = () => {
    let formErrors = {};
    if (!newDish.name) formErrors.name = "שם המנה הוא שדה חובה";
    if (!newDish.description) formErrors.description = "תיאור המנה הוא שדה חובה";
    if (!newDish.price || newDish.price <= 0) formErrors.price = "מחיר המנה הוא שדה חובה";
    if (!newDish.image_url) formErrors.image_url = "יש להעלות תמונה של המנה";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    if (editingDish) {
      dishesService.updateDish(editingDish.id, newDish);
      setDishes(prev => prev.map(d => d.id === editingDish.id ? newDish : d));
    } else {
      const savedDish = dishesService.addDish({ ...newDish, cateringId: loggedUser.id });
      setDishes(prev => [...prev, savedDish]);
    }
    setOpenDialog(false);
    setEditingDish(null);
    setNewDish({ name: "", description: "", price: "", image_url: "" });
    setErrors({});
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={3}>{loggedUser?.name} Dashboard</Typography>
      <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)} sx={{ mb: 3 }}>
        Add New Dish
      </Button>

      <Grid container spacing={2}>
        {dishes.map(d => (
          <Grid item key={d.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia component="img" height="140" image={d.image_url} alt={d.name} />
              <CardContent>
                <Typography variant="h6">{d.name}</Typography>
                <Typography>{d.description}</Typography>
                <Typography fontWeight={700}>${d.price}</Typography>
                <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                  <Button size="small" variant="outlined" onClick={() => handleOpenEdit(d)}>Edit</Button>
                  <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(d.id)}>Delete</Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{editingDish ? "Edit Dish" : "Add New Dish"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            value={newDish.name}
            onChange={(e) => setNewDish(prev => ({ ...prev, name: e.target.value }))}
            margin="dense"
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            label="Description"
            value={newDish.description}
            onChange={(e) => setNewDish(prev => ({ ...prev, description: e.target.value }))}
            margin="dense"
            error={Boolean(errors.description)}
            helperText={errors.description}
          />
          <TextField
            fullWidth
            label="Price"
            type="number"
            value={newDish.price}
            onChange={(e) => setNewDish(prev => ({ ...prev, price: e.target.value }))}
            margin="dense"
            error={Boolean(errors.price)}
            helperText={errors.price}
          />

          {/* Image Upload */}
          <TextField
            fullWidth
            label="Image"
            value={newDish.image_url}
            margin="dense"
            InputProps={{ readOnly: true }}
            onClick={() => document.getElementById("dish-image-input").click()}
            error={Boolean(errors.image_url)}
            helperText={errors.image_url}
          />
          <input
            type="file"
            id="dish-image-input"
            style={{ display: "none" }}
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                  setNewDish(prev => ({ ...prev, image_url: ev.target.result }));
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave}>{editingDish ? "Save Changes" : "Add Dish"}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
