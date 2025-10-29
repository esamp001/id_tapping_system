import React, { useState } from 'react';
import { Typography, Box, Paper, Avatar, Chip, TableContainer, Table, TableHead, TableCell, TableRow, Divider, Button, TableBody } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import TopBar from './TopBar';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

const rows = [
    {
        date: "2025-10-23",
        timeIn: "9:00:00 AM",
        timeOut: "11:30:00 AM",
        duration: "2h 30m",
        status: "Tapped Out",
    },
    {
        date: "2025-10-28",
        timeIn: "9:22:52 AM",
        timeOut: "-",
        duration: "-",
        status: "Tapped In",
    },
];

const AttendanceHistory = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs());

    return (
        <>
            <TopBar />
            <Box sx={{ p: 3, border: '1px solid', flexWrap: 'wrap' }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    My Attendance History
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <DatePicker sx={{ width: '45%' }}
                            label="Select Date"
                            value={selectedDate}
                            onChange={(newValue) => setSelectedDate(newValue)}
                        />
                    </Box>
                </LocalizationProvider>
                <Box
                    sx={{
                        p: { xs: 2, sm: 3 },
                        borderRadius: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflowX: 'hidden', // avoid right scroll bar
                    }}
                >
                    {/* Table Section */}
                    <TableContainer
                        component={Paper}
                        sx={{
                            borderRadius: 1,
                            mb: 3,
                            width: "100%",
                            maxWidth: 800,          // limit width for balance
                        }}
                    >
                        <Table
                            size="small"
                            sx={{
                                minWidth: 600,
                                textAlign: "center",  // center-aligns text inside cells
                            }}
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" sx={{ fontWeight: 600 }}>Date</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 600 }}>Time In</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 600 }}>Time Out</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 600 }}>Duration</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 600 }}>Status</TableCell>
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
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 2,
                            justifyContent: 'center',
                            width: '100%',
                            maxWidth: 800, // match table width for alignment
                        }}
                    >
                        <Button
                            variant="outlined"
                            startIcon={<FileDownloadOutlinedIcon />}
                            sx={{
                                width: { xs: '100%', sm: 'auto' },
                            }}
                        >
                            Export CSV
                        </Button>

                        <Button
                            variant="contained"
                            startIcon={<ArrowBackIcon />}
                            sx={{
                                width: { xs: '100%', sm: 'auto' },
                            }}
                        >
                            Back
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default AttendanceHistory;
