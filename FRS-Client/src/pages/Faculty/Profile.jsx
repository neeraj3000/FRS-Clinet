import React, { useState, useCallback, memo } from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Grid,
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tabs,
  Tab,
  Chip,
  Snackbar,
  Alert,
  Link,
  Card,
  CardContent,
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
  EmojiEvents as AwardIcon,
  EventNote as CalendarIcon,
  Article as ArticleIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Language as WebsiteIcon,
} from '@mui/icons-material';

const initialFacultyInfo = {
  name: "Dr. John Doe",
  facultyId: "FAC2024001",
  department: "Computer Science",
  email: "john.doe@university.edu",
  phone: "+1 (555) 123-4567",
  location: "Room 401, Engineering Building",
  position: "Associate Professor",
  expertise: ["Artificial Intelligence", "Machine Learning", "Deep Learning", "Computer Vision"],
  education: "Ph.D. in Computer Science",
  university: "Stanford University",
  bio: "Dr. John Doe is an Associate Professor specializing in AI and Machine Learning. With over 10 years of experience in academia and industry research, he focuses on developing innovative solutions in computer vision and deep learning.",
  courses: ["Introduction to AI", "Machine Learning Basics", "Advanced Data Science"],
  publications: [
    "Deep Learning Approaches in Computer Vision (2023)",
    "Advanced Neural Network Architectures (2022)",
    "Machine Learning in Practice (2021)"
  ],
  officeHours: "Monday & Wednesday: 2:00 PM - 4:00 PM",
  socialLinks: {
    github: "github.com/johndoe",
    linkedin: "linkedin.com/in/johndoe",
    twitter: "twitter.com/johndoe",
    website: "johndoe.edu"
  },
  awards: [
    "Outstanding Faculty Award 2023",
    "Best Research Paper Award 2022",
    "Excellence in Teaching 2021"
  ],
  profileImage: null,
};

const InfoItem = memo(({ icon, label, value, field, multiline = false, isEditing, onChange }) => (
  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
    <Box sx={{ mr: 2, mt: 0.5 }}>{icon}</Box>
    <Box sx={{ flex: 1 }}>
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold', mb: 0.5 }}>
        {label}
      </Typography>
      {isEditing ? (
        <TextField
          fullWidth
          size="small"
          multiline={multiline}
          rows={multiline ? 4 : 1}
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
        />
      ) : (
        <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
          {value}
        </Typography>
      )}
    </Box>
  </Box>
));

