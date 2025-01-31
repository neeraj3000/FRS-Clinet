import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Box,
  Divider,
  CircularProgress
} from '@mui/material';
import { Announcement, Groups } from '@mui/icons-material';
import { List, ListItem, ListItemText } from '@mui/material';
import { authtoken } from '../../GetAuthToken';

const AdminDashboard = () => {
  const [greeting, setGreeting] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      console.log(authtoken)
      try {
        const response = await fetch('http://127.0.0.1:8000/admin/dashboard',{
          headers:{
            'Content-Type': 'application/json',
            "Authorization":`Bearer ${authtoken}`
          }
        });

        console.log(response)
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const data = await response.json();
        const formattedData = Object.entries(data).map(([year, attendance]) => ({
          year,
          attendance
        }));

        setAttendanceData(formattedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

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
        {/* Attendance Data */}
        <Grid item xs={12}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <Groups sx={{ mr: 1, color: '#1976d2' }} />
                Year-wise Attendance
              </Typography>

              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress />
                </Box>
              ) : error ? (
                <Typography color="error">{error}</Typography>
              ) : (
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
              )}
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
