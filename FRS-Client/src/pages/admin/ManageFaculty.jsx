import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Paper, 
  Chip,
  useTheme,
  useMediaQuery,
  TextField 
} from '@mui/material';
import {
  Group as GroupIcon,
  PersonOutline as PersonIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Class as ClassIcon,
  School as SchoolIcon,
  MenuBook as MenuBookIcon
} from '@mui/icons-material';

const facultyData = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    year: "Third Year",
    class: "CSE-A",
    subject: "Data Structures",
    status: "present"
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    year: "Second Year",
    class: "IT-B",
    subject: "Database Management",
    status: "absent"
  },
  {
    id: 3,
    name: "Dr. Emily Parker",
    year: "Fourth Year",
    class: "CSE-C",
    subject: "Machine Learning",
    status: "present"
  },
  {
    id: 4,
    name: "Prof. David Wilson",
    year: "First Year",
    class: "CSE-D",
    subject: "Programming Basics",
    status: "present"
  },
  {
    id: 5,
    name: "Dr. Lisa Anderson",
    year: "Third Year",
    class: "IT-A",
    subject: "Web Development",
    status: "absent"
  }
];

const ManageFacultyPreview = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const summaryCards = [
    { 
      title: 'Total Faculty', 
      count: facultyData.length, 
      color: 'rgba(33, 150, 243, 0.8)', 
      bgColor: 'rgba(227, 242, 253, 0.8)',
      icon: GroupIcon
    },
    { 
      title: 'Present Today', 
      count: facultyData.filter(f => f.status === 'present').length, 
      color: 'rgba(46, 125, 50, 0.8)',
      bgColor: 'rgba(232, 245, 229, 0.8)',
      icon: CheckCircleIcon
    },
    { 
      title: 'Absent Today', 
      count: facultyData.filter(f => f.status === 'absent').length, 
      color: 'rgba(211, 47, 47, 0.8)',
      bgColor: 'rgba(255, 235, 238, 0.8)',
      icon: CancelIcon
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 1, sm: 2, md: 3 } }}>
      {/* Header Section */}
      <Box sx={{ 
        mb: { xs: 2, sm: 3 },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 1
      }}>
        <Typography 
          variant={isMobile ? "h6" : "h5"} 
          component="h1" 
          fontWeight="bold"
          color="#1a237e"
        >
          Faculty Attendance
        </Typography>

        <TextField
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          sx={{ 
            width: { xs: '100%', sm: 200 },
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: 'white'
            }
          }}
          InputLabelProps={{ shrink: true }}
          label="Select Date"
        />
      </ Box>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: { xs: 2, sm: 3 } }}>
        {summaryCards.map((item) => (
          <Grid item xs={12} sm={4} key={item.title}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 2,
                height: '100%',
                borderRadius: 4,
                backgroundColor: item.bgColor,
                border: '1px solid',
                borderColor: 'rgba(0,0,0,0.1)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: item.color,
                    mr: 1
                  }}
                >
                  <item.icon sx={{ color: 'white', fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography 
                    variant="h5" 
                    component="div" 
                    fontWeight="bold"
                    color={item.color}
                    sx={{ mb: 0.5 }}
                  >
                    {item.count}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    fontWeight="medium"
                  >
                    {item.title}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Faculty Cards Grid */}
      <Grid container spacing={2}>
        {facultyData.map((faculty) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={faculty.id}>
            <Card 
              sx={{ 
                height: '100%',
                borderRadius: 4,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }
              }}
            >
              <Box
                sx={{
                  p: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  backgroundColor: faculty.status === 'present' ? 'rgba(232, 245, 229, 0.8)' : 'rgba(255, 235, 238, 0.8)'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: faculty.status === 'present' ? 'rgba(46, 125, 50, 0.8)' : 'rgba(211, 47, 47, 0.8)',
                      mr: 1
                    }}
                  >
                    <PersonIcon sx={{ color: 'white', fontSize: 20 }} />
                  </Box>
                  <Typography 
                    variant="subtitle1"
                    sx={{ 
                      fontWeight: 'bold',
                      color: faculty.status === 'present' ? '#1b5e20' : '#b71c1c'
                    }}
                  >
                    {faculty.name}
                  </Typography>
                </Box>
                <Chip
                  label={faculty.status.toUpperCase()}
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    backgroundColor: faculty.status === 'present' ? 'rgba(46, 125, 50, 0.8)' : 'rgba(211, 47, 47, 0.8)',
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                />
              </Box>
              <CardContent sx={{ p: 1.5 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {[
                    { label: 'Year', value: faculty.year, icon: SchoolIcon },
                    { label: 'Class', value: faculty.class, icon: ClassIcon },
                    { label: 'Subject', value: faculty.subject, icon: MenuBookIcon }
                  ].map((item) => (
                    <Box 
                      key={item.label}
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        gap: 1
                      }}
 >
                      <item.icon sx={{ color: '#666', fontSize: 20 }} />
                      <Box>
                        <Typography color="text.secondary" variant="body2" sx={{ mb: 0.5 }}>
                          {item.label}
                        </Typography>
                        <Typography fontWeight="medium" sx={{ fontSize: '0.875rem' }}>
                          {item.value}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ManageFacultyPreview;