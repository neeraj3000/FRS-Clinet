import React from 'react';
import { Card, CardContent, Typography, Avatar, Grid } from '@mui/material';

const StudentInfoCard = ({ 
  fullName, 
  studentId, 
  profilePicture, 
  classGrade, 
  section, 
  enrollmentDate, 
  contactInfo 
}) => {
  return (
    <Card 
      variant="outlined" 
      style={{
        maxWidth: '650px', // Increased width
        margin: '10px ', 
        padding: '10px',  // Increased padding for better spacing
        borderRadius: '15px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <CardContent>
        <Grid container spacing={4} alignItems="center">
          {/* Profile Picture */}
          <Grid item>
            <Avatar 
              alt={fullName} 
              src={profilePicture} 
              style={{
                width: 100, 
                height: 100, 
                boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
              }} 
            />
          </Grid>

          {/* Main Student Info */}
          <Grid item xs>
            <Typography 
              variant="h4" 
              component="div" 
              style={{ fontWeight: 'bold'}}
            >
              {fullName}
            </Typography>

            <Grid container spacing={3} style={{ marginTop: '16px' }}>
              {/* Left Column */}
              <Grid item xs={6}>
                <Typography 
                  variant="body1" 
                  color="primary" 
                  style={{ fontWeight: '600', marginBottom: '8px' }}
                >
                  Student ID:
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {studentId}
                </Typography>

                <Typography 
                  variant="body1" 
                  color="primary" 
                  style={{ fontWeight: '600', marginTop: '16px', marginBottom: '8px' }}
                >
                  Class/Grade:
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {classGrade}
                </Typography>

                <Typography 
                  variant="body1" 
                  color="primary" 
                  style={{ fontWeight: '600', marginTop: '16px', marginBottom: '8px' }}
                >
                  Section/Group:
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {section}
                </Typography>
              </Grid>

              {/* Right Column */}
              <Grid item xs={6}>
                <Typography 
                  variant="body1" 
                  color="primary" 
                  style={{ fontWeight: '600', marginBottom: '8px' }}
                >
                  Enrollment Date:
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {new Date(enrollmentDate).toLocaleDateString()}
                </Typography>

                <Typography 
                  variant="body1" 
                  color="primary" 
                  style={{ fontWeight: '600', marginTop: '16px', marginBottom: '8px' }}
                >
                  Email:
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {contactInfo.email}
                </Typography>

                <Typography 
                  variant="body1" 
                  color="primary" 
                  style={{ fontWeight: '600', marginTop: '16px', marginBottom: '8px' }}
                >
                  Phone:
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {contactInfo.phone}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StudentInfoCard;
