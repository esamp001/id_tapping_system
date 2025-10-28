import React from 'react'
import { Typography, Box, Paper, Avatar, Chip, Divider, Button } from '@mui/material'
import TopBar from './TopBar'
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

const activities = [
    { status: "In", time: "08:00 AM, Aug 1" },
    { status: "Out", time: "05:00 PM, Jul 31" },
    { status: "In", time: "07:55 AM, Jul 31" },
];

const Dashboard = () => {
    return (
        <>
            <TopBar />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    p: 3,
                    alignItems: "center",
                    flexWrap: "wrap",
                }}
            >
                <Paper
                    sx={{
                        p: 4,
                        display: "flex",
                        flexDirection: { xs: "column-reverse", sm: "row" },
                        alignItems: "center",
                        justifyContent: "space-between",
                        boxShadow: 3,
                        width: { xs: "100%", sm: "80%", md: "60%" },
                        textAlign: { xs: "center", sm: "left" },
                        gap: 2,
                    }}
                >
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            Alice Johnson
                        </Typography>
                        <Typography variant="subtitle2">ID: 00001</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 600, mt: 2, mb: 2 }}>
                            10:30 AM, TUESDAY
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

                    <Avatar
                        alt="Alice Johnson"
                        src="https://mui.com/static/images/avatar/1.jpg"
                        sx={{ width: 150, height: 150 }}
                    />
                </Paper>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mt: 2,
                        gap: 2,
                        flexDirection: { xs: "column", sm: "row" },
                    }}
                >
                    <Button variant="contained">
                        Stay on Dashboard
                    </Button>
                    <Button variant="outlined">
                        Go back to login
                    </Button>
                </Box>
                <Box
                    sx={{
                        mt: 5,
                        width: { xs: "100%", sm: "80%", md: "55%" },
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, mt: 1 }}>
                        Recent Activity
                    </Typography>
                    <Box
                        sx={{
                            maxHeight: 250,
                            overflowY: "auto",
                            pr: 1,
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
                                    <Typography
                                        sx={{
                                            fontWeight: 600,
                                            color: (theme) =>
                                                activity.status === "In"
                                                    ? theme.palette.success.main
                                                    : theme.palette.error.main,
                                        }}
                                    >
                                        {activity.status}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                        {activity.time}
                                    </Typography>
                                </Box>
                                {index < activities.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </Box>
                    <Box
                        sx={{
                            mt: 2,
                            display: "flex",
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <Button sx={{ borderRadius: .5 , height: 50}} variant="outlined" startIcon={<FileDownloadOutlinedIcon />}>
                            Export to CSV
                        </Button>
                        <Button sx={{ borderRadius: .5, height: 50 }} variant="outlined">
                            My Attendance History
                        </Button>
                    </Box>
                </Box>
            </Box>

        </>
    )
}

export default Dashboard