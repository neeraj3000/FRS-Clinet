// import React, { useState } from 'react';
// import { Box, CssBaseline, Grid, useMediaQuery, useTheme } from '@mui/material';
// import AppHeader from './AppHeader';
// import Sidebar from './Sidebar';
// import StatsCard from './StatsCard';
// import Notifications from './Notifications';

// const Dashboard = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const stats = [
//     { title: 'Total Students', value: '156' },
//     { title: 'Classes Today', value: '6' },
//     { title: 'Attendance Rate', value: '92%' },
//     { title: 'Active Classes', value: '4' }
//   ];

//   const notifications = [
//     {
//       title: 'Tomorrow Holiday',
//       message: 'Due to annual function, tomorrow will be a holiday.',
//       time: '2 hours ago',
//     },
//     {
//       title: 'Attendance Update',
//       message: "Your attendance has been marked for today's classes.",
//       time: '4 hours ago',
//     },
//     {
//       title: 'New Schedule',
//       message: 'Next week schedule has been updated.',
//       time: '1 day ago',
//     }
//   ];

//   const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppHeader onDrawerToggle={handleDrawerToggle} />
//       <Sidebar
//         mobileOpen={mobileOpen}
//         handleDrawerToggle={handleDrawerToggle}
//         isMobile={isMobile}
//       />
//       <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
//         <Grid container spacing={3}>
//           {stats.map((stat, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <StatsCard title={stat.title} value={stat.value} />
//             </Grid>
//           ))}
//           <Grid item xs={12}>
//             <Notifications notifications={notifications} />
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;

import React from "react";
import { Box, Grid } from "@mui/material";
import StatsCard from "./StatsCard";
import Notifications from "./Notifications";

const Dashboard = () => {
  const stats = [
    { title: "Total Students", value: "156" },
    { title: "Classes Today", value: "6" },
    { title: "Attendance Rate", value: "92%" },
    { title: "Active Classes", value: "4" },
  ];

  const notifications = [
    {
      title: "Tomorrow Holiday",
      message: "Due to annual function, tomorrow will be a holiday.",
      time: "2 hours ago",
    },
    {
      title: "Attendance Update",
      message: "Your attendance has been marked for today's classes.",
      time: "4 hours ago",
    },
    {
      title: "New Schedule",
      message: "Next week schedule has been updated.",
      time: "1 day ago",
    },
  ];

  return (
    <Box>
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatsCard title={stat.title} value={stat.value} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Notifications notifications={notifications} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
