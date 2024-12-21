import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const ClassesList = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [view, setView] = useState('years');

  // Example data structure
  const years = ['E1', 'E2', 'E3', 'E4'];
  const sections = ['A', 'B', 'C', 'D', 'E', 'F'];
  
  const students = [
    { rollNo: 1, id: 'STU001', name: 'Alice Johnson', status: true },
    { rollNo: 2, id: 'STU002', name: 'Bob Smith', status: false },
    { rollNo: 3, id: 'STU003', name: 'Charlie Brown', status: true },
    { rollNo: 4, id: 'STU004', name: 'David Wilson', status: true },
    { rollNo: 5, id: 'STU005', name: 'Eve Williams', status: false },
    { rollNo: 6, id: 'STU006', name: 'Frank Miller', status: true },
    { rollNo: 7, id: 'STU007', name: 'Grace Davis', status: true },
    { rollNo: 8, id: 'STU008', name: 'Henry Garcia', status: false },
  ];

  const handleYearClick = (year) => {
    setSelectedYear(year);
    setView('sections');
  };

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const handleBack = () => {
    if (view === 'sections') {
      setView('years');
      setSelectedYear(null);
    }
  };

  const handleViewAttendance = (section) => {
    setSelectedSection(section);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const renderYearCards = () => (
    <Grid container spacing={4} sx={{ p: 4 }}>
      {years.map((year) => (
        <Grid item xs={12} sm={6} md={3} key={year}>
          <Card 
            sx={{ 
              cursor: 'pointer',
              transition: 'box-shadow 0.3s',
              '&:hover': {
                boxShadow: 6,
              },
            }}
            onClick={() => handleYearClick(year)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleYearClick(year);
            }}
          >
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h4" component="div" gutterBottom>
                {year}
              </Typography>
              <Typography color="text.secondary">
                Click to view sections
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const renderSectionCards = () => (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <IconButton 
          onClick={handleBack} 
          sx={{ mr: 2 }}
          aria-label="Go back to years view"
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h5">
          Sections for {selectedYear}
        </Typography>
      </Box>
      
      <Grid container spacing={4}>
        {sections.map((section) => (
          <Grid item xs={12} sm={6} md={4} key={section}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Section {section}
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2 
                }}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleSectionClick(section)}
                    aria-label={`Mark attendance for Section ${section}`}
                  >
                    Mark Attendance
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => handleViewAttendance(section)}
                    aria-label={`View attendance for Section ${section}`}
                  >
                    View Attendance
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderAttendanceDialog = () => (
    <Dialog 
      open={dialogOpen} 
      onClose={handleCloseDialog}
      maxWidth="md"
      fullWidth
      aria-labelledby="attendance-dialog-title"
      keepMounted={false}
      disablePortal={false}
      hideBackdrop={false}
    >
      <DialogTitle id="attendance-dialog-title">
        {selectedYear} Section {selectedSection} - Attendance
      </DialogTitle>
      <DialogContent>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table aria-label="Attendance table">
            <TableHead>
              <TableRow>
                <TableCell>Roll No</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.rollNo}</TableCell>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    <Typography
                      color={student.status ? 'success.main' : 'error.main'}
                      aria-label={student.status ? 'Present' : 'Absent'}
                    >
                      {student.status ? 'Present' : 'Absent'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={handleCloseDialog} 
          color="primary"
          aria-label="Close attendance dialog"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box 
      sx={{ maxWidth: 1200, mx: 'auto' }}
      role="main"
    >
      {view === 'years' && renderYearCards()}
      {view === 'sections' && renderSectionCards()}
      {renderAttendanceDialog()}
    </Box>
  );
};

export default ClassesList;