import React from 'react';
import { Paper, Typography } from '@mui/material';

const Notifications = ({ notifications }) => (
  <Paper sx={{ p: 2, height: '100%' }}>
    <Typography variant="h6" gutterBottom>
      Notifications & Reminders
    </Typography>
    {notifications.map((notification, index) => (
      <Paper key={index} sx={{ p: 2, mb: 2 }} elevation={1}>
        <Typography variant="subtitle1" gutterBottom>
          {notification.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {notification.message}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {notification.time}
        </Typography>
      </Paper>
    ))}
  </Paper>
);

export default Notifications;
