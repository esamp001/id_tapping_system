import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, TextField, Button, Avatar} from '@mui/material'
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';

const Login = () => {
    // States
    const [time, setTime] = useState(new Date());
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000); // update every second

        return () => clearInterval(timer); // cleanup on unmount
    }, []);

    const formatTime = (date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // convert 0 -> 12
        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${ampm}`;
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {/* Top section */}
            <Box
                sx={{
                    display: 'flex',
                    flex: { xs: '1 1 100%', sm: '1 1 48%' },
                    minWidth: 200,
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 3,
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Digital Attendance Tracker
                </Typography>

                <Typography
                    variant="subtitle2"
                    sx={{
                        fontFamily: "'Roboto Mono', monospace",
                        fontWeight: 500,
                        fontSize: '0.875rem',
                    }}
                >
                    {formatTime(time)}
                </Typography>
            </Box>

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

                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
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
                        <Box sx={{ mt : 1}}>
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