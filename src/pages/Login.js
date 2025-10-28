import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, TextField, Button, Avatar } from '@mui/material'
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import TopBar from "./TopBar";

const Login = () => {
    // States
    const [preview, setPreview] = useState(null);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
            {/* Top Nav Bar */}
            <TopBar />

            {/* Divider */}
            <Divider />

            {/* Content below */}
            <Box
                sx={{
                    display: 'flex',
                    flex: { xs: '1 1 100%', sm: '1 1 48%' },
                    minWidth: 200,
                    mt: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 100, // optional, sets vertical space
                }}
            >
                <Box sx={{ textAlign: 'center', width: '60%', mt: 2 }}>
                    <Typography sx={{ fontWeight: 600 }} variant="h6">Student Access</Typography>
                    <Typography variant="subtitle2">Enter your Student ID to acesss attendance</Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar
                            src={preview}
                            alt="Avatar Preview"
                            sx={{ width: 120, height: 120, mb: .5, mt: 2 }}
                        />
                    </Box>

                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <TextField sx={{ width: '100%' }}
                            label="Student ID"
                            variant="outlined"
                            fullWidth
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ py: 1.5 }} // optional padding for taller button
                        >
                            Access Dashboard
                        </Button>
                        <Box sx={{ mt: 1 }}>
                            <Button
                                variant="outlined"
                                startIcon={<SupervisorAccountOutlinedIcon />} // adds icon to the left
                            >
                                Admin Login
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Login