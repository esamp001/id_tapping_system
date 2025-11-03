import React, { useEffect, useState } from "react";
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

    useEffect(() => {
        console.log(formData, "formData")
    }, [formData])

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // API FETCH - HANDLE REGISTER
    const handleRegister = () => {

    }

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
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        border: '1px solid'
                    }}
                >
                    {/* Left Form */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',  // was 'center'
                            justifyContent: 'flex-start', // ensures content starts at the top
                            width: { xs: '100%', md: '40%' },
                            gap: 3,
                            border: '1px solid red',
                            p: 2, // optional: adds padding inside
                        }}
                    >
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>Upload Profile Picture</Typography>
                            <Typography variant="subtitle3">Choose a profile picture & upload your own</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', gap :2}}>
                            <Avatar
                                src={preview}
                                alt="Avatar Preview"
                                sx={{ width: 100, height: 100 }}
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
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
                            <Typography variant="h6">User Information</Typography>
                            <TextField
                                label="ID Number"
                                name="unqiue_id"
                                placeholder="e.g., ID-001-A-XYZ"
                                value={formData.unqiue_id}
                                onChange={handleChange}
                                fullWidth
                            />
                            <TextField
                                label="Full Name"
                                name="full_name"
                                placeholder="John Doe"
                                value={formData.full_name}
                                onChange={handleChange}
                                fullWidth
                            />
                            <TextField
                                label="Email Address"
                                name="email_address"
                                placeholder="john.doe@example.com"
                                type="email"
                                value={formData.email_address}
                                onChange={handleChange}
                                fullWidth
                            />
                            <TextField
                                label="Academic Grade"
                                name="academic_grade"
                                placeholder="e.g., Grade 1, Grade 2, Grade 3"
                                value={formData.academic_grade}
                                onChange={handleChange}
                                fullWidth
                            />
                            <TextField
                                label="Phone Number"
                                name="phone_number"
                                placeholder="e.g., +63 XXXX XXXXXX"
                                value={formData.phone_number}
                                onChange={handleChange}
                                fullWidth
                            />

                            <Button variant="contained" onClick={handleRegister}>
                                Register
                            </Button>
                        </Box>
                    </Box>


                    {/* Right Image */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%',
                            textAlign: 'center',
                            gap: 2,
                            ml: 10,
                            border: '1px solid green'
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
