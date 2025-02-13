import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Brightness4 as DarkModeIcon,
  Language as LanguageIcon,
  Lock as SecurityIcon,
} from '@mui/icons-material';

const Settings = () => {
  // Settings states
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('english');
  const [securityAlerts, setSecurityAlerts] = useState(true);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '87vh',
        backgroundColor: '#f5f5f5', // Subtle background color
        p: 2,
      }}
    >
      <Paper
        sx={{
          p: 3,
          maxWidth: 600,
          width: '100%',
          height: '50vh',
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Settings
        </Typography>
        <List>
          {/* Notifications */}
          <ListItem>
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText
              primary="Notifications"
              secondary="Receive notifications about class schedules and updates"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  color="primary"
                />
              }
              label=""
            />
          </ListItem>
          <Divider />

          {/* Dark Mode */}
          <ListItem>
            <ListItemIcon>
              <DarkModeIcon />
            </ListItemIcon>
            <ListItemText
              primary="Dark Mode"
              secondary="Switch between light and dark theme"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  color="primary"
                />
              }
              label=""
            />
          </ListItem>
          <Divider />

          {/* Language */}
          <ListItem>
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText
              primary="Language"
              secondary="Choose your preferred language"
            />
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                size="small"
              >
                <MenuItem value="english">English</MenuItem>
                <MenuItem value="spanish">Spanish</MenuItem>
                <MenuItem value="french">French</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
          <Divider />

          {/* Security Alerts */}
          <ListItem>
            <ListItemIcon>
              <SecurityIcon />
            </ListItemIcon>
            <ListItemText
              primary="Security Alerts"
              secondary="Receive alerts about security updates and login attempts"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={securityAlerts}
                  onChange={(e) => setSecurityAlerts(e.target.checked)}
                  color="primary"
                />
              }
              label=""
            />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

export default Settings;
