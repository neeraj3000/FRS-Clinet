import React from "react";
import AttendanceChart from "../../components/StudentDashboard/AttendanceChart";
import ProgressIndicator from "../../components/StudentDashboard/ProgressIndicator";
import SubjectCard from "../../components/StudentDashboard/SubjectCard";
import { Box, Grid, Typography, Paper, Card, CardContent, Avatar, Divider , IconButton } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SchoolIcon from '@mui/icons-material/School';
import BadgeIcon from '@mui/icons-material/Badge';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useNavigate,useParams } from "react-router-dom";

import AttendaceHeatmap from "../../components/AttedanceHeatmap";

const StudentDashboard = () => {
  const {studentId} = useParams()
  const navigate = useNavigate(); // Initialize useNavigate

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
    { name: "History", total: 30, attended: 19, absent: 11 },
    { name: "English", total: 30, attended: 4, absent: 26 },
  ];

  const attendanceData = {
    // December 2024
    '2024-12-01': 'present',
    '2024-12-02': 'present',
    '2024-12-03': 'absent',
    '2024-12-04': 'partial',
    '2024-12-05': 'present',
    '2024-12-06': 'present',
    '2024-12-07': 'absent',
    '2024-12-08': 'present',
    '2024-12-09': 'absent',
    '2024-12-10': 'present',
    '2024-12-11': 'present',
    '2024-12-12': 'partial',
    '2024-12-13': 'present',
    '2024-12-14': 'partial',
    '2024-12-15': 'present',
    '2024-12-16': 'present',
    '2024-12-17': 'absent',
    '2024-12-18': 'present',
    '2024-12-19': 'absent',
    '2024-12-20': 'partial',
    '2024-12-21': 'present',
    '2024-12-22': 'present',
    '2024-12-23': 'partial',
    '2024-12-24': 'present',
    '2024-12-25': 'absent',
    '2024-12-26': 'present',
    '2024-12-27': 'present',
    '2024-12-28': 'partial',
    '2024-12-29': 'absent',
    '2024-12-30': 'present',
    '2024-12-31': 'present',
  
    // January 2025
    '2025-01-01': 'partial',
    '2025-01-02': 'present',
    '2025-01-03': 'absent',
    '2025-01-04': 'present',
    '2025-01-05': 'partial',
    '2025-01-06': 'present',
    '2025-01-07': 'present',
    '2025-01-08': 'present',
    '2025-01-09': 'present',
    '2025-01-10': 'absent',
    '2025-01-11': 'present',
    '2025-01-12': 'partial',
    '2025-01-13': 'absent',
    '2025-01-14': 'present',
    '2025-01-15': 'present',
    '2025-01-16': 'absent',
    '2025-01-17': 'present',
    '2025-01-18': 'present',
    '2025-01-19': 'absent',
    '2025-01-20': 'partial',
    '2025-01-21': 'present',
    '2025-01-22': 'present',
    '2025-01-23': 'partial',
    '2025-01-24': 'present',
    '2025-01-25': 'absent',
    '2025-01-26': 'present',
    '2025-01-27': 'present',
    '2025-01-28': 'partial',
    '2025-01-29': 'absent',
    '2025-01-30': 'present',
    '2025-01-31': 'present',
  
    // February 2025
    '2025-02-01': 'absent',
    '2025-02-02': 'partial',
    '2025-02-03': 'present',
    '2025-02-04': 'present',
    '2025-02-05': 'present',
    '2025-02-06': 'absent',
    '2025-02-07': 'present',
    '2025-02-08': 'present',
    '2025-02-09': 'partial',
    '2025-02-10': 'present',
    '2025-02-11': 'absent',
    '2025-02-12': 'present',
    '2025-02-13': 'partial',
    '2025-02-14': 'present',
    '2025-02-15': 'absent',
    '2025-02-16': 'present',
    '2025-02-17': 'partial',
    '2025-02-18': 'present',
    '2025-02-19': 'absent',
    '2025-02-20': 'present',
    '2025-02-21': 'present',
    '2025-02-22': 'partial',
    '2025-02-23': 'absent',
    '2025-02-24': 'present',
    '2025-02-25': 'present',
    '2025-02-26': 'partial',
    '2025-02-27': 'present',
    '2025-02-28': 'absent',
  
    // March 2025
    '2025-03-01': 'present',
    '2025-03-02': 'absent',
    '2025-03-03': 'present',
    '2025-03-04': 'partial',
    '2025-03-05': 'present',
    '2025-03-06': 'present',
    '2025-03-07': 'absent',
    '2025-03-08': 'present',
    '2025-03-09': 'partial',
    '2025-03-10': 'present',
    '2025-03-11': 'present',
    '2025-03-12': 'partial',
    '2025-03-13': 'present',
    '2025-03-14': 'absent',
    '2025-03-15': 'present',
    '2025-03-16': 'partial',
    '2025-03-17': 'present',
    '2025-03-18': 'absent',
    '2025-03-19': 'present',
    '2025-03-20': 'present',
    '2025-03-21': 'partial',
    '2025-03-22': 'absent',
    '2025-03-23': 'present',
    '2025-03-24': 'present',
    '2025-03-25': 'absent',
    '2025-03-26': 'present',
    '2025-03-27': 'partial',
    '2025-03-28': 'present',
    '2025-03-29': 'absent',
    '2025-03-30': 'present',
    '2025-03-31': 'partial',
  };

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };
  

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
      backgroundColor: "#f5f5f5"
    }}>

      {/* Back Button */}
      {/* <IconButton
        onClick={handleBackClick}
        sx={{
          // position: 'absolute',
          // top: { xs: 16, sm: 24 },
          // left: { xs: 16, sm: 24 },
        }}
      >
        <ArrowBackIcon sx={{ color: "#1a237e", fontSize: '2rem' }} />
      </IconButton> */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: "800",
          color: "#1a237e",
          mb: 4,
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        <IconButton
        onClick={handleBackClick}
        sx={{
          marigin:"0px 20px"
        }}
      >
        <ArrowBackIcon sx={{ color: "#1a237e", fontSize: '2rem' }} />
      </IconButton>

        {studentId} Attendance Overview
      </Typography>

      {/* comment out to insert student profile */}
      <Card 
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
      </Card>

      <Grid container spacing={3}>
        {/* Left Section: Attendance Chart */}
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
            <AttendanceChart data={monthlyData} filter="monthly" />
          </Paper>
        </Grid>

        {/* Right Section: Progress Indicator */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              background: "linear-gradient(135deg, #c3f18e 0%, #a7e663 100%)",
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

        <Grid item>

            <AttendaceHeatmap attendanceData={attendanceData}></AttendaceHeatmap>

        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentDashboard;