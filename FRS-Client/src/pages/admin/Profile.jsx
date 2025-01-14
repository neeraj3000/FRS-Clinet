import React, { useState, useCallback, memo } from 'react';
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
  const initialFacultyInfo = {
    name: "Dr. John Doe",
    facultyId: "FAC2024001",
    department: "Computer Science",
    email: "john.doe@university.edu",
    phone: "+1 (555) 123-4567",
    location: "Room 401, Engineering Building",
    position: "Associate Professor",
    expertise: "Artificial Intelligence, Machine Learning",
    education: "Ph.D. in Computer Science",
    university: "Stanford University",
    courses: ["Introduction to AI", "Machine Learning Basics", "Advanced Data Science"],
    profileImage: null,
  };

  const [facultyInfo, setFacultyInfo] = useState(initialFacultyInfo);
  const [isEditing, setIsEditing] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = useCallback((field, value) => {
    setFacultyInfo((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFacultyInfo((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Updated Faculty Info:", facultyInfo);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match. Please try again.");
      return;
    }
    console.log("Password changed successfully:", { currentPassword, newPassword });
    setPasswordDialogOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const InfoItem = memo(({ icon, label, value, field }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      {icon}
      <Box sx={{ ml: 2, flex: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
          {label}
        </Typography>
        {isEditing ? (
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={value}
            onChange={(e) => handleChange(field, e.target.value)}
          />
        ) : (
          <Typography variant="body1">{value}</Typography>
        )}
      </Box>
    </Box>
  ));

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f9f9f9',
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
          backgroundColor: '#ffffff',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5" sx={{ color: '#1976d2' }}>
            Faculty Profile
          </Typography>
          <Box>
            <Button
              startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
              variant="outlined"
              sx={{ color: '#1976d2', borderColor: '#1976d2', mr: 2 }}
              onClick={isEditing ? handleSave : handleEditToggle}
            >
              {isEditing ? "Save Profile" : "Edit Profile"}
            </Button>
            <Button
              variant="outlined"
              sx={{ color: '#1976d2', borderColor: '#1976d2' }}
              onClick={() => setPasswordDialogOpen(true)}
            >
              Change Password
            </Button>
          </Box>
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
          <Box sx={{ position: 'relative', display: 'inline-block', textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                backgroundColor: '#1976d2',
                color: '#ffffff',
                fontSize: 28,
              }}
              src={facultyInfo.profileImage || undefined}
            >
              {!facultyInfo.profileImage && facultyInfo.name.split(' ').map((n) => n[0]).join('')}
            </Avatar>
            {isEditing && (
              <IconButton
                component="label"
                sx={{
                  position: 'absolute',
                  bottom: -5,
                  right: -5,
                  backgroundColor: '#ffffff',
                  boxShadow: 1,
                  borderRadius: '50%',
                }}
              >
                <CameraAltIcon sx={{ color: '#1976d2' }} />
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </IconButton>
            )}
          </Box>
          <Box sx={{ textAlign: 'center', mt: 2, px: { lg: 2 } }}>
            {isEditing ? (
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                value={facultyInfo.name}
                onChange={(e) => handleChange('name', e.target.value)}
                sx={{ mb: 1 }}
              />
            ) : (
              <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                {facultyInfo.name}
              </Typography>
            )}
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
            <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>
              Contact Information
            </Typography>
            <InfoItem
              icon={<EmailIcon color="action" />}
              label="Email"
              value={facultyInfo.email}
              field="email"
            />
            <InfoItem
              icon={<PhoneIcon color="action" />}
              label="Phone"
              value={facultyInfo.phone}
              field="phone"
            />
            <InfoItem
              icon={<LocationOnIcon color="action" />}
              label="Office"
              value={facultyInfo.location}
              field="location"
            />
          </Grid>

          <          Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>
              Academic Information
            </Typography>
            <InfoItem
              icon={<BusinessIcon color="action" />}
              label="Department"
              value={facultyInfo.department}
              field="department"
            />
            <InfoItem
              icon={<SchoolIcon color="action" />}
              label="Education"
              value={facultyInfo.education}
              field="education"
            />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ClassIcon color="action" />
              <Box sx={{ ml: 2, flex: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                  Courses
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={facultyInfo.courses.join(', ')}
                    onChange={(e) =>
                      handleChange('courses', e.target.value.split(',').map((course) => course.trim()))
                    }
                  />
                ) : (
                  <Typography variant="body1">{facultyInfo.courses.join(', ')}</Typography>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Dialog open={passwordDialogOpen} onClose={() => setPasswordDialogOpen(false)}>
          <DialogTitle>Change Password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your current password and set a new one.
            </DialogContentText>
            <TextField
              margin="dense"
              label="Current Password"
              type="password"
              fullWidth
              variant="outlined"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <TextField
              margin="dense"
              label="New Password"
              type="password"
              fullWidth
              variant="outlined"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Confirm New Password"
              type="password"
              fullWidth
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPasswordDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handlePasswordChange} color="primary">
              Change Password
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default Profile;

