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
  const [cameraPermission, setCameraPermission] = useState(null);

  console.log(adminData, "adminData");

  const qrRef = useRef(null); // ref for the scanner div

  // Check if running in secure context
  const isSecureContext = () => {
    return (
      window.isSecureContext ||
      window.location.protocol === "https:" ||
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    );
  };

  // Check camera permissions
  const checkCameraPermission = async () => {
    try {
      // Check if running in secure context
      if (!isSecureContext()) {
        setCameraPermission("insecure_context");
        showSnackbar(
          "Camera access requires HTTPS or localhost. In development, use localhost or enable HTTPS.",
          "error"
        );
        return false;
      }

      // Check if mediaDevices is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraPermission("not_supported");
        showSnackbar("Camera not supported on this device", "error");
        return false;
      }

      // Request camera permission
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      // Stop the stream immediately after getting permission
      stream.getTracks().forEach((track) => track.stop());
      setCameraPermission("granted");
      return true;
    } catch (error) {
      console.error("Camera permission error:", error);
      setCameraPermission("denied");
      showSnackbar(
        "Camera access denied. Please enable camera permissions.",
        "error"
      );
      return false;
    }
  };

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
      const response = await fetch(`/LoginRoutes/login`, {
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

  // Handle QR Code Login
  const handleQRCodeLogin = async (qrData) => {
    try {
      // First validate the QR code
      const validateResponse = await fetch("/Dashboard/validate-qr-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ qrData }),
        credentials: "include",
      });

      const validationResult = await validateResponse.json();

      if (!validateResponse.ok || !validationResult.valid) {
        showSnackbar(validationResult.message || "Invalid QR code", "error");
        return;
      }

      // QR code is valid, now login with the admin ID from QR
      const loginResponse = await fetch("/LoginRoutes/adminLogin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId: validationResult.adminId }),
        credentials: "include",
      });

      if (!loginResponse.ok) {
        throw new Error("Login failed");
      }

      const loginData = await loginResponse.json();
      console.log(loginData);

      showSnackbar("QR Code login successful!", "success");
      navigate("/scanning");
    } catch (error) {
      console.error(error);
      showSnackbar("QR Code login failed: " + error.message, "error");
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

  // QR Scanner Effect with mobile support
  useEffect(() => {
    let qrScanner;

    if (scannerVisible) {
      // Mobile-optimized configuration
      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        disableFlip: false,
        supportedScanTypes: [0], // 0 = camera scan
        videoConstraints: {
          facingMode: "environment", // Use rear camera on mobile
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      };

      qrScanner = new Html5QrcodeScanner("qr-reader", config, false);

      qrScanner.render(
        async (decodedText) => {
          console.log("QR Code scanned:", decodedText);
          // Vibrate on mobile for feedback (if supported)
          if (navigator.vibrate) {
            navigator.vibrate(200);
          }
          await handleQRCodeLogin(decodedText);
          setScannerVisible(false);
        },
        (errorMessage) => {
          // Only log errors that aren't just "no QR code found"
          if (!errorMessage.includes("No QR code found")) {
            console.warn("QR scan error:", errorMessage);
          }
        }
      );
    }

    return () => {
      if (qrScanner) {
        qrScanner.clear().catch((err) => console.error(err));
      }
    };
  }, [scannerVisible, handleQRCodeLogin]);

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
              <Box sx={{ width: "100%", mt: 2 }}>
                <Typography
                  variant="body2"
                  sx={{ mb: 1, textAlign: "center", color: "#666" }}
                >
                  Position QR code within the frame to scan
                </Typography>
                <div
                  id="qr-reader"
                  ref={qrRef}
                  style={{
                    width: "100%",
                    minHeight: "300px",
                    position: "relative",
                  }}
                ></div>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={() => setScannerVisible(false)}
                  sx={{ mt: 1, width: "100%" }}
                >
                  Cancel Scanning
                </Button>
              </Box>
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
