import React, { useEffect, useState } from "react";
import AttendanceBarChart from "../../components/StudentDashboard/AttendanceBarChart";
import ProgressIndicator from "../../components/StudentDashboard/ProgressIndicator";
import SubjectCard from "../../components/StudentDashboard/SubjectCard";
import { Box, Grid, Typography, Paper } from "@mui/material";

const StudentDashboard = () => {
  const [subjects, setSubjects] = useState([]);
  const [attendanceSummary, setAttendanceSummary] = useState(null);
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentDashboard = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
        console.log(token);
        if (!token) {
          throw new Error("Authentication token not found. Please log in.");
        }

        // Fetch data from backend
        const response = await fetch("http://127.0.0.1:8000/student/attendance", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch student dashboard data");
        }

        const result = await response.json();
        console.log("Student Dashboard Data:", result);

        // Extract and set student ID
        setStudentId(result.studentId);

        // Transform `attendance_summary` for visualization
        const transformedSubjects = Object.entries(result.attendance_summary)
          .filter(([key]) => key !== "total") // Exclude total summary
          .map(([subject, details]) => ({
            name: subject,
            total: details.num_classes,
            attended: details.num_present,
            absent: details.num_classes - details.num_present,
            percentage: details.percentage,
          }));

        setSubjects(transformedSubjects);

        // Set overall attendance summary (convert numbers to strings)
        setAttendanceSummary({
          num_classes: String(result.attendance_summary.total.total_classes),
          num_present: String(result.attendance_summary.total.total_present),
          percentage: result.attendance_summary.total.percentage,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDashboard();
  }, []);

  // Render loading state
  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  // Render error state
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 4 },
        minHeight: "100vh",
      }}
    >
      {/* Header with Student ID */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: "800",
          color: "#1a237e",
          mb: 4,
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        {studentId} Student Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Attendance Bar Chart */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={3}
            sx={{
              padding: { xs: 2, sm: 3 },
              borderRadius: 2,
              background: "white",
            }}
          >
            <AttendanceBarChart subjects={subjects} />
          </Paper>
        </Grid>

        {/* Progress Indicator */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: { xs: 2, sm: 3 },
              textAlign: "center",
              borderRadius: 2,
              minHeight: "100%",
            }}
          >
            {attendanceSummary && (
              <ProgressIndicator
                totalClasses={Number(attendanceSummary.num_classes)}
                attendedClasses={Number(attendanceSummary.num_present)}
              />
            )}
          </Paper>
        </Grid>

        {/* Subject Cards */}
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
      </Grid>
    </Box>
  );
};

export default StudentDashboard;
