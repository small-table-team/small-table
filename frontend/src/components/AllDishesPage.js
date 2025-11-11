// src/components/AllDishesPage.jsx
import React, { useMemo, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Chip,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Button,
  Stack,
  Checkbox,
  FormControlLabel,
  Divider,
  Badge,
} from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";

// דוגמת נתונים (מוחלפים בעתיד בנתונים מהשרת)
const MOCK_DISHES = [
  {
    id: "d1",
    name: "שניצל פריך",
    image:
      "https://images.unsplash.com/photo-1604908177522-4b2f9d1c3f7b?w=800&q=60",
    price: 45,
    category: "ראשונות",
    cuisine: "אירופאי",
    tags: ["בשרי"],
    vegan: false,
    glutenFree: false,
    portionSize: "יחידה",
    rating: 4.5,
    cateringId: "c1",
    description: "שניצל פריך עם סלט ירוק ורוטב ביתי.",
  },
  {
    id: "d2",
    name: "סלט קיסר",
    image:
      "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=60",
    price: 30,
    category: "סלטים",
    cuisine: "ים תיכוני",
    tags: ["צמחוני"],
    vegan: false,
    glutenFree: true,
    portionSize: "לשיתוף",
    rating: 4.1,
    cateringId: "c2",
    description: "סלט רענן עם רוטב קיסר ביתי וגבינת פרמזן.",
  },
  {
    id: "d3",
    name: "קערת בודאלתוס (צמחוני)",
    image:
      "https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642?w=800&q=60",
    price: 38,
    category: "עיקריות",
    cuisine: "מזרח תיכון",
    tags: ["צמחוני", "כשר"],
    vegan: true,
    glutenFree: false,
    portionSize: "יחידה",
    rating: 4.8,
    cateringId: "c3",
    description: "מנות ירקות קלויים, קינואה ורוטב טחינה.",
  },
  // הוסיפי עוד דוגמאות לפי הצורך...
];

function uniqueValues(items = [], key) {
  const set = new Set();
  items.forEach((it) => {
    const v = it?.[key];
    if (Array.isArray(v)) v.forEach((x) => set.add(x));
    else if (v !== undefined && v !== null) set.add(v);
  });
  return Array.from(set);
}

