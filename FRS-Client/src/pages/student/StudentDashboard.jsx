import React, { useEffect, useState } from "react";
import AttendanceBarChart from "../../components/StudentDashboard/AttendanceBarChart";
import ProgressIndicator from "../../components/StudentDashboard/ProgressIndicator";
import SubjectCard from "../../components/StudentDashboard/SubjectCard";
import { Box, Grid, Typography, Paper, IconButton } from "@mui/material";
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
          `http://127.0.0.1:8000/student/attendance`,
          { headers }
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }
        
        const data = await response.json();
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

  const transformSubjectsForChart = (attendanceSummary) => {
    if (!attendanceSummary) return [];
    
    return Object.entries(attendanceSummary)
      .filter(([key]) => key !== 'total')
      .map(([name, data]) => ({
        name,
        total: data.num_classes,
        attended: data.num_present,
        absent: data.num_classes - data.num_present
      }));
  };

  const transformAttendanceForHeatmap = (attendanceReport) => {
    if (!attendanceReport) return {};
    
    const heatmapData = {};
    
    Object.entries(attendanceReport).forEach(([subject, data]) => {
      data.attendance?.forEach(entry => {
        const dateStr = entry.date;
        if (!heatmapData[dateStr]) {
          heatmapData[dateStr] = {};
        }
        heatmapData[dateStr][subject] = {
          status: entry.status,
          periods: entry.number_of_periods
        };
      });
  
      data.consolidated_attendance?.forEach(consolidatedEntry => {
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
    });
    
    return heatmapData;
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!studentData) return <Typography>No data available</Typography>;

  const subjects = transformSubjectsForChart(studentData.attendance_summary);
  const attendanceHeatmapData = transformAttendanceForHeatmap(studentData.attendance_report);

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
              totalClasses={studentData.attendance_summary.total.total_classes} 
              attendedClasses={studentData.attendance_summary.total.total_percentage} 
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