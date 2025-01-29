import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert
} from '@mui/material';
import { Add as AddIcon, Email, Phone, School, Book } from '@mui/icons-material';

const FacultyManagement = ({ year }) => {
  const [facultyList, setFacultyList] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [openClassDialog, setOpenClassDialog] = useState(false);
  const [openSubjectDialog, setOpenSubjectDialog] = useState(false);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [subjects, setSubjects] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const years = ['E1', 'E2', 'E3', 'E4'];
  const sections = ['A', 'B', 'C', 'D', 'E'];

  useEffect(() => {
    fetchFacultyData();
    fetchSubjectsData();
  }, []);

  const fetchFacultyData = () => {
    axios.get('http://127.0.0.1:8000/admin/get-faculty')
      .then(response => {
        if (response.data.message === 'Success') {
          const formattedFaculty = response.data.faculty_details.map(faculty => ({
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

  const fetchSubjectsData = () => {
    axios.get('http://127.0.0.1:8000/admin/get-subjects')
      .then(response => {
        setSubjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching subjects:', error);
        showSnackbar('Failed to fetch subjects', 'error');
      });
  };

  const handleAddClass = (faculty) => {
    setSelectedFaculty(faculty);
    setSelectedYear('');
    setSelectedSection('');
    setOpenClassDialog(true);
  };

  const handleAddSubject = (faculty) => {
    setSelectedFaculty(faculty);
    setSelectedYear('');
    setSelectedSubject('');
    setOpenSubjectDialog(true);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleClassSubmit = async () => {
    try {
      const payload = {
        year: selectedYear,
        assignments: [
          {
            subname: selectedSubject,
            data: [
              {
                faculty_username: selectedFaculty.email,
                sec: [selectedSection]
              }
            ]
          }
        ]
      };

      const response = await axios.post(
        'http://127.0.0.1:8000/admin/update-timetable-for-faculty/',
        payload
      );

      console.log(payload)

      if (response.data.status_code === 200) {
        showSnackbar('Class assigned successfully');
        fetchFacultyData(); // Refresh faculty data
      } else {
        showSnackbar('Failed to assign class', 'error');
      }
    } catch (error) {
      console.error('Error assigning class:', error);
      showSnackbar('Failed to assign class', 'error');
    }

    setOpenClassDialog(false);
  };

  const handleSubjectSubmit = async () => {
    try {
      const payload = {
        year: selectedYear,
        assignments: [
          {
            subname: selectedSubject,
            data: [
              {
                faculty_username: selectedFaculty.email,
                sec: [] // Empty array since we're just assigning subject
              }
            ]
          }
        ]
      };

      const response = await axios.post(
        'http://127.0.0.1:8000/admin/update-timetable-for-faculty/',
        payload
      );

      if (response.data.status_code === 200) {
        showSnackbar('Subject assigned successfully');
        fetchFacultyData(); // Refresh faculty data
      } else {
        showSnackbar('Failed to assign subject', 'error');
      }
    } catch (error) {
      console.error('Error assigning subject:', error);
      showSnackbar('Failed to assign subject', 'error');
    }

    setOpenSubjectDialog(false);
  };

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
                    <IconButton
                      size="small"
                      onClick={() => handleAddClass(faculty)}
                      sx={{ ml: 1 }}
                    >
                      <AddIcon sx={{ color: '#4caf50' }} />
                    </IconButton>
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
                    <IconButton
                      size="small"
                      onClick={() => handleAddSubject(faculty)}
                      sx={{ ml: 1 }}
                    >
                      <AddIcon sx={{ color: '#4caf50' }} />
                    </IconButton>
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

      {/* Add Class Dialog */}
      <Dialog open={openClassDialog} onClose={() => setOpenClassDialog(false)}>
        <DialogTitle>Assign Class</DialogTitle>
        <DialogContent sx={{ minWidth: 300 }}>
          <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
            <InputLabel>Year</InputLabel>
            <Select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
              {years.map((year) => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Section</InputLabel>
            <Select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} disabled={!selectedYear}>
              {sections.map((section) => (
                <MenuItem key={section} value={section}>{section}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Subject</InputLabel>
            <Select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              disabled={!selectedYear}
            >
              {selectedYear && subjects[selectedYear]?.map((subject) => (
                <MenuItem key={subject} value={subject}>{subject}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenClassDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleClassSubmit} 
            disabled={!selectedYear || !selectedSection || !selectedSubject} 
            variant="contained"
          >
            Assign
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Subject Dialog */}
      <Dialog open={openSubjectDialog} onClose={() => setOpenSubjectDialog(false)}>
        <DialogTitle>Assign Subject</DialogTitle>
        <DialogContent sx={{ minWidth: 300 }}>
          <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
            <InputLabel>Year</InputLabel>
            <Select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
              {years.map((year) => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Subject</InputLabel>
            <Select
              value={selectedSubject}
              label="Subject"
              onChange={(e) => setSelectedSubject(e.target.value)}
              disabled={!selectedYear}
            >
              {selectedYear && subjects[selectedYear]?.map((subject) => (
                <MenuItem key={subject} value={subject}>{subject}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSubjectDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSubjectSubmit} 
            disabled={!selectedYear || !selectedSubject} 
            variant="contained"
          >
            Assign
          </Button>
        </DialogActions>
      </Dialog>

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