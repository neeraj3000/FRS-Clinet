import React from "react";
import { Box, Grid, Typography, Paper, Avatar } from "@mui/material";
import StatsCard from "./StatsCard";
import Notifications from "../../components/notifications";

const Dashboard = () => {
  // Faculty information
  const faculty = {
    name: "Dr. John Doe",
    subject: "Computer Science",
    avatar: "JD" // Initials for the avatar
  };

  const stats = [
    { title: "Total Students", value: "156" },
    { title: "Classes Today", value: "6" },
    { title: "Attendance Rate", value: "92%" },
    { title: "Active Classes", value: "4" },
  ];

  const notifications = [
    {
      title: "Tomorrow Holiday",
      message: "Due to annual function, tomorrow will be a holiday.",
      time: "2 hours ago",
    },
    {
      title: "Attendance Update",
      message: "Your attendance has been marked for today's classes.",
      time: "4 hours ago",
    },
    {
      title: "New Schedule",
      message: "Next week schedule has been updated.",
      time: "1 day ago",
    },
  ];

  return (
    <Box>
      {/* Faculty Info Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          mb: 3, 
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Avatar 
          sx={{ 
            width: 56, 
            height: 56, 
            bgcolor: 'black' 
          }}
        >
          {faculty.avatar}
        </Avatar>
        <Box>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 'medium' }}>
            {faculty.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {faculty.subject}
          </Typography>
        </Box>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatsCard title={stat.title} value={stat.value} />
          </Grid>
        ))}
        
        {/* Notifications */}
        <Grid item xs={12}>
          <Notifications notifications={notifications} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;