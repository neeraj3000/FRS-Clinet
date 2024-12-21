import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Divider,
  Avatar,
  Typography
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Class as ClassIcon,
  Person as ProfileIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

const Sidebar = ({ mobileOpen, handleDrawerToggle, isMobile }) => {
  const drawerWidth = 240;
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Mock faculty data - replace with actual data from your auth system
  const facultyInfo = {
    name: "Dr. John Doe",
    facultyId: "FAC2024001",
    department: "Computer Science",
    email: "john.doe@university.edu",
    avatar: "JD"
  };

  const handleProfileClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const handleLogout = () => {
    handleProfileClose();
    // Add your logout logic here
    console.log("Logging out...");
  };

  const menuItems = [
    { 
      text: 'Dashboard', 
      icon: <DashboardIcon />, 
      path: '/faculty/dashboard',
      onClick: () => navigate('/faculty/dashboard')
    },
    { 
      text: "Today's Classes", 
      icon: <ClassIcon />, 
      path: '/faculty/classes',
      onClick: () => navigate('/faculty/classes')
    },
    { 
      text: 'Profile', 
      icon: <ProfileIcon />, 
      path: '/faculty/profile',
      onClick: () => navigate('/faculty/profile')
    },
    { 
      text: 'Settings', 
      icon: <SettingsIcon />, 
      path: '/faculty/settings',
      onClick: () => navigate('/faculty/settings')
    }
  ];

  const drawer = (
    <Box sx={{ bgcolor: 'background.paper', height: '100%' }}>
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar 
          sx={{ 
            width: 64, 
            height: 64, 
            bgcolor: 'primary.main',
            mb: 1 
          }}
        >
          {facultyInfo.avatar}
        </Avatar>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          {facultyInfo.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {facultyInfo.department}
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={item.onClick}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
