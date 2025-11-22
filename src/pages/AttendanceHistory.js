import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import TopBar from "./TopBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const AttendanceHistory = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [rows, setRows] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.id) return;

    const fetchHistory = async () => {
      try {
        const params = new URLSearchParams({ userId: user.id });

        if (selectedDate) {
          params.append("date", selectedDate.format("YYYY-MM-DD"));
        }

        const response = await fetch(
          `/Dashboard/history?${params.toString()}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) throw new Error("Failed to fetch attendance history");

        const data = await response.json();

        const mappedRows = (data.data || []).map((row) => {
          const rawIn = row.time_in_morning;
          const rawOut = row.time_out_evening;

          const hasIn = rawIn && rawIn !== "N/A";
          const hasOut = rawOut && rawOut !== "N/A";

          let status = "No Activity";
          if (hasIn && hasOut) status = "Tapped Out";
          else if (hasIn && !hasOut) status = "Tapped In";

          return {
            date: row.log_date,
            timeIn: rawIn || "-",
            timeOut: rawOut || "-",
            duration: "-", // no duration calculation, backend already human-readable
            status,
          };
        });

        setRows(mappedRows);
      } catch (error) {
        console.error("Error fetching attendance history:", error);
        setRows([]);
      }
    };

    fetchHistory();
  }, [user, selectedDate]);

  const handleExportCsv = () => {
    if (!rows.length) return;

    const header = ["Date", "Time In", "Time Out", "Duration", "Status"];
    const csvRows = rows.map((row) =>
      [row.date, row.timeIn, row.timeOut, row.duration, row.status]
        .map((field) => `"${String(field).replace(/"/g, '""')}"`)
        .join(",")
    );

    const csvContent = [header.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const dateLabel = selectedDate ? selectedDate.format("YYYY-MM-DD") : "all";
    link.download = `attendance_${dateLabel}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <TopBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: { xs: 2, sm: 4 },
          py: { xs: 3, sm: 5 },
          width: "100%",
        }}
      >
        {/* Title */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            mb: 2,
            textAlign: "center",
          }}
        >
          My Attendance History
        </Typography>

        {/* Date Picker */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box
            sx={{
              width: "100%",
              maxWidth: 400,
              mb: 3,
            }}
          >
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              sx={{ width: "100%" }}
            />
          </Box>
        </LocalizationProvider>

        {/* Table Section */}
        <TableContainer
          sx={{
            width: "100%",
            maxWidth: 800,
            mb: 3,
            overflowX: "auto", // horizontal scroll for small screens
            overflowY: "auto", // enable vertical scroll
            maxHeight: 400, // set your desired max height (adjust as needed)
          }}
        >
          <Table
            size="small"
            sx={{
              minWidth: 600,
              textAlign: "center",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Date
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Time In
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Time Out
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Duration
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{row.date}</TableCell>
                  <TableCell align="center">{row.timeIn}</TableCell>
                  <TableCell align="center">{row.timeOut}</TableCell>
                  <TableCell align="center">{row.duration}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Buttons Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            justifyContent: "center",
            width: "100%",
            maxWidth: 800,
          }}
        >
          <Button
            onClick={() =>
              navigate("/dashboard", { state: { from: "attendanceHistory" } })
            }
            variant="contained"
            startIcon={<ArrowBackIcon />}
            sx={{
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Back
          </Button>
          <Button
            variant="outlined"
            startIcon={<FileDownloadOutlinedIcon />}
            sx={{
              width: { xs: "100%", sm: "auto" },
            }}
            onClick={handleExportCsv}
          >
            Export CSV
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AttendanceHistory;
