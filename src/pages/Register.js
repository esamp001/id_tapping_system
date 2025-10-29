import React, { useState } from "react";
import { Box, Typography, TextField, Button, Avatar } from '@mui/material'
import RightImage from "../assets/image_right.png"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Register = () => {
    // State
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };
    
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', p: 5, gap: 0, mt: 1}}>
            <Box>
                <Button sx={{ mb: 6 }}
                    variant="outlined"
                    startIcon={<ArrowBackIcon sx={{ fontSize: 20 }} />}
                >
                    Go to Tapping
                </Button>

                <Typography variant='h6' sx={{ fontWeight: '600' }}>Register your ID</Typography>
                <Typography variant='subtitle2'>Enter your unique ID and personal details to get started with the ID tapping system.</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent:'center', alignItems: 'center', width: '100%'}}>
                {/*Content Left */}
                <Box
                    sx={{
                        width: "50%",
                        p: 2
                    }}
                >

                    <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', mt: 2 }}>
                        <Typography variant="h6">Upload Student Image</Typography>

                        <Avatar
                            src={preview}
                            alt="Avatar Preview"
                            sx={{ width: 100, height: 100, mb: 1 }}
                        />

                        <Box>
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
                        </Box>

                        <Box
                            sx={{
                                width: '100%',
                                mt: 2,
                                p: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2, // vertical spacing between items
                            }}
                        >
                            <Typography variant="h6">User Information</Typography>

                            <TextField label="Unique ID" placeholder="e.g., ID-001-A-XYZ" fullWidth />
                            <TextField label="Full Name" placeholder="John Doe" fullWidth />
                            <TextField label="Email Address" placeholder="john.doe@example.com" type="email" fullWidth />
                            <TextField label="Academic Grade" placeholder="e.g., Junior, Senior, Postgraduate" fullWidth />
                            <TextField label="Phone Number" placeholder="e.g., +1 (555) 123-4567" fullWidth />

                            <Button variant='contained'>Register</Button>
                        </Box>
                    </Box>

                </Box>
                {/*Content Right */}
                <Box
                    sx={{
                        minWidth: 200,
                        p: 2,
                        width: '50%',
                        justifyContent: 'center', // centers the image horizontally
                        border: '1px solid',
                    }}
                >
                    <Box>
                        <img
                            src={RightImage}
                            alt="RightImage"
                            style={{
                                maxWidth: '100%',  // makes image scale down with Box
                                height: 'auto',    // preserves aspect ratio
                                display: 'block'   // removes default inline spacing
                            }}
                        />
                    </Box>
                    <Typography sx={{ textAlign: 'center' }} variant='subtitle2'>Quickly register your unique identifier and essential details to streamline system access and tracking.</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Register