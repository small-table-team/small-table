import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const roles = [
    {
      name: "משתמש",
      icon: <PeopleAltIcon sx={{ fontSize: 40, color: "#651C1C" }} />,
      description: "חיפוש ובניית אירועים טעימים",
      color: "primary",
      route: "/AllCaterings",
    },
    {
      name: "בעל קייטרינג",
      icon: <BusinessCenterIcon sx={{ fontSize: 40, color: "#2e7d32" }} />,
      description: "ניהול תפריטים והזמנות בקלות",
      color: "success",
      route: "/catering-home", // נתיב לדף הבית של בעל הקייטרינג
    },
    {
      name: "מנהל",
      icon: <SettingsIcon sx={{ fontSize: 40, color: "#6a1b9a" }} />,
      description: "ניהול משתמשים והמערכת",
      color: "secondary",
    },
  ];

  const handleClick = (role) => {
    if (role.route) navigate(role.route);
    else alert(`בחרת ב-${role.name}! בהמשך זה יוביל למסך המתאים.`);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        py: 8,
        px: 2,
        textAlign: "center",
      }}
    >
      {/* כותרת עליונה */}
      <Typography variant="h4" fontWeight="bold" mb={1}>
        ברוכים הבאים!
      </Typography>
      <Typography variant="h6" color="text.secondary" mb={6}>
        בחרי את סוג המשתמש שלך כדי להתחיל
      </Typography>

      {/* רשימת הכרטיסים */}
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        gap={4}
        sx={{ px: 2 }}
      >
        {roles.map((role) => (
          <Card
            key={role.name}
            sx={{
              width: 300,
              borderRadius: 3,
              boxShadow: 4,
              textAlign: "center",
              transition: "0.3s",
              "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
            }}
          >
            <CardContent>
              <Box display="flex" justifyContent="center" mb={2}>
                {role.icon}
              </Box>
              <Typography
                variant="h6"
                fontWeight="600"
                gutterBottom
                color="text.primary"
              >
                {role.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {role.description}
              </Typography>
            </CardContent>

            <CardActions sx={{ justifyContent: "center", pb: 2 }}>
              <Button
                variant="contained"
                color={role.color}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  px: 4,
                  fontWeight: "bold",
                  bgcolor:
                    role.color === "primary"
                      ? "#651C1C"
                      : role.color === "success"
                      ? "#2e7d32"
                      : "#6a1b9a",
                  "&:hover": {
                    bgcolor:
                      role.color === "primary"
                        ? "#7e2323"
                        : role.color === "success"
                        ? "#388e3c"
                        : "#8e24aa",
                  },
                }}
                onClick={() => handleClick(role)}
              >
                בחר
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
