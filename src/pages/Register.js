import React from 'react'
import { Box, Typography, Stack, TextField } from '@mui/material'

const Register = () => {
    return (
        <Box sx={{ border: '1px solid red' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', p: 5, gap: 2 }}>
                <Box
                    sx={{
                        border: '1px solid',
                        flex: { xs: '1 1 100%', sm: '1 1 48%' },
                        minWidth: 200,
                        p: 2,
                    }}
                >
                    <Typography variant='h6' sx={{ fontWeight: '600'}}>Register your ID</Typography>
                    <Typography variant='subtitle2'>Enter your unique ID and personal details to get started with the ID tapping system.</Typography>

                    <Box
                        sx={{
                            maxWidth: 400,
                            mx: "auto",
                            mt: 5,
                            p: 3,
                            borderRadius: 2,
                            boxShadow: 3,
                            backgroundColor: "white",
                        }}
                    >

                            <Typography variant="h6">User Information</Typography>

                            <TextField
                                label="Unique ID"
                                placeholder="e.g., ID-001-A-XYZ"
                                fullWidth
                            />

                            <TextField
                                label="Full Name"
                                placeholder="John Doe"
                                fullWidth
                            />

                            <TextField
                                label="Email Address"
                                placeholder="john.doe@example.com"
                                type="email"
                                fullWidth
                            />

                            <TextField
                                label="Academic Grade"
                                placeholder="e.g., Junior, Senior, Postgraduate"
                                fullWidth
                            />

                            <TextField
                                label="Phone Number"
                                placeholder="e.g., +1 (555) 123-4567"
                                fullWidth
                            />

                            <TextField
                                label="Department"
                                placeholder="e.g., Computer Science, Marketing"
                                fullWidth
                            />
                    </Box>
                </Box>
                <Box
                    sx={{
                        border: '1px solid',
                        flex: { xs: '1 1 100%', sm: '1 1 48%' },
                        minWidth: 200,
                        p: 2,
                    }}
                >
                    RIGHT
                </Box>
            </Box>
        </Box>
    )
}

export default Register