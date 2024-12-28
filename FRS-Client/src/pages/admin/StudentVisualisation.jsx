import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import SchoolIcon from "@mui/icons-material/School";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import PersonOffIcon from "@mui/icons-material/PersonOff";

// Static data replacing the random data generation
const staticData = {
  yearlyData: [
    {
      year: "E1",
      totalStudents: 350,
      presentToday: 300,
      absentToday: 50,
      averageAttendance: 85.35,
      sections: [
        { section: "A", attendance: 80.56 },
        { section: "B", attendance: 78.92 },
        { section: "C", attendance: 84.71 },
        { section: "D", attendance: 89.45 },
        { section: "E", attendance: 91.23 },
      ],
    },
    {
      year: "E2",
      totalStudents: 350,
      presentToday: 280,
      absentToday: 70,
      averageAttendance: 80.42,
      sections: [
        { section: "A", attendance: 75.56 },
        { section: "B", attendance: 82.36 },
        { section: "C", attendance: 78.43 },
        { section: "D", attendance: 81.24 },
        { section: "E", attendance: 85.67 },
      ],
    },
    {
      year: "E3",
      totalStudents: 350,
      presentToday: 290,
      absentToday: 60,
      averageAttendance: 82.78,
      sections: [
        { section: "A", attendance: 80.45 },
        { section: "B", attendance: 85.91 },
        { section: "C", attendance: 81.22 },
        { section: "D", attendance: 79.64 },
        { section: "E", attendance: 88.39 },
      ],
    },
    {
      year: "E4",
      totalStudents: 350,
      presentToday: 320,
      absentToday: 30,
      averageAttendance: 91.12,
      sections: [
        { section: "A", attendance: 90.45 },
        { section: "B", attendance: 89.32 },
        { section: "C", attendance: 91.56 },
        { section: "D", attendance: 92.34 },
        { section: "E", attendance: 93.87 },
      ],
    },
  ],
  weeklyTrend: [
    { day: "Mon", attendance: 85.34 },
    { day: "Tue", attendance: 82.45 },
    { day: "Wed", attendance: 88.56 },
    { day: "Thu", attendance: 86.76 },
    { day: "Fri", attendance: 84.12 },
    { day: "Sat", attendance: 80.45 },
    { day: "Sun", attendance: 75.67 },
  ],
};

const COLORS = ["#1976d2", "#2e7d32", "#ed6c02", "#9c27b0", "#d32f2f"];

const AttendanceDashboard = () => {
  const [data] = useState(staticData);
  const [enteredID, setEnteredID] = useState("");
  const navigate = useNavigate();

  // Function to handle ID input change
  const handleIDChange = (e) => {
    setEnteredID(e.target.value);
  };

  // Function to handle form submission or ID search
  const handleSearch = () => {
    const cleanedID = enteredID.replace("R", ""); // Remove the letter 'R' from the ID
    navigate(`/admin/studentvisualisation/${cleanedID}`);
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <Card elevation={3}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h5" component="div">
              {value}
            </Typography>
          </Box>
          <Icon sx={{ fontSize: 40, color }} />
        </Box>
      </CardContent>
    </Card>
  );

  const handleYearClick = (year) => {
    year = year.charAt(0).toLowerCase() + year.slice(1);
    navigate(`/admin/todayclasses/${year}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          mb: { xs: 2, sm: 3 },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          fontWeight="bold"
          color="#1a237e"
        >
          Scheduled Classes
        </Typography>

        {/* Text Field and Button aligned next to each other */}
        <Box display="flex" gap={1}>
          <TextField
            type="text"
            value={enteredID}
            onChange={handleIDChange}
            sx={{
              width: { xs: "100%", sm: 200 },
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "white",
              },
            }}
            size="small"
            label="Enter ID"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(); // Trigger search when Enter is pressed
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{
              alignSelf: "center",
            }}
            size="medium"
          >
            Search
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {data.yearlyData.map((yearData) => (
          <Grid
            item
            xs={12}
            md={3}
            key={yearData.year}
            onClick={() => handleYearClick(yearData.year)}
            sx={{ cursor: "pointer" }}
          >
            <Typography variant="h6" gutterBottom>
              {yearData.year} Year Statistics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <StatCard
                  title="Total Students"
                  value={yearData.totalStudents}
                  icon={SchoolIcon}
                  color="#1976d2"
                />
              </Grid>
              <Grid item xs={12}>
                <StatCard
                  title="Present Today"
                  value={yearData.presentToday}
                  icon={HowToRegIcon}
                  color="#2e7d32"
                />
              </Grid>
              <Grid item xs={12}>
                <StatCard
                  title="Absent Today"
                  value={yearData.absentToday}
                  icon={PersonOffIcon}
                  color="#d32f2f"
                />
              </Grid>
            </Grid>
          </Grid>
        ))}

        {/* Bar and Line Charts */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Year-wise Average Attendance
            </Typography>
            <Box height={400}>
              <ResponsiveContainer>
                <BarChart data={data.yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="year"
                    label={{
                      value: "Year",
                      position: "insideBottomRight",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    label={{
                      value: "Average Attendance (%)",
                      angle: -90,
                      position: "insideCenter",
                      dx: -15,
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="averageAttendance"
                    fill="#1976d2"
                    name="Average Attendance (%)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Weekly Attendance Trend
            </Typography>
            <Box height={400}>
              <ResponsiveContainer>
                <LineChart data={data.weeklyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="day"
                    label={{
                      value: "Day of the Week",
                      position: "insideBottomRight",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    label={{
                      value: "Attendance (%)",
                      angle: -90,
                      position: "insideCenter",
                      dx: -15,
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="attendance"
                    stroke="#2e7d32"
                    name="Attendance (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {data.yearlyData.map((yearData, index) => (
          <Grid item xs={12} md={6} key={yearData.year}>
            <Paper
              elevation={3}
              sx={{ p: 2 }}
              onClick={() => handleYearClick(yearData.year)}
            >
              <Typography variant="h6" gutterBottom>
                {yearData.year} Year Section-wise Attendance
              </Typography>
              <Box height={400}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={yearData.sections}
                      dataKey="attendance"
                      nameKey="section"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      fill="#8884d8"
                      label={(entry) =>
                        `${entry.section}: ${entry.attendance.toFixed(2)}%`
                      }
                    >
                      {yearData.sections.map((_, idx) => (
                        <Cell
                          key={`cell-${idx}`}
                          fill={COLORS[idx % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AttendanceDashboard;
