import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'; // הוסף את זה

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    // כאן תוכל לשים את הלוגיקה של הרשמה לשרת
    const fakeResponse = await new Promise((res) =>
      setTimeout(() => res({ status: "ok" }), 1000)
    );

    setLoading(false);
    setStatus(fakeResponse.status);
    if (fakeResponse.status === "ok") navigate("/login"); // לאחר הרשמה מוצלחת, מעבירים לדף ההתחברות
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: "#f5f5f5", px: 2 }}
    >
      <Paper
        elevation={6}
        sx={{
          borderRadius: 3,
          p: 5,
          width: "100%",
          maxWidth: 420,
          textAlign: "center",
        }}
      >
        {/* כותרת */}
        <Typography variant="h5" fontWeight={700} mb={1}>
          Sign Up
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={4}>
          Please sign up to get started
        </Typography>

        {/* טופס */}
        <Box component="form" onSubmit={handleSignUp}>
          <Typography
            variant="caption"
            color="text.secondary"
            fontWeight={600}
            align="left"
            display="block"
          >
            NAME
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            size="small"
            margin="dense"
          />

          <Typography
            variant="caption"
            color="text.secondary"
            fontWeight={600}
            align="left"
            display="block"
            mt={2}
          >
            EMAIL
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            size="small"
            margin="dense"
          />

          <Typography
            variant="caption"
            color="text.secondary"
            fontWeight={600}
            align="left"
            display="block"
            mt={2}
          >
            PASSWORD
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            size="small"
            margin="dense"
          />

          <Typography
            variant="caption"
            color="text.secondary"
            fontWeight={600}
            align="left"
            display="block"
            mt={2}
          >
            RE-TYPE PASSWORD
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            type="password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            placeholder="••••••••"
            size="small"
            margin="dense"
          />

          {/* כפתור הרשמה */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              bgcolor: "#651C1C",
              py: 1.5,
              borderRadius: 2,
              fontWeight: "bold",
              textTransform: "none",
              ":hover": { bgcolor: "#7e2323" },
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "SIGN UP"}
          </Button>

          {status === "ok" && (
            <Typography color="success.main" mt={2}>
              Sign Up Successful ✅
            </Typography>
          )}
        </Box>

        {/* לינק ללוגין */}
        <Typography mt={4} variant="body2" color="text.secondary">
          Already have an account?{" "}
          <Link href="/login" color="primary" fontWeight="600">
            LOG IN
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
