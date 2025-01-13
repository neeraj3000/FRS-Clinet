import React from 'react';
import { useState, useEffect } from 'react';
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
import {
  School,
  Person,
  Announcement,
  Class,
  Groups
} from '@mui/icons-material';

const AdminDashboard = () => {
  const [greeting, setGreeting] = useState('');
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const attendanceData = [
    { year: 'E1', attendance: 85 },
    { year: 'E2', attendance: 88 },
    { year: 'E3', attendance: 92 },
    { year: 'E4', attendance: 90 },
  ];

  const classesData = [
    { year: 'E1', classes: 6 },
    { year: 'E2', classes: 7 },
    { year: 'E3', classes: 5 },
    { year: 'E4', classes: 6 },
  ];

  const totalFaculty = 45;
  const absentFaculty = 3;

  const notices = [
    { id: 1, title: 'Faculty Meeting', content: 'Tomorrow at 10 AM', priority: 'high' },
    { id: 2, title: 'Holiday Notice', content: 'College closed on Monday', priority: 'medium' },
    { id: 3, title: 'Exam Schedule', content: 'Mid-semester exams start next week', priority: 'high' },
  ];

  return (
    <Box sx={{ p: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Card sx={{ mb: 4, p: 2, backgroundColor: '#1976d2', color: 'white' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {greeting}, Admin
        </Typography>
        <Typography variant="subtitle1">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </Typography>
      </Card>

      <Grid container spacing={3}>
        {/* Yesterday's Classes by Year */}
        <Grid item xs={12} md={8}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <Class sx={{ mr: 1, color: '#1976d2' }} />
                Yesterday's Classes
              </Typography>
              <Grid container spacing={2}>
                {classesData.map((item) => (
                  <Grid item xs={6} sm={3} key={item.year}>
                    <Paper 
                      elevation={2} 
                      sx={{ 
                        p: 2, 
                        textAlign: 'center',
                        backgroundColor: '#f8f9fa',
                        border: '1px solid #dee2e6',
                        transition: '0.3s',
                        '&:hover': { transform: 'translateY(-5px)' }
                      }}
                    >
                      <Typography variant="h6" color="primary">{item.year}</Typography>
                      <Typography variant="h4">{item.classes}</Typography>
                      <Typography variant="body2" color="text.secondary">Classes</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Faculty Absent Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3, height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <Person sx={{ mr: 1, color: '#1976d2' }} />
                Faculty Attendance
              </Typography>
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h2">{absentFaculty}/{totalFaculty}</Typography>
                <Typography variant="h5" color="error" sx={{ mt: 1 }}>
                  {((absentFaculty/totalFaculty) * 100).toFixed(1)}% Absent
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Attendance Data */}
        <Grid item xs={12}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <Groups sx={{ mr: 1, color: '#1976d2' }} />
                Year-wise Attendance
              </Typography>
              <Grid container spacing={2}>
                {attendanceData.map((item) => (
                  <Grid item xs={12} sm={6} md={3} key={item.year}>
                    <Paper 
                      elevation={2} 
                      sx={{ 
                        p: 3, 
                        textAlign: 'center',
                        backgroundColor: '#f8f9fa',
                        border: '1px solid #dee2e6',
                        transition: '0.3s',
                        '&:hover': { transform: 'translateY(-5px)' }
                      }}
                    >
                      <Typography variant="h6" color="primary">{item.year}</Typography>
                      <Typography variant="h3">{item.attendance}%</Typography>
                      <Typography variant="body2" color="text.secondary">Average Attendance</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
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

export default AdminDashboard;