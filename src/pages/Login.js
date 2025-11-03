import React, { useState } from "react";
import { Box, Typography, Divider, TextField, Button, Avatar, Card, CardContent } from "@mui/material";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import TopBar from "./TopBar";
import LoginAnimation from "../assets/Welcome Green.json"
import Lottie from "lottie-react";

const Login = () => {
    const [studentId, setStudentId] = useState("");
    const [preview, setPreview] = useState(null);

    const handleStudentLogin = () => {
        console.log("Student ID:", studentId);
        // Add your student login logic here
    };

    const handleAdminLogin = () => {
        console.log("Admin login clicked");
        // Redirect to admin login page or logic
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            {/* Top Nav Bar */}
            <TopBar />

            <Divider />

            {/* Centered Content */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: 2,
                }}
            >
                {/* Login Card */}
                <Card sx={{ maxWidth: 400, width: "100%", p: 2, boxShadow: 3 }}>
                    <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                            Student Access
                        </Typography>
                        <Typography variant="subtitle2" sx={{ mb: 2, textAlign: "center" }}>
                            Enter your Student ID to access attendance
                        </Typography>

                        <Lottie
                            animationData={LoginAnimation}
                            loop={true}
                            style={{ width: 300, height: 200 }}
                        />

                        <TextField
                            label="Student ID"
                            variant="outlined"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            autoFocus
                        />

                        <Button variant="contained" color="primary" fullWidth onClick={handleStudentLogin} sx={{ py: 1.5, mb: 1 }}>
                            Access Dashboard
                        </Button>

                        <Divider sx={{ width: "100%", my: 2 }} />

                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<SupervisorAccountOutlinedIcon />}
                            onClick={handleAdminLogin}
                        >
                            Admin Login
                        </Button>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default Login;
