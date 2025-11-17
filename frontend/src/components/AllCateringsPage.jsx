import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardMedia, CardContent, CardActions, Typography, Chip, IconButton, Stack, Button } from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { useNavigate } from "react-router-dom";
import { cateringsService } from "../services/cateringsService";

export default function AllCateringsPage() {
  const navigate = useNavigate();
  const [caterings, setCaterings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openImage, setOpenImage] = useState(null);

  useEffect(() => {
    cateringsService.getAll().then((data) => {
      setCaterings(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", py: 10 }}>
        <Typography>טוען קייטרינגים...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, dir: "rtl" }}>
      <Typography variant="h6" fontWeight={700} mb={2}>
        כל הקייטרינגים
      </Typography>

      <Grid container spacing={2}>
        {caterings.map((catering) => (
          <Grid item key={catering.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  image={catering.image || "https://via.placeholder.com/400x200"}
                  alt={catering.name}
                  sx={{ height: { xs: 160, sm: 180 }, objectFit: "cover" }}
                />
                <IconButton
                  aria-label="zoom"
                  onClick={() => setOpenImage(catering)}
                  sx={{ position: "absolute", top: 8, left: 8, bgcolor: "rgba(255,255,255,0.8)" }}
                >
                  <ZoomInIcon />
                </IconButton>
              </Box>

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" fontWeight={700}>
                  {catering.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1} noWrap>
                  {catering.description}
                </Typography>
              </CardContent>

              <CardActions>
                <Button size="small" onClick={() => navigate(`/catering/${catering.id}`)}>
                  פתח חבילה
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
