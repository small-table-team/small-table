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
import { usersService } from "../services/usersService";

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !rePassword || !role) {
      setStatus({ type: "error", message: "Please fill in all fields" });
      return;
    }

    if (password !== rePassword) {
      setStatus({ type: "error", message: "Passwords do not match" });
      return;
    }

    setLoading(true);
    const result = usersService.register(name, email, password, role);
    setLoading(false);

    if (result.error) {
      setStatus({ type: "error", message: result.error });
    } else {
      setStatus({ type: "success", message: "Sign Up Successful ✅" });
      if (result.role === "user") {
        navigate("/AllCaterings");
      } else if (result.role === "catering") {
        navigate("/catering-home");
      } else if (result.role === "admin") {
        navigate("/admin-home"); // או מסלול מתאים
      }
      
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ backgroundColor: "#f5f5f5", px: 2 }}>
      <Paper elevation={6} sx={{ borderRadius: 3, p: 5, width: "100%", maxWidth: 420, textAlign: "center" }}>
        <Typography variant="h5" fontWeight={700} mb={1}>Sign Up</Typography>
        <Typography variant="body2" color="text.secondary" mb={4}>Please sign up to get started</Typography>

        <Box component="form" onSubmit={handleSignUp}>
          <Typography variant="caption" color="text.secondary" fontWeight={600} align="left" display="block">NAME</Typography>
          <TextField variant="outlined" fullWidth value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" size="small" margin="dense" />

          <Typography variant="caption" color="text.secondary" fontWeight={600} align="left" display="block" mt={2}>EMAIL</Typography>
          <TextField variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@gmail.com" size="small" margin="dense" />

          <Typography variant="caption" color="text.secondary" fontWeight={600} align="left" display="block" mt={2}>PASSWORD</Typography>
          <TextField variant="outlined" fullWidth type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" size="small" margin="dense" />

          <Typography variant="caption" color="text.secondary" fontWeight={600} align="left" display="block" mt={2}>RE-TYPE PASSWORD</Typography>
          <TextField variant="outlined" fullWidth type="password" value={rePassword} onChange={(e) => setRePassword(e.target.value)} placeholder="••••••••" size="small" margin="dense" />

          {/* ✔ הוספת בחירת סטטוס */}
          <Typography variant="caption" color="text.secondary" fontWeight={600} align="left" display="block" mt={2}>ROLE</Typography>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "4px" }}
          >
            <option value="">Choose role</option>
            <option value="user">משתמש</option>
            <option value="catering">בעל קייטרינג</option>
            <option value="admin">מנהל</option>
          </select>

          <Button type="submit" fullWidth variant="contained" sx={{ bgcolor: "#651C1C", py: 1.5, borderRadius: 2, fontWeight: "bold", textTransform: "none", ":hover": { bgcolor: "#7e2323" } }} disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : "SIGN UP"}
          </Button>

          {status && <Typography color={status.type === "success" ? "success.main" : "error"} mt={2}>{status.message}</Typography>}
        </Box>
      </Paper>
    </Box>
  );
}
