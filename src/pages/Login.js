import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  TextField,
  Button,
  Avatar,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import TopBar from "./TopBar";
import LoginAnimation from "../assets/Welcome Green.json";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import useSnackbar from "../hooks/useSnackbar";

const Login = () => {
  const [uniqueId, setUniqueId] = useState("");
  const [userType, setUserType] = useState("student");
  const navigate = useNavigate();
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = async () => {
    if (!uniqueId) {
      showSnackbar("Please enter your ID", "warning");
      return;
    }

    try {
      const response = await fetch("/LoginRoutes/login", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uniqueId }),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      console.log("Login successful:", data);

      showSnackbar("Login successful!", "success");
      navigate("/dashboard"); // same dashboard for all roles
    } catch (error) {
      console.error(error);
      showSnackbar("Login failed: " + error.message, "error");
    }
  };

  const handleAdminLogin = () => {
    console.log("Admin login clicked");
    // Redirect to admin login page or logic
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Top Nav Bar */}
      <TopBar />

      <Divider />

      {/* Centered Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        {/* Login Card */}
        <Card sx={{ maxWidth: 400, width: "100%", p: 2, boxShadow: 3 }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              Student Access
            </Typography>
            <Typography variant="subtitle2" sx={{ mb: 2, textAlign: "center" }}>
              Enter your Student ID to access attendance
            </Typography>

            <Lottie
              animationData={LoginAnimation}
              loop={true}
              style={{ width: 300, height: 200 }}
            />

            <TextField
              label="Student ID"
              variant="outlined"
              value={uniqueId}
              onChange={(e) => setUniqueId(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              autoFocus
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
              sx={{ py: 1.5, mb: 1 }}
            >
              Access Dashboard
            </Button>

            <Divider sx={{ width: "100%", my: 2 }} />

            {/* Use modal for admin login */}
            <Button
              variant="outlined"
              fullWidth
              startIcon={<SupervisorAccountOutlinedIcon />}
              onClick={handleOpen}
            >
              Admin Login
            </Button>

            {/* If didn't registered yet */}
            <Typography variant="body2" sx={{ mt: 2 }}>
              Don't have an account?{" "}
              <Button variant="text" onClick={() => navigate("/register")}>
                Register
              </Button>
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Admin Login</DialogTitle>
        <DialogContent>
          <TextField
            label="Admin ID"
            variant="outlined"
            // value={adminId}
            // onChange={(e) => setAdminId(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            autoFocus
          />
          <TextField
            label="Password"
            variant="outlined"  
            type="password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdminLogin}>Login</Button>
        </DialogActions>
      </Dialog>
      {SnackbarComponent}
    </Box>
  );
};

export default Login;
