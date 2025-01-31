import React, { useState, useEffect } from 'react';
import {
  Card, CardContent, Typography, Grid, Paper, List,
  ListItem, ListItemText, Box, Divider, TextField, Button
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
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    fetchFacultyDashboardData();
  }, [selectedDate]);

  const fetchFacultyDashboardData = async () => {
    const email = localStorage.getItem('token'); // Get email from localStorage

    if (!email) {
      console.error("Faculty email is not available in localStorage");
      return;
    }

    try {
      const response = await axios.get('http://127.0.0.1:8000/faculty/faculty/dashboard/', {
        params: {
          email_address: email,
          date: selectedDate
        }
        
      });
      console.log(email);
      const { schedule, attendance } = response.data;
      setSchedule(schedule);
      setAttendance(attendance);

      // Calculate total classes and attendance rate
      const totalClasses = schedule.length;
      const presentStudents = attendance.reduce((acc, curr) => acc + (curr.present_ids !== "N/A" ? curr.present_ids.length : 0), 0);
      const totalStudents = attendance.reduce((acc, curr) => acc + (curr.present_ids !== "N/A" ? curr.present_ids.length : 0) + (curr.absent_ids !== "N/A" ? curr.absent_ids.length : 0), 0);
      const attendanceRate = totalStudents > 0 ? ((presentStudents / totalStudents) * 100).toFixed(1) : 0;

      setFacultyData(prevState => ({
        ...prevState,
        totalClasses,
        attendanceRate
      }));

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
        <Grid item xs={12} md={8}>
          <Card sx={{ boxShadow: 3, mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <Class sx={{ mr: 1, color: '#1976d2' }} />
                Classes Information
              </Typography>
              <Grid container spacing={2}>
                {schedule.map((item, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <Paper elevation={3} sx={{ p: 3, textAlign: 'center', transition: 'transform 0.2s ease', '&:hover': { transform: 'translateY(-5px)' } }}>
                      <Typography variant="h6" color="primary">{item.subject}</Typography>
                      <Typography variant="h6">{item.year} - {item.section}</Typography>
                      <Typography variant="body1">Periods: {item.periods.join(', ')}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3, height: 'auto' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <Person sx={{ mr: 1, color: '#1976d2' }} />
                Attendance Rate
              </Typography>
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h2">
                  {facultyData.attendanceRate}%
                </Typography>
                <Typography variant="h5" sx={{ mt: 1 }} color={getAttendanceColor(facultyData.attendanceRate)}>
                  Attendance
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <Announcement sx={{ mr: 1, color: '#1976d2' }} />
                Important Notices
              </Typography>
              <List>
                {notices.map((notice, index) => (
                  <React.Fragment key={notice.id}>
                    <ListItem sx={{ backgroundColor: notice.priority === 'high' ? '#fff3f3' : 'transparent', borderRadius: 1 }}>
                      <ListItemText
                        primary={<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{notice.title}</Typography>}
                        secondary={notice.content}
                      />
                    </ListItem>
                    {index < notices.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FacultyDashboard;
