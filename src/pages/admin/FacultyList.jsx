import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,

  Box,
  Grid,

  Snackbar,
  Alert
} from '@mui/material';
import { Email, Phone, School, Book } from '@mui/icons-material';

import { headers } from '../../GetAuthToken';

const FacultyManagement = ({ year, authtoken }) => {
  const [facultyList, setFacultyList] = useState([]);

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });


  useEffect(() => {
    fetchFacultyData();
  }, []);

  const fetchFacultyData = () => {
    fetch('http://127.0.0.1:8000/admin/get-faculty', {
      method: 'GET',
      headers
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Success') {
          const formattedFaculty = data.faculty_details.map(faculty => ({
            name: `${faculty.first_name} ${faculty.last_name}`,
            email: faculty.email,
            phone: faculty.phone_number,
            classes: Object.entries(faculty.subjects).flatMap(([year, details]) =>
              details.sections.map(section => ({ year, section }))
            ),
            subjects: Object.values(faculty.subjects).map(detail => detail.subject)
          }));
          setFacultyList(formattedFaculty);
        }
      })
      .catch(error => {
        console.error('Error fetching faculty data:', error);
        showSnackbar('Failed to fetch faculty data', 'error');
      });
  };




  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };



  // Rest of the component remains the same...
  return (
    <Box sx={{ p: 4, bgcolor: '#f0f2f5', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ mb: 4, color: '#1565c0', textAlign: 'center' }}>
        Faculty Management - {year}
      </Typography>

      <Grid container spacing={3}>
        {facultyList.map((faculty, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{
              height: '100%',
              boxShadow: 3,
              borderRadius: 2,
              transition: '0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 6
              }
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#1565c0', mb: 2 }}>
                  {faculty.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Email sx={{ color: '#757575', mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">{faculty.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Phone sx={{ color: '#757575', mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">{faculty.phone}</Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <School sx={{ color: '#1565c0', mr: 1 }} />
                    <Typography variant="subtitle2" sx={{ color: '#1565c0' }}>Classes</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {faculty.classes.map((cls, i) => (
                      <Chip key={i} label={`${cls.year} ${cls.section}`} size="small" sx={{ bgcolor: '#e3f2fd', color: '#1565c0' }} />
                    ))}
                  </Box>
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Book sx={{ color: '#1565c0', mr: 1 }} />
                    <Typography variant="subtitle2" sx={{ color: '#1565c0' }}>Subjects</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {faculty.subjects.map((subject, index) => (
                      <Chip
                        key={index}
                        label={subject}
                        size="small"
                        sx={{ bgcolor: '#e8f5e9', color: '#2e7d32' }}
                      />
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>


      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FacultyManagement;