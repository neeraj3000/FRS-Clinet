import React, { useState, useEffect, useCallback, memo } from 'react';
import axios from 'axios';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Grid,
  Button,
  Divider,
  TextField,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Business as BusinessIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationOnIcon,
  Work as WorkIcon,
  CameraAlt as CameraAltIcon,
  School as SchoolIcon,
  Class as ClassIcon,
} from '@mui/icons-material';

const Profile = () => {
  const [adminInfo, setAdminInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const authtoken = localStorage.getItem('token');
        const response = await axios.get("http://127.0.0.1:8000/profile", {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${authtoken}`,
          },
        });
        
        const data = response.data;
        setAdminInfo({
          name: `${data.first_name} ${data.middle_name} ${data.last_name}`,
          email: data.email_address,
          phone: data.phone_number,
          department: data.department,
          position: data.designation,
          education: data.qualification,
          isAdmin: data.is_admin,
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = useCallback((field, value) => {
    setAdminInfo((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  if (!adminInfo) {
    return <Typography>Loading profile...</Typography>;
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '85vh', backgroundColor: '#f9f9f9', p: 2 }}>
      <Paper sx={{ p: 3, maxWidth: 800, width: '100%', boxShadow: 3, borderRadius: 2, backgroundColor: '#ffffff' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5" sx={{ color: '#1a237e' }}>Faculty Profile</Typography>
          <Button startIcon={isEditing ? <SaveIcon /> : <EditIcon />} variant="outlined" onClick={handleEditToggle}>
            {isEditing ? "Save Profile" : "Edit Profile"}
          </Button>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 2, px: { lg: 2 } }}>
          <Typography variant="h4" sx={{ color: '#1a237e', fontWeight: 'bold' }}>{adminInfo.name}</Typography>
          <Typography variant="subtitle1" color="text.secondary">{adminInfo.position}</Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1a237e' }}>Contact Information</Typography>
            <Typography variant="body1"><EmailIcon /> {adminInfo.email}</Typography>
            <Typography variant="body1"><PhoneIcon /> {adminInfo.phone}</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1a237e' }}>Academic Information</Typography>
            <Typography variant="body1"><BusinessIcon /> {adminInfo.department}</Typography>
            <Typography variant="body1"><SchoolIcon /> {adminInfo.education}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Profile;