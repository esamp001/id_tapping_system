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
        <Box sx={{ display: 'flex', flexWrap: 'wrap'}}>
            <Box
                sx={{
                    flex: { xs: '1 1 100%', sm: '1 1 48%' },
                    minWidth: 200,
                    p: 2,
                    display: 'flex',
                    justifyContent: "space-between",
                    alignItems: 'center'
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 600}}>Digital Attendance Tracker</Typography>
                <Typography
                    variant="subtitle2" // or body2
                    sx={{
                        fontFamily: "'Roboto Mono', monospace", // monospaced font for numbers
                        fontWeight: 500,
                        fontSize: '0.875rem' // optional size adjustment
                    }}
                >
                    {formatTime(time)}
                </Typography>
            </Box>
            <Divider />
        </Box>
    )
}

export default Login