import React from 'react';
import { Paper, Typography, Box, Avatar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

// NotificationItem Component
const NotificationItem = ({ title, message, time }) => (
  <Box
    sx={{
      display: 'flex',
      gap: 2,
      p: 1.5,
      '&:hover': { bgcolor: 'action.hover' },
      borderRadius: 1,
    }}
  >
    <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
      <NotificationsIcon />
    </Avatar>
    <Box>
      <Typography variant="subtitle2">{title}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        {message}
      </Typography>
      <Typography
        variant="caption"
        color="text.disabled"
        sx={{ mt: 0.5, display: 'block' }}
      >
        {time}
      </Typography>
    </Box>
  </Box>
);

// Notifications Component
const Notifications = () => {
  const notifications = [
    {
      title: 'Tomorrow Holiday',
      message: 'Due to annual function, tomorrow will be a holiday.',
      time: '2 hours ago',
    },
    {
      title: 'Attendance Update',
      message: "Your attendance has been marked for today's classes.",
      time: '4 hours ago',
    },
  ];

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Notifications & Reminders
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {notifications.map((notification, index) => (
          <NotificationItem key={index} {...notification} />
        ))}
      </Box>
    </Paper>
  );
};

export default Notifications;