import React, { useEffect, useState } from "react";
import {
  Box, Grid, Card, CardMedia, CardContent, CardActions, Typography,
  Button, TextField, MenuItem
} from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { cateringsService } from "../services/cateringsService";

export default function AllCateringsPage() {
  const navigate = useNavigate();
  const [caterings, setCaterings] = useState([]);
  const [filteredCaterings, setFilteredCaterings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openImage, setOpenImage] = useState(null);

  // מסננים
  const [filterKashrut, setFilterKashrut] = useState("");
  const [filterRegion, setFilterRegion] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    cateringsService.getAll().then((data) => {
      setCaterings(data);
      setFilteredCaterings(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    // סינון דינמי לפי כל השדות
    const filtered = caterings.filter(c => 
      (filterKashrut ? c.kashrut === filterKashrut : true) &&
      (filterRegion ? c.region === filterRegion : true) &&
      (filterName ? c.name.toLowerCase().includes(filterName.toLowerCase()) : true)
    );
    setFilteredCaterings(filtered);
  }, [filterKashrut, filterRegion, filterName, caterings]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", py: 10 }}>
        <Typography>טוען קייטרינגים...</Typography>
      </Box>
    );
  }

  // אוספים את כל הערכים האפשריים לכל שדה למסננים
  const kashrutOptions = [...new Set(caterings.map(c => c.kashrut))];
  const regionOptions = [...new Set(caterings.map(c => c.region))];

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, dir: "rtl" }}>
      <Typography variant="h6" fontWeight={700} mb={2}>
        כל הקייטרינגים
      </Typography>

      {/* מסננים */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
        <TextField
          select
          label="כשרות"
          value={filterKashrut}
          onChange={(e) => setFilterKashrut(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">הכל</MenuItem>
          {kashrutOptions.map(opt => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="אזור"
          value={filterRegion}
          onChange={(e) => setFilterRegion(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">הכל</MenuItem>
          {regionOptions.map(opt => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </TextField>

        <TextField
          label="חיפוש לפי שם"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          sx={{ minWidth: 200 }}
        />
      </Box>

      {/* רשימת הקייטרינגים */}
      <Grid container spacing={2}>
        {filteredCaterings.map((catering) => (
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
                <Typography variant="body2" color="text.secondary" mt={0.5}>
                  כשרות: {catering.kashrut} | אזור: {catering.region}
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