function App() {
  const [facultyInfo, setFacultyInfo] = useState(initialFacultyInfo);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = useCallback((field, value) => {
    setFacultyInfo(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFacultyInfo(prev => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    setSuccessMessage("Profile updated successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      setSuccessMessage("New passwords do not match!");
      return;
    }
    setPasswordDialogOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSuccessMessage("Password changed successfully!");
  };

  const ProfileHeader = () => (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      pb: 3
    }}>
      <Box sx={{ position: 'relative', mb: 2 }}>
        <Avatar
          sx={{
            width: 120,
            height: 120,
            fontSize: 40,
            bgcolor: 'primary.main'
          }}
          src={facultyInfo.profileImage || undefined}
        >
          {!facultyInfo.profileImage && facultyInfo.name.split(' ').map(n => n[0]).join('')}
        </Avatar>
        {isEditing && (
          <IconButton
            component="label"
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              bgcolor: 'background.paper',
              boxShadow: 1,
              '&:hover': { bgcolor: 'background.paper' }
            }}
          >
            <CameraAltIcon />
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </IconButton>
        )}
      </Box>

      <Box sx={{ textAlign: 'center', width: '100%', maxWidth: 400 }}>
        {isEditing ? (
          <TextField
            fullWidth
            value={facultyInfo.name}
            onChange={(e) => handleChange('name', e.target.value)}
            size="small"
            sx={{ mb: 1 }}
          />
        ) : (
          <Typography variant="h5" sx={{ fontWeight: 500, mb: 0.5 }}>
            {facultyInfo.name}
          </Typography>
        )}
        <Typography variant="subtitle1" color="primary" sx={{ mb: 0.5 }}>
          {facultyInfo.position}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Faculty ID: {facultyInfo.facultyId}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          {Object.entries(facultyInfo.socialLinks).map(([platform, link]) => {
            const Icon = {
              github: GitHubIcon,
              linkedin: LinkedInIcon,
              twitter: TwitterIcon,
              website: WebsiteIcon
            }[platform];
            return (
              <IconButton
                key={platform}
                component={Link}
                href={`https://${link}`}
                target="_blank"
                size="small"
                color="primary"
              >
                <Icon fontSize="small" />
              </IconButton>
            );
          })}
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{
      height: '87vh',
      overflow: 'hidden',
      bgcolor: '#f5f5f5',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{
        p: { xs: 1, sm: 2 },
        flex: 1,
        overflow: 'auto'
      }}>
        <Paper sx={{
          maxWidth: 1200,
          mx: 'auto',
          height: '83vh',
          borderRadius: 2,

          overflow: 'hidden'
        }}>
          <Box sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 1,
              mb: 3
            }}>
              <Button
                startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                variant="contained"
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
              >
                {isEditing ? "Save" : "Edit"}
              </Button>
              <Button
                variant="outlined"
                onClick={() => setPasswordDialogOpen(true)}
              >
                Change Password
              </Button>
            </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h5" sx={{ color: '#1a237e' }}>
                Faculty Profile
              </Typography>
              <Box>
                <Button
                  startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                  variant="outlined"
                  sx={{ color: '#1a237e', borderColor: '#1a237e', mr: 2 }}
                  // onClick={isEditing ? handleSave : handleEditToggle}
                >
                  {isEditing ? "Save Profile" : "Edit Profile"}
                </Button>
                <Button
                  variant="outlined"
                  sx={{ color: '#1a237e', borderColor: '#1a237e' }}
                  onClick={() => setPasswordDialogOpen(true)}
                >
                  Change Password
                </Button>
              </Box>
            </Box>
        </Paper>
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
                    backgroundColor: '#1a237e',
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
                    <CameraAltIcon sx={{ color: '#1a237e' }} />
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
                  <Typography variant="h4" sx={{ color: '#1a237e', fontWeight: 'bold' }}>
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


            <ProfileHeader />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={currentTab}
                onChange={(e, newValue) => setCurrentTab(newValue)}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label="Overview" />
                <Tab label="Academic" />
                <Tab label="Publications" />
                <Tab label="Awards" />
              </Tabs>
            </Box>

            <Box sx={{ pt: 3 }}>
              {currentTab === 0 && (
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <InfoItem
                      icon={<EmailIcon color="action" />}
                      label="Email"
                      value={facultyInfo.email}
                      field="email"
                      isEditing={isEditing}
                      onChange={handleChange}
                    />
                    <InfoItem
                      icon={<PhoneIcon color="action" />}
                      label="Phone"
                      value={facultyInfo.phone}
                      field="phone"
                      isEditing={isEditing}
                      onChange={handleChange}
                    />
                    <InfoItem
                      icon={<LocationOnIcon color="action" />}
                      label="Office"
                      value={facultyInfo.location}
                      field="location"
                      isEditing={isEditing}
                      onChange={handleChange}
                    />
                    <InfoItem
                      icon={<CalendarIcon color="action" />}
                      label="Office Hours"
                      value={facultyInfo.officeHours}
                      field="officeHours"
                      isEditing={isEditing}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InfoItem
                      icon={<BusinessIcon color="action" />}
                      label="Department"
                      value={facultyInfo.department}
                      field="department"
                      isEditing={isEditing}
                      onChange={handleChange}
                    />
                    <InfoItem
                      icon={<SchoolIcon color="action" />}
                      label="Education"
                      value={facultyInfo.education}
                      field="education"
                      isEditing={isEditing}
                      onChange={handleChange}
                    />
                    <InfoItem
                      icon={<WorkIcon color="action" />}
                      label="Bio"
                      value={facultyInfo.bio}
                      field="bio"
                      multiline
                      isEditing={isEditing}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              )}

              {currentTab === 1 && (
                <Box>
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom>
                      Areas of Expertise
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {facultyInfo.expertise.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    Current Courses
                  </Typography>
                  <Grid container spacing={2}>
                    {facultyInfo.courses.map((course, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card variant="outlined">
                          <CardContent>
                            <Typography>{course}</Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {currentTab === 2 && (
                <Box>
                  {facultyInfo.publications.map((publication, index) => (
                    <Paper
                      key={index}
                      sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'flex-start' }}
                      variant="outlined"
                    >
                      <ArticleIcon sx={{ mr: 2, mt: 0.5 }} color="action" />
                      <Typography sx={{ wordBreak: 'break-word' }}>
                        {publication}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              )}

              {currentTab === 3 && (
                <Box>
                  {facultyInfo.awards.map((award, index) => (
                    <Paper
                      key={index}
                      sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'flex-start' }}
                      variant="outlined"
                    >
                      <AwardIcon sx={{ mr: 2, mt: 0.5 }} color="action" />
                      <Typography sx={{ wordBreak: 'break-word' }}>
                        {award}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              )}

              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#1a237e' }}>
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
                  <Typography variant="h6" gutterBottom sx={{ color: '#1a237e' }}>
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
      </Box>
      

            <Dialog
              open={passwordDialogOpen}
              onClose={() => setPasswordDialogOpen(false)}
              maxWidth="xs"
              fullWidth
            >
              <DialogTitle>Change Password</DialogTitle>
              <DialogContent>
                <DialogContentText sx={{ mb: 2 }}>
                  Please enter your current password and set a new one.
                </DialogContentText>
                <TextField
                  margin="dense"
                  label="Current Password"
                  type="password"
                  fullWidth
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="New Password"
                  type="password"
                  fullWidth
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Confirm New Password"
                  type="password"
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </DialogContent>
              <DialogActions sx={{ p: 2 }}>
                <Button onClick={() => setPasswordDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handlePasswordChange} variant="contained">
                  Change Password
                </Button>
              </DialogActions>
            </Dialog>

            <Snackbar
              open={!!successMessage}
              autoHideDuration={3000}
              onClose={() => setSuccessMessage("")}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Alert
                severity="success"
                sx={{ width: '100%' }}
                onClose={() => setSuccessMessage("")}
              >
                {successMessage}
              </Alert>
            </Snackbar>
          </Box>
          );
}

          export default App;