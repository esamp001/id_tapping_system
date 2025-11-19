import React, { useEffect, useState } from "react";
import { Typography, Box, Paper, Avatar, Divider, Button } from "@mui/material";
import TopBar from "./TopBar";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import useSnackbar from "../hooks/useSnackbar";
import { useNavigate, useLocation } from "react-router-dom";

const activities = [
  { status: "In", time: "08:00 AM, Aug 1" },
  { status: "Out", time: "05:00 PM, Jul 31" },
  { status: "In", time: "07:55 AM, Jul 31" },
];

const Dashboard = () => {
  const { user } = useContext(UserContext);
  console.log(user, "user");

  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();

  // Sate
  const [userInfo, setUserInfo] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  console.log(recentActivity, "recentActivity");

  // Look up user details after login
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/Dashboard/dashboard", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) throw new Error("Login failed");

        const data = await response.json();
        setUserInfo(data.user);

        // Show snackbar only when NOT coming back from Attendance History
        const cameFromAttendanceHistory =
          location.state && location.state.from === "attendanceHistory";

        if (!cameFromAttendanceHistory) {
          showSnackbar("Time In successful!", "success");
        }
      } catch (error) {
        console.error(error);
        showSnackbar("Time In failed: " + error.message, "error");
      }
    };

    fetchUser();
  }, [location.state]);

  // Fetch for activity
  useEffect(() => {
    if (!user || !user.id) return;

    const fetchActivity = async () => {
      try {
        const response = await fetch(`/Dashboard/activity?userId=${user.id}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch activity");

        const data = await response.json();
        console.log(data, "data");

        const activities = Object.values(data.data).map((value) => ({
          time: value[0],
          date: value[1],
          remarks: value[2],
        }));

        setRecentActivity(activities);
      } catch (error) {
        console.error("Error fetching activity:", error);
      }
    };

    fetchActivity();
  }, [user]);

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
            p: { xs: 3, sm: 4 },
            display: "flex",
            flexDirection: { xs: "column-reverse", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 3,
            width: { xs: "100%", sm: "85%", md: "70%" },
            mx: "auto",
            borderRadius: 4,
            boxShadow: "0px 8px 24px rgba(0,0,0,0.08)",
            background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
          }}
        >
          {/* LEFT SIDE INFO */}
          <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "text.primary",
              }}
            >
              {userInfo.full_name}
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mt: 1,
                mb: 2,
                color: "text.secondary",
                fontSize: "1.1rem",
              }}
            >
              {userInfo.current_date}
            </Typography>

            {/* STATUS BADGE */}
            <Box
              sx={{
                display: "inline-block",
                bgcolor: "success.main",
                color: "white",
                px: 2,
                py: 0.7,
                borderRadius: "30px",
                fontWeight: 600,
                fontSize: "0.9rem",
                letterSpacing: 0.3,
                boxShadow: "0px 4px 10px rgba(0, 128, 0, 0.2)",
              }}
            >
              {userInfo.remarks}
            </Box>
          </Box>

          {/* AVATAR */}
          <Avatar
            alt={userInfo.full_name}
            src={userInfo.avatar}
            sx={{
              width: 160,
              height: 160,
              border: "4px solid #fff",
              boxShadow: "0px 6px 18px rgba(0,0,0,0.15)",
            }}
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
          <Button
            onClick={() => navigate("/")}
            variant="outlined"
            startIcon={<KeyboardBackspaceOutlinedIcon />}
          >
            Go back to login
          </Button>
          <Button variant="contained" startIcon={<DashboardOutlinedIcon />}>
            Stay on Dashboard
          </Button>
        </Box>
        <Box
          sx={{
            mt: 5,
            width: { xs: "100%", sm: "80%", md: "55%" },
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, mt: 1 }}>
            Daily Activity
          </Typography>
          <Box
            sx={{
              maxHeight: 250,
              overflowY: "auto",
              pr: 1,
            }}
          >
            {recentActivity.map((activity, index, arr) => {
              // Determine what to show on the right side
              const showTime =
                activity.time && activity.time !== "N/A"
                  ? activity.time
                  : "N/A";

              return (
                <React.Fragment key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      py: 1.5,
                    }}
                  >
                    {/* LEFT — Always show remarks */}
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: (theme) =>
                          activity.remarks === "IN"
                            ? theme.palette.success.main
                            : theme.palette.error.main,
                      }}
                    >
                      {activity.remarks}
                    </Typography>

                    {/* RIGHT — Show time or N/A */}
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {showTime}
                    </Typography>
                  </Box>

                  {index < arr.length - 1 && <Divider />}
                </React.Fragment>
              );
            })}
          </Box>

          <Box
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* <Button
              sx={{ borderRadius: 0.5, height: 50 }}
              variant="outlined"
              startIcon={<FileDownloadOutlinedIcon />}
            >
              Export to CSV
            </Button> */}

            <Button
              onClick={() => navigate("/attendance/history")}
              sx={{ borderRadius: 0.5, height: 50 }}
              variant="outlined"
            >
              My Attendance History
            </Button>
          </Box>
        </Box>
        {SnackbarComponent}
      </Box>
    </>
  );
};

export default Dashboard;
