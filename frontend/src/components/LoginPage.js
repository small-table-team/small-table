import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Link,
  Stack,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import AppleIcon from "@mui/icons-material/Apple";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    // בדיקה אם השדות ריקים
    if (!email || !password) {
      setStatus({ type: "error", message: "Please fill in all fields" });
      return;
    }

    setLoading(true);
    setStatus(null);

    // סימולציה של קריאה לשרת
    const fakeResponse = await new Promise((res) =>
      setTimeout(() => res({ status: "ok" }), 1000)
    );

    setLoading(false);

    if (fakeResponse.status === "ok") {
      setStatus({ type: "success", message: "Login Successful ✅" });
      navigate("/HomePage");
    } else {
      setStatus({ type: "error", message: "Login failed ❌" });
    }
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
          Log In
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={4}>
          Please sign in to your existing account
        </Typography>

        {/* טופס */}
        <Box component="form" onSubmit={handleLogin}>
          <Typography
            variant="caption"
            color="text.secondary"
            fontWeight={600}
            align="left"
            display="block"
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

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mt={1}
            mb={3}
          >
            <FormControlLabel
              control={<Checkbox size="small" />}
              label={<Typography variant="body2">Remember me</Typography>}
            />
            <Link href="#" underline="none" color="primary" variant="body2">
              Forgot Password?
            </Link>
          </Stack>

          {/* כפתור התחברות */}
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
            {loading ? <CircularProgress size={24} color="inherit" /> : "LOG IN"}
          </Button>

          {/* הודעות שגיאה/הצלחה */}
          {status && (
            <Typography
              color={status.type === "success" ? "success.main" : "error"}
              mt={2}
            >
              {status.message}
            </Typography>
          )}
        </Box>

        {/* לינק להרשמה */}
        <Typography mt={4} variant="body2" color="text.secondary">
          Don’t have an account?{" "}
          <Link component={RouterLink} to="/signup" color="primary" fontWeight="600">
            SIGN UP
          </Link>
        </Typography>

        {/* רשתות חברתיות */}
        <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#1877F2",
              minWidth: 48,
              height: 48,
              borderRadius: "50%",
              ":hover": { bgcolor: "#166fe5" },
            }}
          >
            <FacebookIcon />
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#1DA1F2",
              minWidth: 48,
              height: 48,
              borderRadius: "50%",
              ":hover": { bgcolor: "#1a91da" },
            }}
          >
            <TwitterIcon />
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#000",
              minWidth: 48,
              height: 48,
              borderRadius: "50%",
              ":hover": { bgcolor: "#333" },
            }}
          >
            <AppleIcon />
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
