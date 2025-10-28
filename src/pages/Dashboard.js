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
                        <Typography variant="h4" sx={{ fontWeight: 600, mt: 2, mb: 2 }}>
                            10:30 AM
                        </Typography>
                        <Typography
                            sx={{
                                mt: 1,
                                display: "inline-block",
                                bgcolor: "success.light",
                                color: "white",
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
                        sx={{ width: 120, height: 120, mr: 3 }}
                    />
                </Paper>

                <Divider sx={{ mt: 5, mb: 1}} />

                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, mt: 1 }}>
                        Recent Activity
                    </Typography>


                    <Box
                        sx={{
                            maxHeight: 250, // or a height like 300, 400 — depends on your layout
                            overflowY: "auto",
                            pr: 1, // small right padding to prevent text cutoff when scrollbar shows
                        }}
                    >
                        {activities.map((activity, index) => (
                            <React.Fragment key={index}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        py: 1.5,
                                    }}
                                >
                                    {/* Status text */}
                                    <Typography
                                        sx={{
                                            fontWeight: 600,
                                            color: (theme) =>
                                                activity.status === "In"
                                                    ? theme.palette.status.in
                                                    : theme.palette.status.out,
                                        }}
                                    >
                                        {activity.status}
                                    </Typography>

                                    {/* Time text */}
                                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                        {activity.time}
                                    </Typography>
                                </Box>

                                {/* Divider except after the last item */}
                                {index < activities.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </Box>


                </Box>
            </Box>
        </>
    )
}

export default Dashboard