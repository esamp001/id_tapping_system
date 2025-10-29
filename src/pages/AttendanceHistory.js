import React, { useState } from 'react';
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
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import TopBar from './TopBar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

const rows = [
    {
        date: '2025-10-23',
        timeIn: '9:00:00 AM',
        timeOut: '11:30:00 AM',
        duration: '2h 30m',
        status: 'Tapped Out',
    },
    {
        date: '2025-10-28',
        timeIn: '9:22:52 AM',
        timeOut: '-',
        duration: '-',
        status: 'Tapped In',
    },
];

const AttendanceHistory = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs());

    return (
        <>
            <TopBar />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    px: { xs: 2, sm: 4 },
                    py: { xs: 3, sm: 5 },
                    width: '100%',
                }}
            >
                {/* Title */}
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 600,
                        mb: 2,
                        textAlign: 'center',
                    }}
                >
                    My Attendance History
                </Typography>

                {/* Date Picker */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: 400,
                            mb: 3,
                        }}
                    >
                        <DatePicker
                            label="Select Date"
                            value={selectedDate}
                            onChange={(newValue) => setSelectedDate(newValue)}
                            sx={{ width: '100%' }}
                        />
                    </Box>
                </LocalizationProvider>

                {/* Table Section */}
                <TableContainer
                    sx={{
                        width: '100%',
                        maxWidth: 800,
                        mb: 3,
                        overflowX: 'auto', // horizontal scroll for small screens
                        overflowY: 'auto', // enable vertical scroll
                        maxHeight: 400, // set your desired max height (adjust as needed)
                    }}
                >

                    <Table
                        size="small"
                        sx={{
                            minWidth: 600,
                            textAlign: 'center',
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
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: 2,
                        justifyContent: 'center',
                        width: '100%',
                        maxWidth: 800,
                    }}
                >
                    <Button
                        variant="contained"
                        startIcon={<ArrowBackIcon />}
                        sx={{
                            width: { xs: '100%', sm: 'auto' },
                        }}
                    >
                        Back
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<FileDownloadOutlinedIcon />}
                        sx={{
                            width: { xs: '100%', sm: 'auto' },
                        }}
                    >
                        Export CSV
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default AttendanceHistory;
