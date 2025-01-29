import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { PieChart, Pie, Cell, ResponsiveContainer as PieResponsiveContainer } from "recharts";
import SchoolIcon from "@mui/icons-material/School";
import PercentIcon from "@mui/icons-material/Percent";

const AttendanceDashboard = () => {
  const [data, setData] = useState(null);
  const [enteredID, setEnteredID] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8000/admin/visualize-attendance")
      .then(response => {
        console.log("Raw API Response:", response.data);

        // Transform API response to match expected format
        const transformedData = Object.keys(response.data).map((yearKey) => {
          const yearData = response.data[yearKey];

          // Ensure that we have section data available
          return {
            year: yearKey,
            totalStudents: yearData.total_students || 0,
            averageAttendance: yearData.total_percentage || 0,
            sectionData: yearData, // Extract section data
          };
        });

        console.log("Transformed Data:", transformedData);
        setData({ yearlyData: transformedData });
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleIDChange = (e) => {
    setEnteredID(e.target.value);
  };

  const handleSearch = () => {
    const cleanedID = enteredID.replace("R", "");
    navigate(`/admin/studentvisualisation/${cleanedID}`);
  };

  const StatCard = ({ title, value, icon: Icon, color, isPercentage }) => (
    <Card elevation={3}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h5">
              {isPercentage ? `${value.toFixed(2)}%` : value}
            </Typography>
          </Box>
          <Icon sx={{ fontSize: 40, color }} />
        </Box>
      </CardContent>
    </Card>
  );

  // Pie Chart for Section Data
  const renderPieChart = (sectionData) => {
    // Ensure section data is defined and contains all required sections (A, B, C, D, E)
    if (!sectionData || !sectionData.A || !sectionData.B || !sectionData.C || !sectionData.D || !sectionData.E) {
      return <Typography>No section data available</Typography>;
    }

    const pieData = [
      { name: "A", value: sectionData.A },
      { name: "B", value: sectionData.B },
      { name: "C", value: sectionData.C },
      { name: "D", value: sectionData.D },
      { name: "E", value: sectionData.E },
    ];

    const COLORS = ["#4caf50", "#f44336", "#ffeb3b", "#2196f3", "#9c27b0"];
    
    return (
      <PieResponsiveContainer width="100%" height={200}>
        <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} fill="#8884d8">
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieResponsiveContainer>
    );
  };

  if (!data) {
    return <Typography>Loading data...</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight="bold" color="#1a237e">
          Students Analysis
        </Typography>
        <Box display="flex" gap={1}>
          <TextField
            type="text"
            value={enteredID}
            onChange={handleIDChange}
            size="small"
            label="Enter ID"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>Search</Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {data.yearlyData.map((yearData) => (
          <Grid item xs={12} md={3} key={yearData.year}>
            <Typography variant="h6" gutterBottom>
              {yearData.year} Year Statistics
            </Typography>
            <StatCard title="Total Students" value={yearData.totalStudents} icon={SchoolIcon} color="#1976d2" />
            <StatCard title="Average Attendance" value={yearData.averageAttendance} icon={PercentIcon} color="#2e7d32" isPercentage />
            <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
              <Typography variant="body1">Section-wise Distribution</Typography>
              {renderPieChart(yearData.sectionData)} {/* Render Pie Chart for each section */}
            </Paper>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Year-wise Average Attendance</Typography>
            <Box height={400}>
              <ResponsiveContainer>
                <BarChart data={data.yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="averageAttendance" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AttendanceDashboard;
