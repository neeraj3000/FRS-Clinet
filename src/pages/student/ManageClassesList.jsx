import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Container,
  Paper,
  Skeleton,
  Chip,
  TextField,
} from "@mui/material";
import { AccessTime, Event, Person } from "@mui/icons-material";
import axios from "axios";
const StatusStyles = {
  upcoming: {
    bg: "rgba(33, 150, 243, 0.04)",
    border: "rgba(33, 150, 243, 0.3)",
    color: "#2196f3",
  },
  cancelled: {
    bg: "rgba(244, 67, 54, 0.04)",
    border: "rgba(244, 67, 54, 0.3)",
    color: "#f44336",
  },
  present: {
    bg: "rgba(76, 175, 80, 0.04)",
    border: "rgba(76, 175, 80, 0.3)",
    color: "#4caf50",
  },
  absent: {
    bg: "rgba(255, 152, 0, 0.04)",
    border: "rgba(255, 152, 0, 0.3)",
    color: "#ff9800",
  },
};

const StatusIcons = {
  upcoming: <AccessTime />,
  cancelled: <Event />,
  present: <Person />,
  absent: <Person />,
};

const ClassSchedule = () => {
  const [scheduleData, setScheduleData] = useState(null);
  const [error, setError] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const authtoken = localStorage.getItem("token");

  useEffect(() => {
    const getStudentId = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
        });
        setStudentId(response.data.id_number);
      } catch (err) {
        setError("Failed to fetch student profile");
      }
    };
    getStudentId();
  }, [authtoken]);

  useEffect(() => {
    if (!studentId) return;

    const fetchSchedule = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/student/dashboard?id_number=${studentId}&date=${selectedDate}`
        );
        setScheduleData(response.data);
      } catch (err) {
        setError("Failed to fetch schedule");
      }
    };

    fetchSchedule();
  }, [studentId, selectedDate]);

  if (error) {
    return (
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            p: 3,
            bgcolor: "#fff3f3",
            color: "error.main",
            borderRadius: 2,
            mt: 3,
          }}
        >
          <Typography variant="h6">{error}</Typography>
        </Paper>
      </Container>
    );
  }

  if (!scheduleData) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ pt: 3 }}>
          <Skeleton variant="text" width="300px" height={40} />
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {[1, 2, 3].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <Skeleton variant="rectangular" height={160} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box
          sx={{
            mb: { xs: 2, sm: 3 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            fontWeight="bold"
            color="#1a237e"
          >
            Scheduled Classes
          </Typography>

          <TextField
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            sx={{
              width: { xs: "100%", sm: 200 },
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "white",
              },
            }}
            InputLabelProps={{ shrink: true }}
            label="Select Date"
          />
        </Box>

        <Typography variant="h6" sx={{ mt: 2, mb: 3 }} color="primary">
          {scheduleData.name} ({scheduleData.Student_id})
        </Typography>

        <Grid container spacing={3}>
          {Object.entries(scheduleData.Timetable).map(([subject, details]) => {
            const status = details[2].toLowerCase();
            return (
              <Grid item xs={12} sm={6} md={4} key={subject}>
                <Card
                  elevation={2}
                  sx={{
                    height: "100%",
                    borderRadius: 2,
                    backgroundColor: StatusStyles[status].bg,
                    border: `1px solid ${StatusStyles[status].border}`,
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      fontWeight="500"
                      color="text.primary"
                    >
                      {subject}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <AccessTime
                        sx={{
                          fontSize: 20,
                          color: "text.secondary",
                          mr: 1,
                        }}
                      />
                      <Typography variant="body1" color="text.secondary">
                        Period {details[0].join(", ")}
                      </Typography>
                    </Box>

                    <Chip
                      icon={StatusIcons[status]}
                      label={details[2]}
                      sx={{
                        bgcolor: `${StatusStyles[status].color}15`,
                        color: StatusStyles[status].color,
                        fontWeight: 500,
                        border: `1px solid ${StatusStyles[status].border}`,
                        "& .MuiChip-icon": {
                          color: StatusStyles[status].color,
                        },
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
};

export default ClassSchedule;
