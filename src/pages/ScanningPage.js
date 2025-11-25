import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import TopBar from "./TopBar";
import { QRCodeCanvas } from "qrcode.react";

const ScanningPage = () => {
  const [qrValue, setQrValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastGenerated, setLastGenerated] = useState(null);

  // Generate secure login QR code on mount
  useEffect(() => {
    generateLoginQR();
  }, []);

  // ---------
  // API CALL
  // ---------

  const generateLoginQR = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/Dashboard/generate-login-qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to generate QR code");
      }

      const data = await response.json();
      setQrValue(data.qrData);
      setLastGenerated(new Date());
      console.log("Login QR code generated:", data);
    } catch (error) {
      console.error("Error generating login QR code:", error);
      setError("Failed to generate QR code. Please check admin access.");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <TopBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 1, color: "#333", textAlign: "center" }}
        >
          QR Code Scanner
        </Typography>

        <Typography
          variant="body1"
          sx={{ mb: 4, color: "#555", textAlign: "center" }}
        >
          Please scan this QR code to record your attendance
        </Typography>

        {/* QR Code Box */}
        <Box
          sx={{
            width: { xs: "250px", sm: "300px", md: "350px" },
            height: { xs: "250px", sm: "300px", md: "350px" },
            border: "4px solid #4caf50",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#fff",
            position: "relative",
            mb: 2,
          }}
        >
          <QRCodeCanvas
            value={qrValue}
            size={220}
            level={"H"}
            includeMargin={true}
          />
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2, width: "100%" }}>
            {error}
          </Alert>
        )}

        <Button
          variant="contained"
          color="success"
          sx={{ mt: 2 }}
          onClick={generateLoginQR}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? "Generating..." : "Generate New Login QR Code"}
        </Button>

        {lastGenerated && (
          <Typography
            variant="caption"
            sx={{ color: "#777", mt: 2, textAlign: "center" }}
          >
            Last generated: {lastGenerated.toLocaleTimeString()}
          </Typography>
        )}

        <Typography
          variant="caption"
          sx={{ color: "#555", mt: 1, textAlign: "center", display: "block" }}
        >
          This QR code is valid for 5 minutes and can be used for secure login
        </Typography>
      </Box>
    </>
  );
};

export default ScanningPage;
