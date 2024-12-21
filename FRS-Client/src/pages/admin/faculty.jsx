import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid, Paper, Box, Typography, CssBaseline } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useTheme } from '@mui/material/styles';
import Notifications from '../../components/notifications';
import TodayClasses from '../../components/TodaysClasses';

// Theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue color for primary
    },
    secondary: {
      main: '#dc004e', // Red color for secondary
    },
  },
});

// StatCard Component with 3 rows
const StatCard = ({ icon, label, value }) => {
  const theme = useTheme();
  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            bgcolor: theme.palette?.primary?.main || '#1976d2', // Fallback to default color
            opacity: 0.2,
            p: 1,
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography color="text.secondary" variant="body2">
            {label}
          </Typography>
          <Typography variant="h6">{value}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

// DashboardStats Component - Stacked StatCards in 3 rows
const DashboardStats = () => (
  <Box>
    <StatCard
      icon={<PeopleIcon color="primary" />}
      label="Total Students"
      value="156"
    />
    <Box sx={{ my: 2 }} />
    <StatCard
      icon={<AccessTimeIcon color="primary" />}
      label="Classes Today"
      value="6"
    />
    <Box sx={{ my: 2 }} />
    <StatCard
      icon={<CalendarTodayIcon color="primary" />}
      label="Attendance Rate"
      value="92%"
    />
  </Box>
);

// App Component
const Faculty = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box sx={{ padding: 3 }}>
      {/* Top Section: StatCard and Notifications side by side */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          {/* StatCard on the left */}
          <Grid item xs={12} md={6}>
            <DashboardStats />
          </Grid>

          {/* Notifications on the right */}
          <Grid item xs={12} md={6}>
            <Notifications />
          </Grid>
        </Grid>
      </Box>

      {/* Today Classes Section */}
      <Box>
        <TodayClasses />
      </Box>
    </Box>
  </ThemeProvider>
);

// Render the app


