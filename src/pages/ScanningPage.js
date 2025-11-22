import React from "react";
import { Box, Typography, Button } from "@mui/material";
import TopBar from "./TopBar";

const ScanningPage = () => {
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
        {/* Header */}
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
          Please scan here for Time In / Time Out
        </Typography>

        {/* QR Scanner Placeholder */}
        <Box
          sx={{
            width: { xs: "250px", sm: "300px", md: "400px" },
            height: { xs: "250px", sm: "300px", md: "400px" },
            border: "4px solid #4caf50",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#fff",
            position: "relative",
          }}
        >
          {/* Inner QR placeholder */}
          <Box
            sx={{
              width: { xs: "120px", sm: "150px" },
              height: { xs: "120px", sm: "150px" },
              border: "2px dashed #4caf50",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#4caf50",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            QR CODE
          </Box>

          {/* Overlay text */}
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              bottom: { xs: "-30px", sm: "-40px" },
              color: "#777",
              textAlign: "center",
              width: "100%",
            }}
          >
            Align your QR code within the frame
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ScanningPage;
