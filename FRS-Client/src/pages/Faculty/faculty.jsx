// import React, { useState } from 'react';
// import {
//   AppBar,
//   Box,
//   Button,
//   Card,
//   CardContent,
//   CssBaseline,
//   Drawer,
//   Grid,
//   IconButton,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Paper,
//   TablePagination,
//   Toolbar,
//   Typography,
//   useTheme,
//   useMediaQuery
// } from '@mui/material';
// import {
//   Menu as MenuIcon,
//   Dashboard as DashboardIcon,
//   Class as ClassIcon,
//   Notifications as NotificationsIcon,
//   Settings as SettingsIcon,
//   AccessTime as TimeIcon,
//   Group as GroupIcon
// } from '@mui/icons-material';

// const drawerWidth = 240;

// const Dashboard = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [page, setPage] = useState(0);
//   const rowsPerPage = 5;
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   // Sample data
//   const stats = [
//     { title: "Total Students", value: "156" },
//     { title: "Classes Today", value: "6" },
//     { title: "Attendance Rate", value: "92%" }
//   ];

//   const notifications = [
//     {
//       title: "Tomorrow Holiday",
//       message: "Due to annual function, tomorrow will be a holiday.",
//       time: "2 hours ago"
//     },
//     {
//       title: "Attendance Update",
//       message: "Your attendance has been marked for today's classes.",
//       time: "4 hours ago"
//     }
//   ];

//   const classes = [
//     {
//       time: "09:00 AM",
//       subject: "Mathematics",
//       students: 32,
//       marked: false
//     },
//     {
//       time: "10:30 AM",
//       subject: "Physics",
//       students: 32,
//       marked: false
//     },
//     {
//       time: "11:45 AM",
//       subject: "Chemistry",
//       students: 28,
//       marked: false
//     },
//     {
//       time: "02:00 PM",
//       subject: "Computer Science",
//       students: 35,
//       marked: false
//     },
//     {
//       time: "03:15 PM",
//       subject: "English",
//       students: 30,
//       marked: false
//     },
//     {
//       time: "04:30 PM",
//       subject: "History",
//       students: 25,
//       marked: false
//     },
//     {
//       time: "05:45 PM",
//       subject: "Biology",
//       students: 27,
//       marked: false
//     }
//   ];

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const drawer = (
//     <Box sx={{ bgcolor: 'background.paper', height: '100%' }}>
//       <List>
//         {['Dashboard', 'Classes', 'Notifications', 'Settings'].map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>
//               {index === 0 ? <DashboardIcon /> : 
//                index === 1 ? <ClassIcon /> :
//                index === 2 ? <NotificationsIcon /> :
//                <SettingsIcon />}
//             </ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         sx={{
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//           ml: { sm: `${drawerWidth}px` },
//           bgcolor: 'background.paper',
//           color: 'text.primary'
//         }}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             Dashboard
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       <Box
//         component="nav"
//         sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//       >
//         <Drawer
//           variant={isMobile ? 'temporary' : 'permanent'}
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{ keepMounted: true }}
//           sx={{
//             '& .MuiDrawer-paper': {
//               boxSizing: 'border-box',
//               width: drawerWidth,
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>
//       </Box>

//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//           mt: 8
//         }}
//       >
//         <Grid container spacing={3}>
//           {/* First Row: Stats as a single column */}
//           <Grid item xs={12} md={8}>
//             <Grid container spacing={2} direction="column">
//               {stats.map((stat, index) => (
//                 <Grid item xs={12} key={index}>
//                   <Card sx={{ height: '100%', bgcolor: 'background.paper' }}>
//                     <CardContent>
//                       <Typography color="textSecondary" gutterBottom>
//                         {stat.title}
//                       </Typography>
//                       <Typography variant="h4">
//                         {stat.value}
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <Paper sx={{ p: 2, height: '100%' }}>
//               <Typography variant="h6" gutterBottom>
//                 Notifications & Reminders
//               </Typography>
              
//               {notifications.map((notification, index) => (
//                 <Paper
//                   key={index}
//                   sx={{ p: 2, mb: 2 }}
//                   elevation={1}
//                 >
//                   <Typography variant="subtitle1" gutterBottom>
//                     {notification.title}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary" gutterBottom>
//                     {notification.message}
//                   </Typography>
//                   <Typography variant="caption" color="textSecondary">
//                     {notification.time}
//                   </Typography>
//                 </Paper>
//               ))}
//             </Paper>
//           </Grid>

//           {/* Second Row: Classes List */}
//           <Grid item xs={12}>
//             <Paper sx={{ p: 2, mb: 2 }}>
//               <Typography variant="h6" gutterBottom>
//                 Today's Classes
//               </Typography>
              
//               {classes
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((classItem, index) => (
//                 <Paper
//                   key={index}
//                   sx={{
//                     p: 2,
//                     mb: 2,
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center'
//                   }}
//                   elevation={1}
//                 >
//                   <Box>
//                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                       <TimeIcon sx={{ mr: 1, fontSize: 'small' }} />
//                       <Typography variant="body2" color="textSecondary">
//                         {classItem.time}
//                       </Typography>
//                     </Box>
//                     <Typography variant="h6">
//                       {classItem.subject}
//                     </Typography>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <GroupIcon sx={{ mr: 1, fontSize: 'small' }} />
//                       <Typography variant="body2" color="textSecondary">
//                         {classItem.students} Students
//                       </Typography>
//                     </Box>
//                   </Box>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     sx={{ textTransform: 'none' }}
//                   >
//                     MARK ATTENDANCE
//                   </Button>
//                 </Paper>
//               ))}

//               <TablePagination
//                 component="div"
//                 count={classes.length}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 rowsPerPage={rowsPerPage}
//                 rowsPerPageOptions={[]}
//               />
//             </Paper>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;
