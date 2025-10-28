import React from 'react'
import { Typography, Box, Paper, Avatar } from '@mui/material'
import TopBar from './TopBar'

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
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Alice Johnson
                        </Typography>
                        <Typography variant="subtitle2">ID: 001</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
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
        </>
    )
}

export default Dashboard