import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider
} from '@mui/material';
import { Class, Announcement, Person } from '@mui/icons-material';

const FacultyDashboard = () => {
  const [greeting, setGreeting] = useState('');
  const [facultyData, setFacultyData] = useState({
    name: 'Faculty',
    branch: 'Computer Science',
  });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const totalFaculty = 200;
  const absentFaculty = 180; 
  const absentPercentage = ((absentFaculty / totalFaculty) * 100).toFixed(1);

  // Determine the color based on the percentage
  const getAttendanceColor = (percentage) => {
    if (percentage < 70) return 'error'; // Red for less than 70%
    else if (percentage >= 70 && percentage <= 75) return 'warning'; // Yellow for 70-75%
    else return 'success'; // Green for above 75%
  };

  const classesData = [
    { label: 'Total Classes Today', value: 30 },
    { label: "Today's Active Classes", value: 25 },
    { label: 'Total Students', value: 400 }
  ];

  const notices = [
    { id: 1, title: 'Faculty Meeting', content: 'Tomorrow at 10 AM', priority: 'high' },
    { id: 2, title: 'Holiday Notice', content: 'College closed on Monday', priority: 'medium' },
    { id: 3, title: 'Exam Schedule', content: 'Mid-semester exams start next week', priority: 'high' },
  ];

  return (
    <Box sx={{ p: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header Section */}
      <Card sx={{ mb: 4, p: 2, backgroundColor: '#1976d2', color: 'white' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {greeting}, {facultyData.name}
        </Typography>
        <Typography variant="subtitle1">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
          })} | Branch: {facultyData.branch}
        </Typography>
      </Card>

      <Grid container spacing={3}>
        {/* Main Content - Left Section */}
        <Grid item xs={12} md={8}>
          {/* Classes Section */}
          <Card sx={{ boxShadow: 3, mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <Class sx={{ mr: 1, color: '#1976d2' }} />
                Classes Information
              </Typography>
              <Grid container spacing={2}>
                {classesData.map((item, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <Paper
                      elevation={3}
                      sx={{
                        p: 3,
                        textAlign: 'center',
                        transition: 'transform 0.2s ease', // Smooth transition for movement
                        '&:hover': {
                          transform: 'translateY(-5px)', // Move card slightly up on hover
                        }
                      }}
                    >
                      <Typography variant="h6" color="primary">{item.label}</Typography>
                      <Typography variant="h3">{item.value}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Attendance Rate - Right Section */}
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3, height: 'auto' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <Person sx={{ mr: 1, color: '#1976d2' }} />
                Attendance Rate
              </Typography>
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h2">
                  {absentFaculty}/{totalFaculty}
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ mt: 1 }}
                  color={getAttendanceColor(absentPercentage)} // Set the color based on the percentage
                >
                  {absentPercentage}% Absent
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
                    <ListItem 
                      sx={{ 
                        backgroundColor: notice.priority === 'high' ? '#fff3f3' : 'transparent',
                        borderRadius: 1
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {notice.title}
                          </Typography>
                        }
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
