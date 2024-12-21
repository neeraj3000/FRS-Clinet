// import React from "react";
// import { Outlet } from "react-router-dom";
// // import FacultyNavbar from "./FacultyNavbar";

// const FacultyLayout = () => {
//   return (
//     <div>
//       {/* <FacultyNavbar /> */}
//       <div style={{ padding: "20px" }}>
//         <Outlet /> {/* Render nested faculty routes here */}
//       </div>
//     </div>
//   );
// };

// export default FacultyLayout;
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline, useMediaQuery, useTheme } from "@mui/material";
import AppHeader from "./AppHeader"; // Navbar for mobile
import Sidebar from "./Sidebar"; // Sidebar component

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
      
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Outlet /> {/* Render the child routes like Dashboard, Today's Classes */}
      </Box>
    </Box>
  );
};

export default FacultyLayout;
