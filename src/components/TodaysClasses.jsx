import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Pagination } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';

const TodayClasses = ({ onMarkAttendance }) => {
  const classes = [
    { time: '09:00 AM', subject: 'Mathematics' },
    { time: '10:30 AM', subject: 'Physics' },
    { time: '12:00 PM', subject: 'Computer Science' },
    { time: '1:00 PM', subject: 'OOPS' },
    { time: '2:00 PM', subject: 'DBMS' },
    { time: '4:00 PM', subject: 'OS' },
    { time: '6:00 PM', subject: 'CN' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const classesPerPage = 5;

  // Calculate the indices for the current page
  const indexOfLastClass = currentPage * classesPerPage;
  const indexOfFirstClass = indexOfLastClass - classesPerPage;
  const currentClasses = classes.slice(indexOfFirstClass, indexOfLastClass);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Today's Classes
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {currentClasses.map((classItem, index) => (
          <Paper
            key={index}
            sx={{
              p: 2,
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', mb: 0.5 }}>
                  <AccessTimeIcon fontSize="small" />
                  <Typography variant="body2">{classItem.time}</Typography>
                </Box>
                <Typography variant="h6">{classItem.subject}</Typography>
              </Box>
              <Button
                variant="contained"
                onClick={onMarkAttendance}
              >
                Mark Attendance
              </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
              <GroupIcon fontSize="small" />
              <Typography variant="body2">32 Students</Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Pagination component */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          count={Math.ceil(classes.length / classesPerPage)} // Number of pages based on classes per page
          page={currentPage} // Current page
          onChange={handlePageChange} // Handle page change
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default TodayClasses;