import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline, useMediaQuery, useTheme } from "@mui/material";
import AppHeader from "./AppHeader"; 
import Sidebar from "./Sidebar"; 

const FacultyLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* App Header for mobile */}
      <AppHeader onDrawerToggle={handleDrawerToggle} />
      
      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        isMobile={isMobile}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Outlet /> 
      </Box>
    </Box>
  );
};

export default FacultyLayout;
