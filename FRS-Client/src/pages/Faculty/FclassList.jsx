import React, { useState, useEffect } from 'react';
import ClassList from "./ClassesList"; 
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
  Paper,
  CircularProgress,
  Alert,
  TableHead
} from '@mui/material';
import { 
  School, 
  AccessTime, 
  CheckCircleOutline,
  HighlightOff,
  ContentCutOutlined
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';  
import { green, red } from '@mui/material/colors';

// Define the AttendanceChart component
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

const ClassCards = ({ year, date }) => {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classes, setClasses] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  // Period-to-time mapping
  const periodTimeMapping = {
    p1: { start: "8:30 AM", end: "9:30 AM" },
    p2: { start: "9:30 AM", end: "10:30 AM" },
    p3: { start: "10:40 AM", end: "11:40 AM" },
    p4: { start: "11:40 AM", end: "12:40 PM" },
    p5: { start: "1:40 PM", end: "2:40 PM" },
    p6: { start: "2:40 PM", end: "3:40 PM" },
    p7: { start: "3:40 PM", end: "4:40 PM" },
  };

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token
        if (!token) {
          throw new Error('No authentication token found');
        }

        // Include the date parameter in the API request
        const response = await fetch(`http://127.0.0.1:8000/faculty/dashboard/?date=${date}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the headers
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log("Fetched Data:", data);

        // Validate and transform the data
        if (data && Array.isArray(data.schedule)) {
          const transformedData = data.schedule.map((classItem) => {
            // Get the first period from the periods array
            const period = classItem.periods[0]; // Assuming each class has at least one period
            const timeSlot = periodTimeMapping[period] || { start: "N/A", end: "N/A" }; // Default to "N/A" if period is invalid

            return {
              id: classItem.subject + "-" + classItem.section, // Generate a unique ID
              subject: classItem.subject || "N/A",
              classFor: `Sec: ${classItem.section || "N/A"}`,
              time: timeSlot.start, // Set time based on period
              endTime: timeSlot.end, // Set endTime based on period
              presents: classItem.presents || 0, // Use presents from backend
            absents: classItem.absents || 0, // Use absents from backend
            absentStudents: classItem.absentStudents || [],  // Default value for absentStudents
            };
          });

          setClasses(transformedData); // Update state with transformed data
        } else {
          throw new Error('Invalid data format received from the server');
        }
      } catch (error) {
        setError(error.message); // Set error message
        setClasses([]); // Reset classes to an empty array in case of error
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchData();
  }, [date]); // Re-fetch data when the date changes

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
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedClass(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
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
                      {`${year.toUpperCase()}, SEC: ${classItem.classFor.split(': ')[1].toUpperCase()}`} {/* Year and Section in uppercase */}
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
                      onClick={() => handleNavigation('/markattendance', classItem.id)}
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