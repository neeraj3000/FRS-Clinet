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
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

const SubjectAttendancePage = ({ subjectName, attendanceData }) => {
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const attendance = attendanceData || [
    { date: "2024-12-01", subject: subjectName, time: "8:30-9:30", faculty: "Mr. Smith", status: "Present" },
    { date: "2024-12-01", subject: subjectName, time: "9:30-10:30", faculty: "Mr. Smith", status: "Absent" },
    { date: "2024-12-02", subject: subjectName, time: "8:30-9:30", faculty: "Mr. Smith", status: "Present" },
    { date: "2024-12-03", subject: subjectName, time: "8:30-9:30", faculty: "Mr. Smith", status: "Absent" },
    { date: "2024-12-03", subject: subjectName, time: "9:30-10:30", faculty: "Mr. Smith", status: "Present" },
  ];

  const uniqueDates = [...new Set(attendance.map((record) => record.date))];

  const filteredAttendance = attendance.filter((record) => {
    const matchesDate = filterDate ? record.date === filterDate : true;
    const matchesStatus = filterStatus ? record.status === filterStatus : true;
    return matchesDate && matchesStatus;
  });

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
        {subjectName} Attendance
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
        <TextField
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          label="Date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{ maxWidth: 300, fontSize: { xs: "0.8rem", sm: "1rem" } }}
        />

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
      </Box>

      {/* Attendance Table */}
      {uniqueDates.map((date) => {
        const dateRecords = filteredAttendance.filter(
          (record) => record.date === date
        );

        if (dateRecords.length === 0) return null;

        return (
          <Box
            key={date}
            sx={{
              mb: 4,
              width: "100%",
              maxWidth: 800,
              overflowX: "auto",
            }}
          >
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

            <TableContainer
              component={Paper}
              elevation={3}
              sx={{
                width: "100%",
                minWidth: { xs: 350, sm: 600 },
              }}
            >
              <Table>
                <TableHead
                  sx={{
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", fontSize: { xs: "0.8rem", sm: "1rem" } }}
                    >
                      Time
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", fontSize: { xs: "0.8rem", sm: "1rem" } }}
                    >
                      Subject
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", fontSize: { xs: "0.8rem", sm: "1rem" } }}
                    >
                      Faculty
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", fontSize: { xs: "0.8rem", sm: "1rem" } }}
                    >
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dateRecords.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell align="center" sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                        {record.time}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                        {record.subject}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                        {record.faculty}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: record.status === "Present" ? "green" : "red",
                          fontWeight: "bold",
                          fontSize: { xs: "0.8rem", sm: "1rem" },
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

export default SubjectAttendancePage;
