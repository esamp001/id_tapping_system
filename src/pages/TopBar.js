import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const TopBar = ({ title = "Digital Attendance Tracker", showTime = true }) => {
    const [time, setTime] = useState(new Date());

    // Update clock every second
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Format time display
    const formatTime = (date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${ampm}`;
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                p: 3,
                boxShadow: 1,
            }}
        >
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {title}
            </Typography>

            {showTime && (
                <Typography
                    variant="subtitle2"
                    sx={{
                        fontFamily: "'Roboto Mono', monospace",
                        fontWeight: 500,
                        fontSize: "1.5rem",
                    }}
                >
                    {formatTime(time)}
                </Typography>
            )}
        </Box>
    );
};

export default TopBar;
