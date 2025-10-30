import React, { useState } from "react";
import { Box, Typography, TextField, Button, Avatar } from '@mui/material';
import RightImage from "../assets/image_right.png";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TopBar from "./TopBar";

const Register = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const [formData, setFormData] = useState({
        unqiue_id: "",
        full_name: "",
        email_address: "",
        academic_grade: "",
        phone_number: ""
    })

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleChange (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    return (
        <>
            <TopBar />
            <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>

                {/* Header */}
                <Box>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        sx={{ mb: 2 }}
                    >
                        Go to Tapping
                    </Button>

                    <Typography variant="h5" sx={{ fontWeight: 600 }}>Register your ID</Typography>
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                        Enter your unique ID and personal details to get started with the ID tapping system.
                    </Typography>
                </Box>

                {/* Main Content */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        gap: 6,
                    }}
                >
                    {/* Left Form */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: { xs: '100%', md: '40%' },
                            gap: 3,
                        }}
                    >
                        <Typography variant="h6">Upload Student Image</Typography>

                        <Avatar
                            src={preview}
                            alt="Avatar Preview"
                            sx={{ width: 100, height: 100 }}
                        />

                        <Button
                            variant="contained"
                            component="label"
                            sx={{ textTransform: "none" }}
                        >
                            Choose Image
                            <input
                                hidden
                                accept="image/*"
                                type="file"
                                onChange={handleImageChange}
                            />
                        </Button>

                        {/* User Info */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
                            <Typography variant="h6">User Information</Typography>
                            <TextField label="Unique ID" placeholder="e.g., ID-001-A-XYZ" fullWidth />
                            <TextField label="Full Name" placeholder="John Doe" fullWidth />
                            <TextField label="Email Address" placeholder="john.doe@example.com" type="email" fullWidth />
                            <TextField label="Academic Grade" placeholder="e.g., Junior, Senior, Postgraduate" fullWidth />
                            <TextField label="Phone Number" placeholder="e.g., +1 (555) 123-4567" fullWidth />

                            <Button variant="contained">Register</Button>
                        </Box>
                    </Box>

                    {/* Right Image */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: { xs: '100%', md: '25%' },
                            textAlign: 'center',
                            gap: 2,
                            ml: 10
                        }}
                    >
                        <img
                            src={RightImage}
                            alt="RightImage"
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                        <Typography variant='subtitle2'>
                            Quickly register your unique identifier and essential details to streamline system access and tracking.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Register;