export default function AllDishesPage({ dishes = MOCK_DISHES }) {
  // מצב סינונים
  const [filterCategory, setFilterCategory] = useState("");
  const [filterCuisine, setFilterCuisine] = useState("");
  const [filterTags, setFilterTags] = useState([]); // multi
  const [filterVegan, setFilterVegan] = useState(false);
  const [filterGlutenFree, setFilterGlutenFree] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 200]); // min/max
  const [searchDescription, setSearchDescription] = useState("");
  const [searchName, setSearchName] = useState("");
  const [openImage, setOpenImage] = useState(null);
  const [showFilters, setShowFilters] = useState(true);

  // אופציות לסינון (מנוטרות מתוך המנות)
  const categories = useMemo(() => ["", ...uniqueValues(dishes, "category")], [dishes]);
  const cuisines = useMemo(() => ["", ...uniqueValues(dishes, "cuisine")], [dishes]);
  const tagsOptions = useMemo(() => uniqueValues(dishes, "tags"), [dishes]);
  const prices = useMemo(() => {
    const vals = dishes.map((d) => Number(d.price ?? 0)).filter((p) => !isNaN(p));
    if (vals.length === 0) return [0, 200];
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    return [Math.floor(min), Math.ceil(max)];
  }, [dishes]);

  // אתחול טווח המחיר לפי הנתונים בפעם הראשונה
  React.useEffect(() => {
    if (prices && priceRange[0] === 0 && priceRange[1] === 200) {
      setPriceRange([prices[0], prices[1]]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prices]);

  // פילטר בפועל
  const filtered = useMemo(() => {
    return dishes.filter((d) => {
      // בטיחות: תמיד תוודא שיש אובייקט
      if (!d) return false;

      // שם (חיפוש בשדה השם)
      if (searchName.trim()) {
        const s = searchName.trim().toLowerCase();
        if (!String(d.name ?? "").toLowerCase().includes(s)) return false;
      }

      // קטגוריה
      if (filterCategory && d.category !== filterCategory) return false;

      // מטבח
      if (filterCuisine && d.cuisine !== filterCuisine) return false;

      // תגיות (כל התגים שנבחרו חייבים להיות במנה — אפשר לשנות ל ANY)
      if (filterTags.length > 0) {
        const dishTags = Array.isArray(d.tags) ? d.tags.map((t) => String(t).toLowerCase()) : [];
        const needed = filterTags.map((t) => String(t).toLowerCase());
        const hasAll = needed.every((nt) => dishTags.includes(nt));
        if (!hasAll) return false;
      }

      // ויגן / גלוטן פרי
      if (filterVegan && !d.vegan) return false;
      if (filterGlutenFree && !d.glutenFree) return false;

      // מחיר בטווח
      const price = Number(d.price ?? 0);
      if (isNaN(price)) return false;
      if (price < priceRange[0] || price > priceRange[1]) return false;

      // תיאור — חיפוש חופשי בתוך description
      if (searchDescription.trim()) {
        const s = searchDescription.trim().toLowerCase();
        if (!String(d.description ?? "").toLowerCase().includes(s)) return false;
      }

      return true;
    });
  }, [
    dishes,
    filterCategory,
    filterCuisine,
    filterTags,
    filterVegan,
    filterGlutenFree,
    priceRange,
    searchDescription,
    searchName,
  ]);

  // אפס סינונים
  const clearFilters = () => {
    setFilterCategory("");
    setFilterCuisine("");
    setFilterTags([]);
    setFilterVegan(false);
    setFilterGlutenFree(false);
    setPriceRange([prices[0], prices[1]]);
    setSearchDescription("");
    setSearchName("");
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, dir: "rtl" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight={700}>
          כל המנות
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={() => setShowFilters((s) => !s)}
            size="small"
          >
            סינונים
          </Button>
          <Button variant="text" startIcon={<ClearIcon />} onClick={clearFilters} size="small">
            נקה
          </Button>
          <Chip label={`${filtered.length} תוצאות`} color="primary" />
        </Stack>
      </Stack>

      {/* אזור סינון */}
      {showFilters && (
        <Box
          sx={{
            mb: 2,
            p: 2,
            borderRadius: 2,
            backgroundColor: "background.paper",
            boxShadow: 1,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="חיפוש בשם"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                fullWidth
                size="small"
              />
            </Grid>

            <Grid item xs={6} sm={3}>
              <FormControl fullWidth size="small">
                <InputLabel>קטגוריה</InputLabel>
                <Select
                  value={filterCategory}
                  label="קטגוריה"
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  {categories.map((c) => (
                    <MenuItem key={c || "all"} value={c}>
                      {c || "הכל"}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} sm={3}>
              <FormControl fullWidth size="small">
                <InputLabel>מטבח</InputLabel>
                <Select
                  value={filterCuisine}
                  label="מטבח"
                  onChange={(e) => setFilterCuisine(e.target.value)}
                >
                  {cuisines.map((c) => (
                    <MenuItem key={c || "allc"} value={c}>
                      {c || "הכל"}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="חיפוש בתיאור (חופשי)"
                value={searchDescription}
                onChange={(e) => setSearchDescription(e.target.value)}
                fullWidth
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>תגיות (בחירה מרובה)</InputLabel>
                <Select
                  multiple
                  value={filterTags}
                  onChange={(e) => setFilterTags(e.target.value)}
                  renderValue={(selected) => selected.join(", ")}
                  label="תגיות"
                >
                  {tagsOptions.map((t) => (
                    <MenuItem key={t} value={t}>
                      <Checkbox checked={filterTags.indexOf(t) > -1} />
                      <Typography>{t}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="caption" display="block" mb={1}>
                טווח מחיר: {priceRange[0]} - {priceRange[1]}
              </Typography>
              <Slider
                value={priceRange}
                onChange={(_, newValue) => setPriceRange(newValue)}
                valueLabelDisplay="auto"
                min={prices[0]}
                max={prices[1]}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Checkbox checked={filterVegan} onChange={(e) => setFilterVegan(e.target.checked)} />}
                label="טבעוני"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={filterGlutenFree} onChange={(e) => setFilterGlutenFree(e.target.checked)} />
                }
                label="ללא גלוטן"
              />
            </Grid>
          </Grid>
        </Box>
      )}

      <Divider sx={{ mb: 2 }} />

      {/* רשת תצוגה של מנות */}
      <Grid container spacing={2}>
        {filtered.length === 0 ? (
          <Grid item xs={12}>
            <Box sx={{ textAlign: "center", py: 6 }}>
              <Typography variant="h6" color="text.secondary">
                לא נמצאו מנות לפי הקריטריונים
              </Typography>
              <Button sx={{ mt: 2 }} onClick={clearFilters} variant="outlined">
                הצג הכל
              </Button>
            </Box>
          </Grid>
        ) : (
          filtered.map((dish) => (
            <Grid item key={dish.id} xs={12} sm={6} md={4}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    image={dish.image}
                    alt={dish.name}
                    sx={{ height: { xs: 160, sm: 180 }, objectFit: "cover" }}
                  />
                  <IconButton
                    aria-label="zoom"
                    onClick={() => setOpenImage(dish)}
                    sx={{ position: "absolute", top: 8, left: 8, bgcolor: "rgba(255,255,255,0.8)" }}
                  >
                    <ZoomInIcon />
                  </IconButton>
                  <Badge
                    badgeContent={`${dish.price}₪`}
                    color="primary"
                    sx={{ position: "absolute", top: 8, right: 8 }}
                  />
                </Box>

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" fontWeight={700}>
                    {dish.name}
                  </Typography>

                  <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
                    <Chip label={dish.category} size="small" />
                    <Chip label={dish.cuisine} size="small" />
                    {dish.tags?.slice(0, 3).map((t) => (
                      <Chip key={t} label={t} size="small" variant="outlined" />
                    ))}
                  </Stack>

                  <Typography variant="body2" color="text.secondary" mt={1} noWrap>
                    {dish.description}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button size="small" onClick={() => alert(`בחרת את ${dish.name}`)}>
                    בחר
                  </Button>
                  <Typography variant="caption" color="text.secondary" ml="auto" sx={{ mr: 1 }}>
                    {dish.rating ? `⭐ ${dish.rating}` : ""}
                  </Typography>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* דיאלוג תמונה גדול */}
      <Dialog open={!!openImage} onClose={() => setOpenImage(null)} maxWidth="md" fullWidth>
        <DialogTitle>{openImage?.name}</DialogTitle>
        <DialogContent dividers>
          {openImage && (
            <Box component="img" src={openImage.image} alt={openImage.name} sx={{ width: "100%", height: "auto" }} />
          )}
          <Typography mt={2}>{openImage?.description}</Typography>
          <Stack direction="row" spacing={1} mt={2}>
            <Chip label={`מחיר: ${openImage?.price}₪`} />
            <Chip label={`קטגוריה: ${openImage?.category}`} />
            <Chip label={`מטבח: ${openImage?.cuisine}`} />
            {openImage?.tags?.map((t) => (
              <Chip key={t} label={t} />
            ))}
          </Stack>
        </DialogContent>
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Button onClick={() => setOpenImage(null)}>סגור</Button>
        </Box>
      </Dialog>
    </Box>
  );
}
