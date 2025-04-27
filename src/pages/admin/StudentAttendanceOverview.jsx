import React, { useEffect, useState } from "react";
import AttendanceBarChart from "../../components/StudentDashboard/AttendanceBarChart";
import ProgressIndicator from "../../components/StudentDashboard/ProgressIndicator";
import SubjectCard from "../../components/StudentDashboard/SubjectCard";
import { Box, Grid, Typography, Paper, Card, Avatar, IconButton } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SchoolIcon from '@mui/icons-material/School';
import BadgeIcon from '@mui/icons-material/Badge';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import AttendaceHeatmap from "../../components/AttedanceHeatmap";
import { headers } from "../../GetAuthToken";

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const year = urlParams.get("year");
  const { studentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/admin/get-student-attendance?student_id=${studentId}&year=${year}`,
          {
            headers
          }
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }
        
        const data = await response.json();
        console.log(data)
        setStudentData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId, year]);

  const handleBackClick = () => {
    navigate(-1);
  };

  // Transform subjects data for bar chart
  const transformSubjectsForChart = (subjectsReport) => {
    return Object.entries(subjectsReport).map(([name, data]) => ({
      name,
      total: data.num_classes,
      attended: data.num_present,
      absent: data.num_classes - data.num_present
    }));
  };

  // Transform attendance data for heatmap
  const transformAttendanceForHeatmap = (attendance) => {
    const heatmapData = {};
    
    Object.entries(attendance).forEach(([subject, data]) => {
      // Handle regular attendance
      data.attendance.forEach(entry => {
        const dateStr = entry.date;
        if (!heatmapData[dateStr]) {
          heatmapData[dateStr] = {};
        }
        heatmapData[dateStr][subject] = {
          status: entry.status,
          periods: entry.number_of_periods
        };
      });
  
      // Handle consolidated attendance if it exists
      if (data.consolidated_attendance) {
        data.consolidated_attendance.forEach(consolidatedEntry => {
          consolidatedEntry.dates.forEach(date => {
            if (!heatmapData[date]) {
              heatmapData[date] = {};
            }
            heatmapData[date][subject] = {
              type: 'consolidated',
              periods: consolidatedEntry.number_of_periods,
              reason: consolidatedEntry.reason
            };
          });
        });
      }
    });
    
    return heatmapData;
  };

  const ProfileDetail = ({ icon: Icon, label, value }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
      <Icon sx={{ color: '#6b7280' }} />
      <Box>
        <Typography variant="caption" sx={{fontSize:"1.3rem", color: '#1a237e', display: 'block' }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ color: '#4b5563', fontSize: '1rem' }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  const student = {
    name: `${studentData.student_details.first_name} ${studentData.student_details.last_name}`,
    studentId: studentData.student_details.id_number,
    rollNumber: studentData.student_details.id_number,
    class: `${studentData.student_details.branch}-${studentData.student_details.section}`,
    year: studentData.student_details.year,
    email: studentData.student_details.email_address,
    phone: studentData.student_details.phone_number,
    avatar: "/api/placeholder/120/120"
  };

  const subjects = transformSubjectsForChart(studentData.subjects_report);
  const attendanceHeatmapData = transformAttendanceForHeatmap(studentData.attendance);

  return (
    <Box sx={{
      padding: { xs: 2, sm: 4 },
      minHeight: "100vh",
      backgroundColor: "#f5f5f5"
    }}>
      <Typography variant="h3" sx={{
        fontWeight: "800",
        color: "#1a237e",
        mb: 4,
        textAlign: { xs: "center", sm: "left" },
      }}>
        <IconButton onClick={handleBackClick} sx={{ margin:"0px 20px" }}>
          <ArrowBackIcon sx={{ color: "#1a237e", fontSize: '2rem' }} />
        </IconButton>
        {studentId} Attendance Overview
      </Typography>

      <Card elevation={3} sx={{
        mb: 4,
        borderRadius: 2,
        padding: 3,
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
      }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3}>
            <Avatar sx={{
              width: 120,
              height: 120,
              margin: 'auto',
              border: '2px solid #e2e8f0'
            }}
            alt={student.name}
            src={student.avatar}
            />
            <Typography variant="h6" sx={{ 
              color: '#64748b',
              textAlign: 'center',
              mt: 2,
              fontWeight: 600 
            }}>
              {student.name}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={9}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <ProfileDetail icon={BadgeIcon} label="Student ID" value={student.studentId} />
                <ProfileDetail icon={SchoolIcon} label="Roll Number" value={student.rollNumber} />
              </Grid>
              <Grid item xs={12} md={4}>
                <ProfileDetail icon={SchoolIcon} label="Class" value={student.class} />
                <ProfileDetail icon={SchoolIcon} label="Year" value={student.year} />
              </Grid>
              <Grid item xs={12} md={4}>
                <ProfileDetail icon={EmailIcon} label="Email" value={student.email} />
                <ProfileDetail icon={PhoneIcon} label="Phone" value={student.phone} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{
            padding: { xs: 2, sm: 3 },
            borderRadius: 2,
            height: { xs: "auto", sm: "100%" },
            background: "white",
          }}>
            <AttendanceBarChart subjects={subjects} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: { xs: 2, sm: 3 },
            textAlign: "center",
            borderRadius: 2,
            minHeight: "100%",
          }}>
            <ProgressIndicator 
              totalClasses={100} 
              attendedClasses={studentData.student_details.overall_attendance} 
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={3}>
            {subjects.map((subject, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <SubjectCard
                  subject={subject.name}
                  total={subject.total}
                  present={subject.attended}
                  absent={subject.absent}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <AttendaceHeatmap attendanceData={attendanceHeatmapData} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentDashboard;