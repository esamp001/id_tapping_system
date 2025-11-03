import React, { useState } from "react";
import { Box, Typography, Divider, TextField, Button, Avatar, Card, CardContent } from "@mui/material";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import TopBar from "./TopBar";
import LoginAnimation from "../assets/Welcome Green.json"
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import useSnackbar from "../hooks/useSnackbar"

const Login = () => {
    const [uniqueId, setUniqueId] = useState("");
    const [userType, setUserType] = useState("student");
    const navigate = useNavigate();
    const { showSnackbar, SnackbarComponent } = useSnackbar();

    const handleLogin = async () => {
        if (!uniqueId) {
            showSnackbar("Please enter your ID", "warning");
            return;
        }

        const route =
            userType === "student"
                ? "/LoginRoutes/login/students"
                : "/LoginRoutes/login/admins";

        try {
            const response = await fetch(route, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uniqueId }),
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const data = await response.json();
            console.log("Login successful:", data);

            showSnackbar("Login successful!", "success");
            navigate("/dashboard"); // Navigate to dashboard

        } catch (error) {
            console.error("Error during login:", error.message);
            showSnackbar("Login failed: " + error.message, "error");
        }
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
                            value={uniqueId}
                            onChange={(e) => setUniqueId(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            autoFocus
                        />

                        <Button variant="contained" color="primary" fullWidth onClick={handleLogin} sx={{ py: 1.5, mb: 1 }}>
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
            {SnackbarComponent}
        </Box>
    );
};

export default Login;
