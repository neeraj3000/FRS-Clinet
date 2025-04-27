import React, { useState, useEffect } from 'react';
import {
  Card, CardContent, Typography, Grid, Paper, List,
  ListItem, ListItemText, Box, Divider, TextField
} from '@mui/material';
import { Class, Announcement, Person } from '@mui/icons-material';
import axios from 'axios';

const FacultyDashboard = () => {
  const [greeting, setGreeting] = useState('');
  const [facultyData, setFacultyData] = useState({
    name: 'Faculty',
    branch: 'Computer Science',
  });
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [schedule, setSchedule] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [notices, setNotices] = useState([]); // Correctly initialized

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    fetchFacultyDashboardData();
  }, [selectedDate]);

  const fetchFacultyDashboardData = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error("Faculty token is not available in localStorage");
      return;
    }

    try {
      const response = await axios.get('http://127.0.0.1:8000/faculty/dashboard/', {
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        params: { date: selectedDate }
      });

      const { schedule, attendance } = response.data;
      console.log(response.data);

      setSchedule(schedule || []);  // safe fallback
      setAttendance(attendance || []);

      // Update faculty info
      const totalClasses = schedule.length;
      const presentStudents = attendance.reduce((acc, curr) => acc + (curr.present_ids !== "N/A" ? curr.present_ids.length : 0), 0);
      const totalStudents = attendance.reduce((acc, curr) => acc + (curr.present_ids !== "N/A" ? curr.present_ids.length : 0) + (curr.absent_ids !== "N/A" ? curr.absent_ids.length : 0), 0);
      const attendanceRate = totalStudents > 0 ? ((presentStudents / totalStudents) * 100).toFixed(1) : 0;

      setFacultyData(prev => ({
        ...prev,
        totalClasses,
        attendanceRate
      }));

      // If your backend sends notices too, you can uncomment below
      // setNotices(response.data.notices || []);

    } catch (error) {
      console.error('Error fetching faculty dashboard data:', error);
    }
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const getAttendanceColor = (percentage) => {
    if (percentage < 70) return 'error';
    else if (percentage >= 70 && percentage <= 75) return 'warning';
    else return 'success';
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Card sx={{ mb: 4, p: 2, backgroundColor: '#1976d2', color: 'white' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {greeting}, {facultyData.name}
        </Typography>
        <Typography variant="subtitle1">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
          })} | Branch: {facultyData.branch}
        </Typography>
        <TextField
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          sx={{ mt: 2, backgroundColor: 'white', borderRadius: 1 }}
        />
      </Card>

      <Grid container spacing={3}>
        {/* Classes Info */}
        <Grid item xs={12} md={8}>
          <Card sx={{ boxShadow: 3, mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <Class sx={{ mr: 1, color: '#1976d2' }} />
                Classes Information
              </Typography>
              <Grid container spacing={2}>
                {Array.isArray(schedule) && schedule.length > 0 ? (
                  schedule.map((item, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                      <Paper elevation={3} sx={{ p: 3, textAlign: 'center', transition: 'transform 0.2s ease', '&:hover': { transform: 'translateY(-5px)' } }}>
                        <Typography variant="h6" color="primary">{item.subject}</Typography>
                        <Typography variant="h6">{item.year} - {item.section}</Typography>
                        <Typography variant="body1">Periods: {item.periods.join(', ')}</Typography>
                      </Paper>
                    </Grid>
                  ))
                ) : (
                  <Typography variant="body1" sx={{ p: 2 }}>No classes scheduled for today.</Typography>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Attendance Rate */}
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3, height: 'auto' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <Person sx={{ mr: 1, color: '#1976d2' }} />
                Attendance Rate
              </Typography>
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h2">
                  {facultyData.attendanceRate || 0}%
                </Typography>
                <Typography variant="h5" sx={{ mt: 1 }} color={getAttendanceColor(facultyData.attendanceRate)}>
                  Attendance
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Notices */}
        <Grid item xs={12}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <Announcement sx={{ mr: 1, color: '#1976d2' }} />
                Important Notices
              </Typography>
              <List>
                {Array.isArray(notices) && notices.length > 0 ? (
                  notices.map((notice, index) => (
                    <React.Fragment key={notice.id || index}>
                      <ListItem sx={{ backgroundColor: notice.priority === 'high' ? '#fff3f3' : 'transparent', borderRadius: 1 }}>
                        <ListItemText
                          primary={<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{notice.title}</Typography>}
                          secondary={notice.content}
                        />
                      </ListItem>
                      {index < notices.length - 1 && <Divider />}
                    </React.Fragment>
                  ))
                ) : (
                  <Typography variant="body1" sx={{ p: 2 }}>No notices available.</Typography>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FacultyDashboard;
