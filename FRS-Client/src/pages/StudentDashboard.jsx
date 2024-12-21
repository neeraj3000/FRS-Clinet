import React from "react";
import AttendanceChart from "../components/StudentDashboard/AttendanceChart";
import ProgressIndicator from "../components/StudentDashboard/ProgressIndicator";
import SubjectCard from "../components/StudentDashboard/SubjectCard";
import { Box, Grid, Typography, Paper } from "@mui/material";

const StudentDashboard = () => {
  const monthlyData = [
    { date: "Jan", percentage: 85, classes: 17, totalClasses: 20 },
    { date: "Feb", percentage: 90, classes: 18, totalClasses: 22 },
    { date: "Mar", percentage: 75, classes: 15, totalClasses: 20 },
    { date: "Apr", percentage: 80, classes: 16, totalClasses: 20 },
    { date: "May", percentage: 95, classes: 19, totalClasses: 20 },
  ];

  const dailyData = [
    { date: "2024-12-01", percentage: 85, classes: 2, totalClasses: 3 },
    { date: "2024-12-02", percentage: 90, classes: 3, totalClasses: 3 },
    { date: "2024-12-03", percentage: 80, classes: 4, totalClasses: 5 },
    { date: "2024-12-04", percentage: 70, classes: 3, totalClasses: 5 },
    { date: "2024-12-05", percentage: 75, classes: 4, totalClasses: 5 },
  ];

  const subjects = [
    { name: "Math", total: 30, attended: 27, absent: 3 },
    { name: "Physics", total: 30, attended: 25, absent: 5 },
    { name: "IT", total: 30, attended: 28, absent: 2 },
    { name: "Biology", total: 30, attended: 26, absent: 4 },
    { name: "History", total: 30, attended: 19, absent: 11 },
    { name: "English", total: 30, attended: 4, absent: 26 },
  ];

  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 4 },
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding={ {xs: 0, sm: 4 }}
        mb={0}//.....................
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#333",
            mb: { xs: 2, sm: 0 },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          R210001 Attendance Dashboard

        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Left Section: Attendance Chart */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={3}
            sx={{
              padding: { xs: 0, sm: 3 },
              borderRadius: 2,
              height: { xs: "auto", sm: "100%" },
            }}
          >
            <AttendanceChart data={monthlyData} filter="monthly" />
          </Paper>
        </Grid>

        {/* Right Section: Progress Indicator */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              backgroundColor : "rgba(195, 241, 142, 0.5)",
              display: "flex",               // Use flexbox layout
              alignItems: "center",          // Vertically center the content
              justifyContent: "center",      // Horizontally center the content
              padding: { xs: 2, sm: 3 },
              textAlign: "center",
              borderRadius: 2,
              minHeight: "100%",              // Ensure Paper takes up the full height of the Grid
            }}
          >
            <ProgressIndicator totalClasses={180} attendedClasses={153} />
          </Paper>
        </Grid>


        {/* Subject Cards Section */}
        <Grid item xs={12}>
          <Grid 
            container 
            spacing={{ xs: 2, sm: 3 }} 
            // sx={{
            //   rowGap: { xs: 2, sm: 3 }
            // }}
          >
            {subjects.map((subject, index) => (
              <Grid item xs={6} sm={6} md={4} key={index}>
                <SubjectCard
                  subject={subject.name}
                  total={subject.total}
                  present={subject.attended}
                  absent={subject.absent}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

      </Grid>
    </Box>
  );
};

export default StudentDashboard;