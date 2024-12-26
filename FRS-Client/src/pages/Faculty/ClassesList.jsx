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
  IconButton,
  Paper,
} from '@mui/material';
import { green, red } from '@mui/material/colors';
import { ArrowBack, Group, CheckCircle, Cancel } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,Cell } from 'recharts';

const AttendanceChart = ({ present, total }) => {
  const absent = total - present;

  const data = [
    {
      category: 'Present',
      count: present,
      percentage: (present / total) * 100,
      color: green[500], // Green for present
    },
    {
      category: 'Absent',
      count: absent,
      percentage: (absent / total) * 100,
      color: red[500], // Red for absent
    },
  ];

  return (
    <Box sx={{ width: '100%', height: 300, mt: 2 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="category"
            label={{
              value: 'Attendance Status',
              position: 'bottom',
              offset: 0,
            }}
          />
          <YAxis
            label={{
              value: 'Number of Students',
              angle: -90,
              position: 'insideLeft',
              offset: 10,
            }}
            domain={[0, total]}
            ticks={[0, Math.ceil(total / 4), Math.ceil(total / 2), Math.ceil((3 * total) / 4), total]}
          />
          <Tooltip
            formatter={(value) => [
              `${value} students (${((value / total) * 100).toFixed(1)}%)`,
              'Count',
            ]}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #ccc',
            }}
            labelStyle={{ fontWeight: 'bold' }}
          />
          <Bar
            dataKey="count"
            radius={[4, 4, 0, 0]}
            barSize={60}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} /> // Dynamically set bar colors
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};


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

  const attendanceStats = {
    total: students.length,
    present: students.filter(s => s.status).length,
  };

  const absentStudents = students.filter(s => !s.status);

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
                  >
                    Mark Attendance
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => handleViewAttendance(section)}
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

  const renderAbsenteesList = () => (
    <Paper sx={{ 
      p: 2, 
      bgcolor: '#f5f5f5', 
      mt: 2,
      border: `1px solid ${red[100]}`
    }}>
      <Typography variant="h6" gutterBottom sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1,
        color: red[700]
      }}>
        <Cancel color="error" />
        Absent Students
      </Typography>
      {absentStudents.map((student) => (
        <Box 
          key={student.id}
          sx={{ 
            p: 2, 
            mb: 1, 
            bgcolor: 'white',
            borderRadius: 1,
            boxShadow: 1,
            borderLeft: `4px solid ${red[500]}`
          }}
        >
          <Typography variant="body1">
            ID: {student.id} - {student.name}
          </Typography>
        </Box>
      ))}
    </Paper>
  );

  const renderAttendanceDialog = () => (
    <Dialog 
      open={dialogOpen} 
      onClose={handleCloseDialog}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1,
        bgcolor: '#f5f5f5'
      }}>
        <Group />
        {selectedYear} Section {selectedSection} - Attendance Statistics
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            mb: 2,
            p: 2,
            bgcolor: '#f5f5f5',
            borderRadius: 1
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              color: green[700]
            }}>
              <CheckCircle sx={{ color: green[500] }} />
              <Typography>
                Present: {attendanceStats.present} ({((attendanceStats.present/attendanceStats.total) * 100).toFixed(1)}%)
              </Typography>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              color: red[700]
            }}>
              <Cancel sx={{ color: red[500] }} />
              <Typography>
                Absent: {attendanceStats.total - attendanceStats.present} ({(((attendanceStats.total - attendanceStats.present)/attendanceStats.total) * 100).toFixed(1)}%)
              </Typography>
            </Box>
          </Box>
          
          <AttendanceChart 
            present={attendanceStats.present} 
            total={attendanceStats.total} 
          />
          
          {renderAbsenteesList()}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }} role="main">
      {view === 'years' && renderYearCards()}
      {view === 'sections' && renderSectionCards()}
      {renderAttendanceDialog()}
    </Box>
  );
};

export default ClassesList;