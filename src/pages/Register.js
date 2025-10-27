import React from 'react'
import { Box, Typography, Stack, TextField, Button } from '@mui/material'
import RightImage from "../assets/image_right.png"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Register = () => {
    return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', p: 5, gap: 2, mt: 6 }}>
                <Box
                    sx={{
                        flex: { xs: '1 1 100%', sm: '1 1 48%' },
                        minWidth: 200,
                        p: 2,
                    }}
                >
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon sx={{ fontSize: 20 }} />}
                >
                    Go to Tapping
                </Button>

                    <Typography variant='h6' sx={{ fontWeight: '600'}}>Register your ID</Typography>
                    <Typography variant='subtitle2'>Enter your unique ID and personal details to get started with the ID tapping system.</Typography>

                    <Box
                        sx={{
                            maxWidth: 400,
                            mx: "auto",
                            mt: 5,
                            p: 3,
                            display: "flex",
                            flexDirection: "column",
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
                <Box
                    sx={{
                        flex: { xs: '1 1 100%', sm: '1 1 48%' },
                        minWidth: 200,
                        p: 2,
                        display: 'flex',
                        justifyContent: 'center', // centers the image horizontally
                        alignItems: 'center',     // centers the image vertically if Box has height
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
                        <Typography sx={{ textAlign: 'center'}} variant='subtitle2'>Quickly register your unique identifier and essential details to streamline system access and tracking.</Typography>
                    </Box>
                </Box>
            </Box>
    )
}

export default Register