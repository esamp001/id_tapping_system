import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, Avatar, MenuItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TopBar from "./TopBar";
import Lottie from "lottie-react";
import registerAnimation  from "../assets/Login lottie yellow.json"
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
        role: ""
    })

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
        const { avatar, unqiue_id, full_name, email_address, academic_grade, phone_number, role } = formData;

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
            [name]: value
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

            const response = await fetch('/RegisterRoutes/register/user', {
                method: 'PUT',
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
                role: ""
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
            <Box sx={{ p: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>

                {/* Header */}
                <Box>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        sx={{ mb: 2 }}
                        onClick={() => navigate("/")}
                    >
                        Go to Tapping
                    </Button>

                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>Register your ID</Typography>
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                            Enter your unique ID and personal details to get started with the ID tapping system.
                        </Typography>
                    </Box>
                </Box>

                {/* Main Content */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                    }}
                >
                    {/* Left Form */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',  // was 'center'
                            justifyContent: 'flex-start', // ensures content starts at the top
                            width: '40%',
                            gap: 3,
                            p: 2, // optional: adds padding inside
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>Upload Profile Picture</Typography>
                            <Typography variant="subtitle3">Choose a profile picture & upload your own</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', gap: 2 }}>
                            <Avatar
                                src={preview}
                                alt="Avatar Preview"
                                sx={{ width: 150, height: 150 }}
                            />

                            <Button
                                variant="outlined"
                                component="label"
                                sx={{ textTransform: "none", width: '100%' }}
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

                        {/* User Info */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                gap: 2,
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                User Information
                            </Typography>

                            <TextField
                                size="medium"
                                label="ID Number"
                                name="unqiue_id"
                                placeholder="e.g., ID-001-A-XYZ"
                                value={formData.unqiue_id}
                                onChange={handleChange}
                                fullWidth
                                InputProps={{ sx: { fontSize: 15, height: 45 } }}
                                InputLabelProps={{ sx: { fontSize: 14 } }}
                            />

                            <TextField
                                size="medium"
                                label="Full Name"
                                name="full_name"
                                placeholder="John Doe"
                                value={formData.full_name}
                                onChange={handleChange}
                                fullWidth
                                InputProps={{ sx: { fontSize: 15, height: 45 } }}
                                InputLabelProps={{ sx: { fontSize: 14 } }}
                            />

                            <TextField
                                size="medium"
                                label="Email Address"
                                name="email_address"
                                placeholder="john.doe@example.com"
                                type="email"
                                value={formData.email_address}
                                onChange={handleChange}
                                fullWidth
                                InputProps={{ sx: { fontSize: 15, height: 45 } }}
                                InputLabelProps={{ sx: { fontSize: 14 } }}
                            />

                            <TextField
                                size="medium"
                                label="Academic Grade"
                                name="academic_grade"
                                placeholder="e.g., Grade 1, Grade 2, Grade 3"
                                value={formData.academic_grade}
                                onChange={handleChange}
                                fullWidth
                                InputProps={{ sx: { fontSize: 15, height: 45 } }}
                                InputLabelProps={{ sx: { fontSize: 14 } }}
                            />

                            <TextField
                                size="medium"
                                label="Phone Number"
                                name="phone_number"
                                placeholder="e.g., +63 XXXX XXXXXX"
                                value={formData.phone_number}
                                onChange={handleChange}
                                fullWidth
                                InputProps={{ sx: { fontSize: 15, height: 45 } }}
                                InputLabelProps={{ sx: { fontSize: 14 } }}
                            />

                            {/* Role Dropdown */}
                            <TextField
                                select
                                size="medium"
                                label="Role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                fullWidth
                                InputProps={{ sx: { fontSize: 15, height: 45 } }}
                                InputLabelProps={{ sx: { fontSize: 14 } }}
                            >
                                {roles.map((option) => (
                                    <MenuItem key={option.value} value={option.value} sx={{ fontSize: 14 }}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <Button
                                variant="contained"
                                onClick={handleRegister}
                                sx={{
                                    mt: 1,
                                    width: '100%',
                                    fontSize: 14,
                                    height: 40,
                                    textTransform: "none",
                                    alignSelf: "flex-start",
                                }}
                            >
                                Register
                            </Button>
                        </Box>
                    </Box>


                    {/* Right Image */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',      // centers horizontally
                            justifyContent: 'end',  // centers vertically
                            width: '60%',
                            height: '77vh',           // full screen height (or adjust as needed)
                            textAlign: 'center',
                        }}
                    >
                        <Lottie
                            animationData={registerAnimation}
                            loop={true}
                            style={{ width: 400, height: 400 }}
                        />

                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, mt : 3 }}>
                            Registration Details
                        </Typography>

                        <Typography variant="subtitle2" color="text.secondary">
                            Quickly register your unique identifier and essential details to streamline system access and tracking.
                        </Typography>
                    </Box>
                </Box>
                {SnackbarComponent}
            </Box>
        </>
    );
};

export default Register;
