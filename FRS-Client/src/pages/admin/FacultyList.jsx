import React, { useState } from 'react';
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
  InputLabel
} from '@mui/material';
import { Add as AddIcon, Email, Phone, School, Book } from '@mui/icons-material';

const FacultyManagement = ({year}) => {
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [openClassDialog, setOpenClassDialog] = useState(false);
  const [openSubjectDialog, setOpenSubjectDialog] = useState(false);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  // Sample data
  const facultyList = [
    {
      id: 1,
      name: "Dr. John Doe",
      email: "john.doe@university.edu",
      phone: "+1 234-567-8900",
      classes: [
        { year: 'E2', section: 'A' },
        { year: 'E3', section: 'B' }
      ],
      subjects: ["Data Structures", "Algorithms"]
    },
    {
      id: 2,
      name: "Prof. Jane Smith",
      email: "jane.smith@university.edu",
      phone: "+1 234-567-8901",
      classes: [
        { year: 'E1', section: 'C' }
      ],
      subjects: ["Computer Networks"]
    }
  ];

  const years = ['E1', 'E2', 'E3', 'E4'];
  const sections = ['A', 'B', 'C', 'D'];
  const subjects = {
    'E1': ['Mathematics', 'Physics', 'Chemistry'],
    'E2': ['Data Structures', 'Computer Architecture', 'Digital Logic'],
    'E3': ['Algorithms', 'Operating Systems', 'Computer Networks'],
    'E4': ['Machine Learning', 'Cloud Computing', 'Cybersecurity']
  };

  const handleAddClass = (faculty) => {
    setSelectedFaculty(faculty);
    setOpenClassDialog(true);
  };

  const handleAddSubject = (faculty) => {
    setSelectedFaculty(faculty);
    setOpenSubjectDialog(true);
  };

  const handleClassSubmit = () => {
    // Here you would typically make an API call to update the faculty's classes
    console.log(`Assigning ${selectedYear} ${selectedSection} to ${selectedFaculty.name}`);
    setOpenClassDialog(false);
    setSelectedYear('');
    setSelectedSection('');
  };

  const handleSubjectSubmit = () => {
    // Here you would typically make an API call to update the faculty's subjects
    console.log(`Assigning ${selectedSubject} to ${selectedFaculty.name}`);
    setOpenSubjectDialog(false);
    setSelectedSubject('');
  };

  return (
    <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ mb: 4, color: '#1976d2' }}>
        Faculty Management of {year}
      </Typography>
      
      <Grid container spacing={3}>
        {facultyList.map((faculty) => (
          <Grid item xs={12} sm={6} md={4} key={faculty.id}>
            <Card 
              sx={{ 
                height: '100%',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)'
                }
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ color: '#1976d2', mb: 2 }}>
                  {faculty.name}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Email sx={{ color: '#757575', mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {faculty.email}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Phone sx={{ color: '#757575', mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {faculty.phone}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <School sx={{ color: '#1976d2', mr: 1 }} />
                    <Typography variant="subtitle2" sx={{ color: '#1976d2' }}>
                      Classes
                    </Typography>
                    <IconButton 
                      size="small" 
                      onClick={() => handleAddClass(faculty)}
                      sx={{ ml: 1 }}
                    >
                      <AddIcon sx={{ bgcolor:"e3f2fd",color: '#4caf50' }} />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {faculty.classes.map((cls, index) => (
                      <Chip
                        key={index}
                        label={`${cls.year} ${cls.section}`}
                        size="small"
                        sx={{ bgcolor: '#e3f2fd', color: '#1976d2' }}
                      />
                    ))}
                  </Box>
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Book sx={{ color: '#1976d2', mr: 1 }} />
                    <Typography variant="subtitle2" sx={{ color: '#1976d2' }}>
                      Subjects
                    </Typography>
                    <IconButton 
                      size="small" 
                      onClick={() => handleAddSubject(faculty)}
                      sx={{ ml: 1 }}
                    >
                      <AddIcon sx={{bgcolor:"e3f2fd", color: '#4caf50' }} />
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
            <Select
              value={selectedYear}
              label="Year"
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Section</InputLabel>
            <Select
              value={selectedSection}
              label="Section"
              onChange={(e) => setSelectedSection(e.target.value)}
              disabled={!selectedYear}
            >
              {sections.map((section) => (
                <MenuItem key={section} value={section}>{section}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenClassDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleClassSubmit}
            disabled={!selectedYear || !selectedSection}
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
            <Select
              value={selectedYear}
              label="Year"
              onChange={(e) => setSelectedYear(e.target.value)}
            >
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
              {selectedYear && subjects[selectedYear].map((subject) => (
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
    </Box>
  );
};

export default FacultyManagement;