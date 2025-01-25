import React from "react";
import AttendanceChart from "../../components/StudentDashboard/AttendanceChart";
import AttendanceBarChart from "../../components/StudentDashboard/AttendanceBarChart";

import ProgressIndicator from "../../components/StudentDashboard/ProgressIndicator";
import SubjectCard from "../../components/StudentDashboard/SubjectCard";
import { Box, Grid, Typography, Paper, Card, CardContent, Avatar, Divider } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SchoolIcon from '@mui/icons-material/School';
import BadgeIcon from '@mui/icons-material/Badge';

const StudentDashboard = () => {
  const monthlyData = [
    { date: "Jan", percentage: 85, classes: 17, totalClasses: 20 },
    { date: "Feb", percentage: 90, classes: 18, totalClasses: 22 },
    { date: "Mar", percentage: 75, classes: 15, totalClasses: 20 },
    { date: "Apr", percentage: 80, classes: 16, totalClasses: 20 },
    { date: "May", percentage: 95, classes: 19, totalClasses: 20 },
  ];

  const subjects = [
    { name: "Math", total: 30, attended: 27, absent: 3 },
    { name: "Physics", total: 30, attended: 25, absent: 5 },
    { name: "IT", total: 30, attended: 28, absent: 2 },
    { name: "Biology", total: 30, attended: 26, absent: 4 },
    { name: "History", total: 30, attended: 22, absent: 8 },
    { name: "English", total: 30, attended: 4, absent: 26 },
  ];

  const ProfileDetail = ({ icon: Icon, label, value }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
      <Icon sx={{ color: '#6b7280' }} />
      <Box>
        <Typography variant="caption" sx={{fontSize:"1rem", color: '#9ca3af', display: 'block' }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ color: '#4b5563', fontSize: '1rem' }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{
      padding: { xs: 2, sm: 4 },
      minHeight: "100vh",
      // backgroundColor: "#f5f5f5"
    }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: "800",
          color: "#1a237e",
          mb: 4,
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        R200001 Student Dashboard
      </Typography>

      {/* comment out to insert student profile */}
      {/* <Card 
        elevation={3}
        sx={{
          mb: 4,
          borderRadius: 2,
          padding: 3,
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                margin: 'auto',
                border: '2px solid #e2e8f0'
              }}
              alt="Student Name"
              src="/api/placeholder/120/120"
            />
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#64748b',
                textAlign: 'center',
                mt: 2,
                fontWeight: 600 
              }}
            >
              John Doe
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={9}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <ProfileDetail 
                  icon={BadgeIcon} 
                  label="Student ID"
                  value="R210001"
                />
                <ProfileDetail 
                  icon={SchoolIcon} 
                  label="Roll Number"
                  value="21CS101"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <ProfileDetail 
                  icon={SchoolIcon} 
                  label="Class"
                  value="CSE-A"
                />
                <ProfileDetail 
                  icon={SchoolIcon} 
                  label="Year"
                  value="3rd Year"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <ProfileDetail 
                  icon={EmailIcon} 
                  label="Email"
                  value="john.doe@university.edu"
                />
                <ProfileDetail 
                  icon={PhoneIcon} 
                  label="Phone"
                  value="+1 234 567 8900"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card> */}

      <Grid container spacing={3}>
        {/* Left Section: Attendance Chart */}
        {/* <Grid item xs={12} md={8}>
          <Paper
            elevation={3}
            sx={{
              padding: { xs: 2, sm: 3 },
              borderRadius: 2,
              height: { xs: "auto", sm: "100%" },
              background: "white",
            }}
          >
            <AttendanceChart data={monthlyData} filter="monthly" />
          </Paper>
        </Grid> */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={3}
            sx={{
              padding: { xs: 2, sm: 3 },
              borderRadius: 2,
              height: { xs: "auto", sm: "100%" },
              background: "white",
            }}
          >
            <AttendanceBarChart subjects={subjects} />
          </Paper>
        </Grid>

        {/* Right Section: Progress Indicator */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              // background: "linear-gradient(135deg, #c3f18e 0%, #a7e663 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: { xs: 2, sm: 3 },
              textAlign: "center",
              borderRadius: 2,
              minHeight: "100%",
            }}
          >
            <ProgressIndicator totalClasses={180} attendedClasses={153} />
          </Paper>
        </Grid>

        {/* Subject Cards Section */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {subjects.map((subject, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
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