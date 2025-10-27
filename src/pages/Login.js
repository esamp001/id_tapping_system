import React, { useState, useEffect } from "react";
import { Box, Typography, Divider } from '@mui/material'


const Login = () => {
    const [time, setTime] = useState(new Date());

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
            <Box>
                {/* Your other content goes here */}
            </Box>
        </Box>
    )
}

export default Login