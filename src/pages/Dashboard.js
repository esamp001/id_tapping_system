import React from 'react'
import { Typography, Box, Paper, Avatar, Chip, Divider } from '@mui/material'
import TopBar from './TopBar'

const activities = [
    { status: "In", time: "08:00 AM, Aug 1" },
    { status: "Out", time: "05:00 PM, Jul 31" },
    { status: "In", time: "07:55 AM, Jul 31" },
];

const Dashboard = () => {
    return (
        <>
            <TopBar />
            <Box sx={{ display: "flex", flexDirection: "column", p: 3 }}>
                <Paper
                    sx={{
                        p: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between", // ✅ separates left/right
                        boxShadow: 3,
                    }}
                >
                    {/* LEFT SIDE — name, id, time, status */}
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            Alice Johnson
                        </Typography>
                        <Typography variant="subtitle2">ID: 001</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            10:30 AM
                        </Typography>
                        <Typography
                            sx={{
                                mt: 1,
                                display: "inline-block",
                                bgcolor: "success.light",
                                color: "black",
                                px: 2,
                                py: 0.5,
                                borderRadius: "20px",
                                fontWeight: 500,
                                fontSize: "0.875rem",
                            }}
                        >
                            Time In
                        </Typography>
                    </Box>

                    {/* RIGHT SIDE — avatar */}
                    <Avatar
                        alt="Alice Johnson"
                        src="https://mui.com/static/images/avatar/1.jpg"
                        sx={{ width: 120, height: 120, mr: 3}}
                    />
                </Paper>

            
            </Box>
            <Box sx={{ width: 300, bgcolor: "background.paper", borderRadius: 2, p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    Recent Activity
                </Typography>

                {activities.map((activity, index) => (
                    <Box key={index}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                py: 1.5,
                            }}
                        >
                            {/* Status badge */}
                            <Chip
                                label={activity.status}
                                size="small"
                                variant={activity.status === "In" ? "outlined" : "filled"}
                                sx={{
                                    bgcolor:
                                        activity.status === "In" ? "success.light" : "grey.200",
                                    color:
                                        activity.status === "In"
                                            ? "success.main"
                                            : "text.primary",
                                    fontWeight: 600,
                                    px: 0.5,
                                    borderRadius: "8px",
                                    border:
                                        activity.status === "In"
                                            ? "none"
                                            : "1px solid #c0c0c0",
                                }}
                            />

                            {/* Time text */}
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                {activity.time}
                            </Typography>
                        </Box>

                        {/* Divider except last item */}
                        {index < activities.length - 1 && <Divider />}
                    </Box>
                ))}
            </Box>
        </>
    )
}

export default Dashboard