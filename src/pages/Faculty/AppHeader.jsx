import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

const AppHeader = ({ onDrawerToggle }) => (
  <AppBar
    position="fixed"
    sx={{
      width: { sm: `calc(100% - 240px)` },
      ml: { sm: `240px` },
      bgcolor: 'background.paper',
      color: 'text.primary',
    }}
  >
    <Toolbar>
      <IconButton
        color="inherit"
        edge="start"
        onClick={onDrawerToggle}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap>
        FACULTY-NAME
      </Typography>
    </Toolbar>
  </AppBar>
);

export default AppHeader;
