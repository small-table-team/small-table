import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";
import { useParams } from "react-router-dom";
import { dishesService } from "../services/dishesService";
import { cateringsService } from "../services/cateringsService";

export default function CateringHomePage() {
  const { cateringId } = useParams();
  const [catering, setCatering] = useState(null);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const numericId = Number(cateringId);

    // שליפת פרטי הקייטרינג
    cateringsService.getAll().then(all => {
      const found = all.find(c => c.id === numericId);
      setCatering(found || null);
    });

    // שליפת מנות מה־JSON לפי קייטרינג
    dishesService.getByCateringId(numericId).then(setDishes);
  }, [cateringId]);

  if (!catering) return <Typography sx={{ p: 3 }}>Loading catering...</Typography>;

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 4, px: 2 }}>
      <Typography variant="h4" fontWeight={700} textAlign="center" gutterBottom>
        {catering.name} Dashboard
      </Typography>
      <Typography variant="body1" textAlign="center" mb={4}>
        {catering.description} | Location: {catering.location}
      </Typography>

      <Grid container spacing={2} direction="column" alignItems="center">
        {dishes.map((dish) => (
          <Grid item xs={12} key={dish.id} sx={{ width: "100%", maxWidth: 400 }}>
            <Card sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                height="200"
                image={dish.image}
                alt={dish.name}
                sx={{ objectFit: "cover", width: "100%" }}
              />
              <CardContent>
                <Typography variant="h6" fontWeight={600}>{dish.name}</Typography>
                <Typography variant="body2" color="text.secondary">{dish.description}</Typography>
                <Typography variant="subtitle1" fontWeight={700}>Price: ${dish.price}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
