import React, { useState, useEffect } from "react";
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  BarChart,
  Bar,
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
import PercentIcon from "@mui/icons-material/Percent";
import { headers } from "../../GetAuthToken";

const COLORS = ["#1976d2", "#2e7d32", "#ed6c02", "#9c27b0", "#d32f2f"];

const AttendanceDashboard = ({ authtoken }) => {
  const [data, setData] = useState(null);
  const [enteredID, setEnteredID] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const navigate = useNavigate();

  // Fetch data from the backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/admin/visualize-attendance", {
          method: 'GET',
          headers
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const apiData = await response.json();

        const mappedData = {
          yearlyData: Object.keys(apiData).map((yearKey) => ({
            year: yearKey,
            totalStudents: apiData[yearKey].total_students,
            averageAttendance: apiData[yearKey].total_percentage,
            sections: [
              { section: "A", attendance: apiData[yearKey].A },
              { section: "B", attendance: apiData[yearKey].B },
              { section: "C", attendance: apiData[yearKey].C },
              { section: "D", attendance: apiData[yearKey].D },
              { section: "E", attendance: apiData[yearKey].E },
            ],
          })),
        };

        setData(mappedData);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchData();
  }, [authtoken]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleIDChange = (e) => {
    setEnteredID(e.target.value);
  };

  const handleSearch = () => {
    if (!selectedYear) {
      alert("Please select a year first");
      return;
    }
    const cleanedID = enteredID.replace("R", "");
    navigate(`/admin/studentvisualisation/${cleanedID}?year=${selectedYear}`);
  };

  const StatCard = ({ title, value, icon: Icon, color, isPercentage }) => (
    <Card elevation={3}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h5" component="div">
              {isPercentage ? `${value.toFixed(2)}%` : value}
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

  if (!data) {
    return <Typography>Loading...</Typography>;
  }

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
        <Typography variant="h5" component="h1" fontWeight="bold" color="#1a237e">
          Students Analysis
        </Typography>

        <Box display="flex" gap={1}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Select Year</InputLabel>
            <Select
              value={selectedYear}
              label="Select Year"
              onChange={handleYearChange}
              sx={{
                backgroundColor: "white",
                borderRadius: 2,
              }}
            >
              <MenuItem value="E1">E1</MenuItem>
              <MenuItem value="E2">E2</MenuItem>
              <MenuItem value="E3">E3</MenuItem>
              <MenuItem value="E4">E4</MenuItem>
            </Select>
          </FormControl>
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
                handleSearch();
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
                  title="Average Attendance"
                  value={yearData.averageAttendance}
                  icon={PercentIcon}
                  color="#2e7d32"
                  isPercentage
                />
              </Grid>
            </Grid>
          </Grid>
        ))}

        <Grid item xs={12} md={12}>
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

        {data.yearlyData.map((yearData) => (
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