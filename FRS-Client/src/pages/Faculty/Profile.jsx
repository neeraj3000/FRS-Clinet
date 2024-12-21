// import React, { useState } from 'react';
// import {
//   Box,
//   CssBaseline,
//   useMediaQuery,
//   useTheme,
//   Paper,
//   Typography,
//   Avatar,
//   Grid,
//   Button,
//   Divider
// } from '@mui/material';
// import {
//   Edit as EditIcon,
//   School as SchoolIcon,
//   Email as EmailIcon,
//   Phone as PhoneIcon,
//   LocationOn as LocationIcon,
//   Work as WorkIcon
// } from '@mui/icons-material';
// import AppHeader from './AppHeader';
// import Sidebar from './Sidebar';

// const Profile = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const facultyInfo = {
//     name: "Dr. John Doe",
//     facultyId: "FAC2024001",
//     department: "Computer Science",
//     email: "john.doe@university.edu",
//     phone: "+1 (555) 123-4567",
//     location: "Room 401, Engineering Building",
//     position: "Associate Professor",
//     joinDate: "January 2020",
//     expertise: "Artificial Intelligence, Machine Learning",
//     education: "Ph.D. in Computer Science",
//     university: "Stanford University"
//   };

//   const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

//   const InfoItem = ({ icon, label, value }) => (
//     <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//       {icon}
//       <Box sx={{ ml: 2 }}>
//         <Typography variant="body2" color="text.secondary">
//           {label}
//         </Typography>
//         <Typography variant="body1">
//           {value}
//         </Typography>
//       </Box>
//     </Box>
//   );

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppHeader onDrawerToggle={handleDrawerToggle} />
//       <Sidebar
//         mobileOpen={mobileOpen}
//         handleDrawerToggle={handleDrawerToggle}
//         isMobile={isMobile}
//       />
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '100vh'
//         }}
//       >
//         <Paper sx={{ p: 3, maxWidth: 800, width: '100%' }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
//             <Typography variant="h5">Faculty Profile</Typography>
//             <Button startIcon={<EditIcon />} variant="outlined">
//               Edit Profile
//             </Button>
//           </Box>

//           <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
//             <Avatar
//               sx={{ width: 100, height: 100, mr: 3 }}
//             >
//               {facultyInfo.name.split(' ').map(n => n[0]).join('')}
//             </Avatar>
//             <Box>
//               <Typography variant="h4">{facultyInfo.name}</Typography>
//               <Typography variant="subtitle1" color="text.secondary">
//                 {facultyInfo.position}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Faculty ID: {facultyInfo.facultyId}
//               </Typography>
//             </Box>
//           </Box>

//           <Divider sx={{ my: 3 }} />

//           <Grid container spacing={4}>
//             <Grid item xs={12} md={6}>
//               <Typography variant="h6" gutterBottom>Contact Information</Typography>
//               <InfoItem 
//                 icon={<EmailIcon color="action" />}
//                 label="Email"
//                 value={facultyInfo.email}
//               />
//               <InfoItem 
//                 icon={<PhoneIcon color="action" />}
//                 label="Phone"
//                 value={facultyInfo.phone}
//               />
//               <InfoItem 
//                 icon={<LocationIcon color="action" />}
//                 label="Office"
//                 value={facultyInfo.location}
//               />
//             </Grid>
            
//             <Grid item xs={12} md={6}>
//               <Typography variant="h6" gutterBottom>Academic Information</Typography>
//               <InfoItem 
//                 icon={<WorkIcon color="action" />}
//                 label="Department"
//                 value={facultyInfo.department}
//               />
//               <InfoItem 
//                 icon={<SchoolIcon color="action" />}
//                 label="Education"
//                 value={`${facultyInfo.education}, ${facultyInfo.university}`}
//               />
//               <InfoItem 
//                 icon={<WorkIcon color="action" />}
//                 label="Expertise"
//                 value={facultyInfo.expertise}
//               />
//             </Grid>
//           </Grid>
//         </Paper>
//       </Box>
//     </Box>
//   );
// };

// export default Profile;
import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Grid,
  Button,
  Divider,
} from '@mui/material';
import {
  Edit as EditIcon,
  School as SchoolIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
} from '@mui/icons-material';

const Profile = () => {
  const facultyInfo = {
    name: "Dr. John Doe",
    facultyId: "FAC2024001",
    department: "Computer Science",
    email: "john.doe@university.edu",
    phone: "+1 (555) 123-4567",
    location: "Room 401, Engineering Building",
    position: "Associate Professor",
    joinDate: "January 2020",
    expertise: "Artificial Intelligence, Machine Learning",
    education: "Ph.D. in Computer Science",
    university: "Stanford University",
  };

  const InfoItem = ({ icon, label, value }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      {icon}
      <Box sx={{ ml: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body1">{value}</Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f9f9f9', // Subtle background color
        p: 2,
      }}
    >
      <Paper
        sx={{
          p: 3,
          maxWidth: 800,
          width: '100%',
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5">Faculty Profile</Typography>
          <Button startIcon={<EditIcon />} variant="outlined">
            Edit Profile
          </Button>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 4,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Avatar
            sx={{
              width: 100,
              height: 100,
              mr: { xs: 0, md: 3 },
              mb: { xs: 2, md: 0 },
            }}
          >
            {facultyInfo.name.split(' ').map((n) => n[0]).join('')}
          </Avatar>
          <Box textAlign="center">
            <Typography variant="h4">{facultyInfo.name}</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {facultyInfo.position}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Faculty ID: {facultyInfo.facultyId}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <InfoItem
              icon={<EmailIcon color="action" />}
              label="Email"
              value={facultyInfo.email}
            />
            <InfoItem
              icon={<PhoneIcon color="action" />}
              label="Phone"
              value={facultyInfo.phone}
            />
            <InfoItem
              icon={<LocationIcon color="action" />}
              label="Office"
              value={facultyInfo.location}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Academic Information
            </Typography>
            <InfoItem
              icon={<WorkIcon color="action" />}
              label="Department"
              value={facultyInfo.department}
            />
            <InfoItem
              icon={<SchoolIcon color="action" />}
              label="Education"
              value={`${facultyInfo.education}, ${facultyInfo.university}`}
            />
            <InfoItem
              icon={<WorkIcon color="action" />}
              label="Expertise"
              value={facultyInfo.expertise}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Profile;
