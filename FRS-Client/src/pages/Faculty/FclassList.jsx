import React, { useState } from 'react';
import { TableHead,  } from '@mui/material';

import { 
  Grid, 
  Card, 
  CardContent, 
  Divider,
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from '@mui/material';
import { 
  School, 
  AccessTime, 
  CheckCircleOutline,
  HighlightOff
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';  
import { green, red } from '@mui/material/colors';

const classes = [
  { 
    id: 1, 
    subject: 'Math', 
    time: '10:00 AM', 
    endTime: '11:00 AM', 
    presents: 40, 
    absents: 5, 
    classFor: 'Sec : A', 
    absentStudents: [
      { id: 'S001', name: 'John Doe' },
      { id: 'S002', name: 'Jane Smith' },
    ] 
  },
  { 
    id: 2, 
    subject: 'Science', 
    time: '11:00 AM', 
    endTime: '12:00 PM', 
    presents: 18, 
    absents: 7, 
    classFor: 'Sec : B', 
    absentStudents: [
      { id: 'S003', name: 'Tom Brown' },
      { id: 'S004', name: 'Lisa White' },
    ]
  },
  { 
    id: 3, 
    subject: 'History', 
    time: '12:00 PM', 
    endTime: '1:00 PM', 
    presents: 22, 
    absents: 3, 
    classFor: 'Sec : C' ,
    absentStudents: [
        { id: 'S006', name: ' Brown' },
        { id: 'S007', name: ' White' },
      ]
  },
  { 
    id: 4, 
    subject: 'Art', 
    time: '1:00 PM', 
    endTime: '2:00 PM', 
    presents: 35, 
    absents: 10, 
    classFor: 'Sec : D',
    absentStudents: [{id:'s20',name:'cameron'},
    {id:'s21',name:'daniel'}]
  }// Add more classes with absentStudents...
];

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
            top: 100,
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

const ClassCards = ({ year }) => {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const getAttendancePercentage = (presents, absents) => {
    const total = presents + absents;
    return Math.round((presents / total) * 100);
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 75) return '#e8f5e9';
    if (percentage >= 70) return '#fff3e0';
    return '#ffebee';
  };

  const handleNavigation = (path, classId) => {
    navigate(`/faculty/todayclasses/${year}${path}/${classId}`);
  };

  const handleDialogOpen = (classItem) => {
    setSelectedClass(classItem);
    setDialogOpen(true); // Open the dialog
  };

  const handleDialogClose = () => {
    setDialogOpen(false); // Close the dialog
    setSelectedClass(null); // Reset selected class
  };

  return (
    <Box>
      <Typography 
        variant="h6"
        component="h1" 
        fontWeight="bold"
        color="#1a237e"
      >
        {`${year} class details`}
      </Typography>
      <Grid container spacing={2} sx={{ padding: '16px' }}>
        {classes.map((classItem) => {
          const attendancePercent = getAttendancePercentage(classItem.presents, classItem.absents);

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={classItem.id}>
              <Card 
                sx={{
                  height: '100%',
                  maxWidth: 280,
                  margin: 'auto',
                  borderRadius: '12px',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.12)'
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <School sx={{ color: '#1976d2' }} />
                      <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                        {classItem.subject}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="caption" 
                      sx={{
                        bgcolor: '#e3f2fd',
                        color: '#1976d2',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: '12px',
                        fontWeight: 'bold'
                      }}
                    >
                      {classItem.classFor}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 1.5 }} />

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <AccessTime sx={{ color: '#666' }} />
                    <Typography variant="body2" color="text.secondary">
                      {`${classItem.time} - ${classItem.endTime}`}
                    </Typography>
                  </Box>

                  <Box 
                    sx={{ 
                      bgcolor: getAttendanceColor(attendancePercent),
                      borderRadius: '8px',
                      p: 1.5,
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <CheckCircleOutline sx={{ color: '#4caf50', fontSize: '1rem' }} />
                          <Typography variant="body2">
                            Present: {classItem.presents}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <HighlightOff sx={{ color: '#f44336', fontSize: '1rem' }} />
                          <Typography variant="body2">
                            Absent: {classItem.absents}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {attendancePercent}%
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Attendance
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      size="small"
                      sx={{ textTransform: 'none' }}
                      onClick={() => handleNavigation('/facultyauth', classItem.id)}
                    >
                      Mark Attendance
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      size="small"
                      sx={{ textTransform: 'none' }}
                      onClick={() => handleDialogOpen(classItem)}
                    >
                      View Attendance
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Dialog Box with Bar Chart for Attendance */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          bgcolor: '#f5f5f5'
        }}>
          Attendance Statistics for {selectedClass?.subject} - {selectedClass?.classFor}
        </DialogTitle>
        <DialogContent>
  <AttendanceChart 
    present={selectedClass?.presents} 
    total={selectedClass?.presents + selectedClass?.absents} 
  />

  {/* Absentee Details Table */}
  <Box sx={{ mt: 2 }}>
    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1 }}>
      Absentees Details
    </Typography>
    <TableContainer component={Paper} sx={{ mt: 1, bgcolor: '#f5f5f5' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedClass?.absentStudents?.map((student) => (
            <TableRow key={student.id}>
              <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>{student.id}</TableCell>
              <TableCell sx={{ color: '#1976d2' }}>{student.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
</DialogContent>



        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClassCards;
