import React, { useState, useEffect, useRef } from "react";
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
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import TopBar from "./TopBar";
import LoginAnimation from "../assets/Welcome Green.json";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import useSnackbar from "../hooks/useSnackbar";
import { Html5QrcodeScanner } from "html5-qrcode";

const Login = () => {
  const [uniqueId, setUniqueId] = useState("");
  const navigate = useNavigate();
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [scannerVisible, setScannerVisible] = useState(false);
  const [adminData, setAdminData] = useState({
    adminId: "",
  });

  console.log(adminData, "adminData");

  const qrRef = useRef(null); // ref for the scanner div

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

      showSnackbar("Login successful!", "success");
      navigate("/dashboard"); // same dashboard for all roles
    } catch (error) {
      console.error(error);
      showSnackbar("Login failed: " + error.message, "error");
    }
  };

  // Handle Admin Login
  const handleAdminLogin = async () => {
    if (!adminData.adminId) {
      showSnackbar("Please enter your Admin ID", "warning");
      return;
    }

    try {
      const response = await fetch("/LoginRoutes/adminLogin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId: adminData.adminId }),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      console.log(data);

      showSnackbar("Login successful!", "success");
      navigate("/scanning");
    } catch (error) {
      console.error(error);
      showSnackbar("Login failed: " + error.message, "error");
    }
  };

  // Efffect
  useEffect(() => {
    let qrScanner;

    if (scannerVisible) {
      qrScanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: 250 },
        false
      );

      qrScanner.render(
        (decodedText) => {
          console.log("QR Code scanned:", decodedText);
          // Here you can call your login function
          alert(`QR Code scanned: ${decodedText}`);
          // Optionally hide scanner after successful scan
          setScannerVisible(false);
        },
        (errorMessage) => {
          console.warn("QR scan error:", errorMessage);
        }
      );
    }

    return () => {
      if (qrScanner) {
        qrScanner.clear().catch((err) => console.error(err));
      }
    };
  }, [scannerVisible]);

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

            <Divider
              sx={{
                width: "100%",
                my: 2,
                "&::before, &::after": {
                  borderColor: "rgba(0, 0, 0, 0.2)",
                },
                color: "rgba(0, 0, 0, 0.5)",
                fontSize: "0.9rem",
              }}
            >
              OR
            </Divider>

            <Button
              variant="outlined"
              fullWidth
              startIcon={<QrCodeScannerIcon />}
              onClick={() => setScannerVisible(true)}
              sx={{
                py: 1.5,
                borderRadius: 2,
                borderColor: "#4caf50",
                color: "#4caf50",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  borderColor: "#43a047",
                  backgroundColor: "rgba(76, 175, 80, 0.08)",
                },
              }}
            >
              Login by QR Code
            </Button>

            {scannerVisible && (
              <div
                id="qr-reader"
                ref={qrRef}
                style={{ width: "100%", marginTop: 20 }}
              ></div>
            )}

            {/* <Divider sx={{ width: "100%", my: 2 }} /> */}

            {/* For Staff to be scanned by student to be displayed on premises */}
            <Button
              sx={{ mt: 1 }}
              variant="outlined"
              fullWidth
              startIcon={<SupervisorAccountOutlinedIcon />}
              onClick={handleOpen}
            >
              Generate QR for Student Login
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
        <DialogTitle>Generate QR for Student Login</DialogTitle>
        <DialogContent>
          <TextField
            label="Admin ID"
            variant="outlined"
            value={adminData.adminId}
            onChange={(e) =>
              setAdminData({ ...adminData, adminId: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
            autoFocus
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
