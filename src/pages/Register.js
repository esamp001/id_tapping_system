import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  MenuItem,
  Paper,
  Divider,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TopBar from "./TopBar";
import Lottie from "lottie-react";
import registerAnimation from "../assets/Login lottie yellow.json";
import useSnackbar from "../hooks/useSnackbar";
import { useNavigate } from "react-router-dom";

const roles = [
  { value: "student", label: "Student" },
  { value: "teacher", label: "Teacher" },
  { value: "admin", label: "Admin" },
  { value: "staff", label: "Staff" },
];

const Register = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const [formData, setFormData] = useState({
    avatar: "",
    unqiue_id: "",
    full_name: "",
    email_address: "",
    academic_grade: "",
    phone_number: "",
    role: "",
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        avatar: file,
      }));
      setPreview(URL.createObjectURL(file)); // For image preview
    }
  };

  const handleValidation = () => {
    const {
      avatar,
      unqiue_id,
      full_name,
      email_address,
      academic_grade,
      phone_number,
      role,
    } = formData;

    // Check required fields
    if (!unqiue_id.trim()) {
      showSnackbar("ID Number is required", "error");
      return false;
    }

    if (!full_name.trim()) {
      showSnackbar("Full Name is required", "error");
      return false;
    }

    if (!email_address.trim()) {
      showSnackbar("Email Address is required", "error");
      return false;
    }

    // Basic email regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email_address)) {
      showSnackbar("Email Address is invalid", "error");
      return false;
    }

    if (!academic_grade.trim()) {
      showSnackbar("Academic Grade is required", "error");
      return false;
    }

    if (!phone_number.trim()) {
      showSnackbar("Phone Number is required", "error");
      return false;
    }

    // Optional: validate phone number pattern
    const phoneRegex = /^\+?\d{10,15}$/;
    if (!phoneRegex.test(phone_number)) {
      showSnackbar("Phone Number is invalid", "error");
      return false;
    }

    if (!role.trim()) {
      showSnackbar("Role is required", "error");
      return false;
    }

    // Optional: check avatar file
    if (!avatar) {
      showSnackbar("Avatar is required", "error");
      return false;
    }

    // All validations passed
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // API FETCH - HANDLE REGISTER
  const handleRegister = async () => {
    try {
      // Create FormData for sending files (avatar + other fields)
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key, value);
      });

      if (!handleValidation()) {
        return; // stop if validation fails
      }

      const response = await fetch("/RegisterRoutes/register/user", {
        method: "PUT",
        body: formPayload,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Show success snackbar
      showSnackbar("User registered successfully!", "success");

      // Optional: clear form or do something with result
      setFormData({
        avatar: "",
        unqiue_id: "",
        full_name: "",
        email_address: "",
        academic_grade: "",
        phone_number: "",
        role: "",
      });
      setPreview(null);
    } catch (error) {
      console.error(error);
      // Show error snackbar
      showSnackbar("Failed to register user. Please try again.", "error");
    }
  };

  return (
    <>
      <TopBar />
      <Box
        sx={{
          minHeight: "100vh",
          py: { xs: 3, md: 5 },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          sx={{
            mb: 3,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
          }}
          onClick={() => navigate("/")}
        >
          Back to Tapping
        </Button>
        <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, mb: 1, color: "primary.main" }}
              >
                Create Your Account
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Join the ID tapping system in just a few steps
              </Typography>
            </Box>
          </Box>

          {/* Main Content */}
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
            container
            spacing={4}
          >
            {/* Left Side - Form */}
            <Grid item xs={12} md={7}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {/* Profile Picture Card */}
                <Paper
                  elevation={2}
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    bgcolor: "white",
                  }}
                >
                  <Box sx={{ textAlign: "center", mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Profile Picture
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Upload a clear photo of yourself
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 2.5,
                    }}
                  >
                    <Avatar
                      src={preview}
                      alt="Profile Preview"
                      sx={{
                        width: 140,
                        height: 140,
                        border: "4px solid",
                        borderColor: "primary.light",
                        boxShadow: 3,
                      }}
                    />

                    <Button
                      variant="contained"
                      component="label"
                      sx={{
                        textTransform: "none",
                        px: 4,
                        py: 1.2,
                        borderRadius: 2,
                        fontWeight: 500,
                      }}
                    >
                      Choose Image
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={handleImageChange}
                      />
                    </Button>
                  </Box>
                </Paper>

                {/* Personal Information Card */}
                <Paper
                  elevation={2}
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    bgcolor: "white",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Personal Information
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    Please provide your basic details
                  </Typography>

                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
                  >
                    <TextField
                      label="ID Number"
                      name="unqiue_id"
                      placeholder="e.g., ID-001-A-XYZ"
                      value={formData.unqiue_id}
                      onChange={handleChange}
                      fullWidth
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        },
                      }}
                    />

                    <TextField
                      label="Full Name"
                      name="full_name"
                      placeholder="John Doe"
                      value={formData.full_name}
                      onChange={handleChange}
                      fullWidth
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        },
                      }}
                    />

                    <TextField
                      select
                      label="Role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      fullWidth
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        },
                      }}
                    >
                      {roles.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      label="Academic Grade"
                      name="academic_grade"
                      placeholder="e.g., Grade 10, Year 3"
                      value={formData.academic_grade}
                      onChange={handleChange}
                      fullWidth
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Box>
                </Paper>

                {/* Contact Information Card */}
                <Paper
                  elevation={2}
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    bgcolor: "white",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Contact Information
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    How can we reach you?
                  </Typography>

                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
                  >
                    <TextField
                      label="Email Address"
                      name="email_address"
                      placeholder="john.doe@example.com"
                      type="email"
                      value={formData.email_address}
                      onChange={handleChange}
                      fullWidth
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        },
                      }}
                    />

                    <TextField
                      label="Phone Number"
                      name="phone_number"
                      placeholder="+63 XXX XXX XXXX"
                      value={formData.phone_number}
                      onChange={handleChange}
                      fullWidth
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Box>
                </Paper>

                {/* Register Button */}
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleRegister}
                  sx={{
                    py: 1.8,
                    fontSize: 16,
                    fontWeight: 600,
                    textTransform: "none",
                    borderRadius: 2,
                    boxShadow: 3,
                    "&:hover": {
                      boxShadow: 6,
                    },
                  }}
                >
                  Complete Registration
                </Button>
              </Box>
            </Grid>

            {/* Right Side - Info & Animation */}
            <Grid item xs={12} md={5}>
              <Paper
                elevation={2}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  bgcolor: "white",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  position: "sticky",
                  top: 20,
                }}
              >
                <Lottie
                  animationData={registerAnimation}
                  loop={true}
                  style={{ width: "100%", maxWidth: 350, height: "auto" }}
                />

                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, mb: 2, mt: 2, color: "primary.main" }}
                >
                  Welcome Students!
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Register your unique ID and join our streamlined tracking
                  system.
                </Typography>

                <Divider sx={{ width: "100%", my: 3 }} />

                <Box sx={{ textAlign: "left", width: "100%" }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, mb: 1.5 }}
                  >
                    What you'll get:
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      ✓ Instant system access
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ✓ Secure ID tracking
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ✓ Quick tap authentication
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ✓ Real-time monitoring
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
        {SnackbarComponent}
      </Box>
    </>
  );
};

export default Register;
