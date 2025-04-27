import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Divider
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