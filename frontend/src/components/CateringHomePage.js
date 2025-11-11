import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  DialogTitle,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CateringHomePage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [packages, setPackages] = useState([]);
  const [newPackage, setNewPackage] = useState({ name: "", description: "", price: "", image: "" });

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleSavePackage = () => {
    const id = packages.length + 1;
    setPackages([...packages, { id, ...newPackage }]);
    setNewPackage({ name: "", description: "", price: "", image: "" });
    setOpenDialog(false);
  };

  const handleOpenImage = (image) => setModalImage(image);
  const handleCloseImage = () => setModalImage(null);

  const handleDeletePackage = (id) => {
    setPackages(packages.filter(pkg => pkg.id !== id));
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", py: 4, px: 2 }}>
      <Typography variant="h4" fontWeight={700} textAlign="center" gutterBottom>
        Catering Dashboard
      </Typography>

      <Box textAlign="center" mb={4}>
        <Button
          variant="contained"
          sx={{ bgcolor: "#651C1C", py: 1.5, px: 4, borderRadius: 2, fontWeight: "bold", textTransform: "none", ":hover": { bgcolor: "#7e2323" } }}
          onClick={handleOpenDialog}
        >
          Add New Dish
        </Button>
      </Box>

      <Grid container spacing={2} direction="column" alignItems="center">
        {packages.map((pkg) => (
          <Grid item xs={12} key={pkg.id} sx={{ width: "100%", maxWidth: 400 }}>
            <Card sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                height="200"
                image={pkg.image}
                alt={pkg.name}
                onClick={() => handleOpenImage(pkg.image)}
                sx={{ objectFit: "cover", width: "100%" }}
              />
              <CardContent>
                <Typography variant="h6" fontWeight={600}>{pkg.name}</Typography>
                <Typography variant="body2" color="text.secondary">{pkg.description}</Typography>
                <Typography variant="subtitle1" fontWeight={700}>Price: ${pkg.price}</Typography>
              </CardContent>
              <IconButton
                sx={{ position: "absolute", top: 5, right: 5, bgcolor: "rgba(255,255,255,0.8)" }}
                onClick={() => handleDeletePackage(pkg.id)}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Dish</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Dish Name"
            value={newPackage.name}
            onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            value={newPackage.description}
            onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            label="Price"
            type="number"
            value={newPackage.price}
            onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => setNewPackage({ ...newPackage, image: reader.result });
                reader.readAsDataURL(file);
              }
            }}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSavePackage} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!modalImage} onClose={handleCloseImage} maxWidth="sm" fullWidth>
        <img src={modalImage} alt="Dish" style={{ width: "100%", display: "block" }} />
      </Dialog>
    </Box>
  );
}
