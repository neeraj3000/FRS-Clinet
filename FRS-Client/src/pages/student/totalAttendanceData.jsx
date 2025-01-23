import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Button,
} from "@mui/material";
import * as XLSX from "xlsx";

const TotalAttendancePage = () => {
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterSubject, setFilterSubject] = useState("");

  const attendanceData = [
    { date: "2024-12-01", time: "8:30-9:30", subject: "Mathematics", faculty: "Mr. Smith", status: "Present" },
    { date: "2024-12-01", time: "9:30-10:30", subject: "Mathematics", faculty: "Mr. Smith", status: "Absent" },
    { date: "2024-12-02", time: "8:30-9:30", subject: "Physics", faculty: "Dr. Brown", status: "Present" },
    { date: "2024-12-02", time: "9:30-10:30", subject: "Physics", faculty: "Dr. Brown", status: "Absent" },
    { date: "2024-12-03", time: "8:30-9:30", subject: "Chemistry", faculty: "Ms. Green", status: "Present" },
    { date: "2024-12-03", time: "9:30-10:30", subject: "Chemistry", faculty: "Ms. Green", status: "Present" },
    { date: "2024-12-04", time: "8:30-9:30", subject: "Biology", faculty: "Dr. Taylor", status: "Absent" },
    { date: "2024-12-04", time: "9:30-10:30", subject: "Biology", faculty: "Dr. Taylor", status: "Present" },
    { date: "2024-12-05", time: "8:30-9:30", subject: "History", faculty: "Mr. White", status: "Absent" },
    { date: "2024-12-05", time: "9:30-10:30", subject: "History", faculty: "Mr. White", status: "Present" },
  ];

  const uniqueDates = [...new Set(attendanceData.map((record) => record.date))];
  const uniqueSubjects = [...new Set(attendanceData.map((record) => record.subject))];

  const filteredAttendance = attendanceData.filter((record) => {
    const matchesDate = filterDate ? record.date === filterDate : true;
    const matchesStatus = filterStatus ? record.status === filterStatus : true;
    const matchesSubject = filterSubject ? record.subject === filterSubject : true;
    return matchesDate && matchesStatus && matchesSubject;
  });

  const handleDownload = () => {
    const dataToExport = filteredAttendance.length ? filteredAttendance : attendanceData;
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
    XLSX.writeFile(workbook, "attendance_records.xlsx");
  };

  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 4 },
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Header Section */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#333",
          mb: 4,
          textAlign: "center",
        }}
      >
        Total Attendance Records
      </Typography>

      {/* Filter Section */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 4,
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          maxWidth: 800,
          justifyContent: "center",
        }}
      >
        <FormControl fullWidth sx={{ maxWidth: 300 }}>
          <TextField
            label="Date"
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ maxWidth: 300 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            label="Status"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Present">Present</MenuItem>
            <MenuItem value="Absent">Absent</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ maxWidth: 300 }}>
          <InputLabel>Subject</InputLabel>
          <Select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            label="Subject"
          >
            <MenuItem value="">All</MenuItem>
            {uniqueSubjects.map((subject, index) => (
              <MenuItem key={index} value={subject}>
                {subject}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Download Button */}
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 4 }}
        onClick={handleDownload}
      >
        Download Excel
      </Button>

      {/* Attendance Table */}
      {uniqueDates.map((date) => {
        const dateRecords = filteredAttendance.filter(
          (record) => record.date === date
        );

        if (dateRecords.length === 0) return null;

        return (
          <Box key={date} sx={{ mb: 4, width: "100%", maxWidth: 800 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "medium",
                color: "#555",
                textAlign: "center",
                mb: 2,
              }}
            >
              {date}
            </Typography>

            <TableContainer component={Paper} elevation={3}>
              <Table>
                <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
                  <TableRow>
                    <TableCell align="center">Time</TableCell>
                    <TableCell align="center">Subject</TableCell>
                    <TableCell align="center">Faculty</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dateRecords.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{record.time}</TableCell>
                      <TableCell align="center">{record.subject}</TableCell>
                      <TableCell align="center">{record.faculty}</TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: record.status === "Present" ? "green" : "red",
                          fontWeight: "bold",
                        }}
                      >
                        {record.status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        );
      })}
    </Box>
  );
};

export default TotalAttendancePage;
