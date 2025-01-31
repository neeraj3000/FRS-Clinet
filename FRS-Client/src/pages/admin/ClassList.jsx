import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  CircularProgress,
} from "@mui/material";
import { School, AccessTime, People, Phone, Email } from "@mui/icons-material";
import { authtoken } from "../../GetAuthToken";

const periodToTime = {
  p1: "08:30",
  p2: "09:30",
  p3: "10:40",
  p4: "11:40",
  p5: "13:30",
  p6: "14:30",
  p7: "15:40",
};

const ClassCards = ({ year }) => {
  const todayDate = new Date().toISOString().slice(0, 10);
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/admin/Today_classes",
          {
            method:"POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${authtoken}`,
            },
           body: JSON.stringify({
            today_date: todayDate,
            year: year
          })
          }
        );

        console.log(response)

        const data = await response.json()
        console.log(data)

        const processedData = processClassData(data[year]);
        setClasses(processedData);
      } catch (error) {
        console.error("Error fetching class data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [year, todayDate]);

  const processClassData = (yearData) => {
    if (!yearData) return [];

    return Object.entries(yearData).flatMap(([section, subjects]) =>
      Object.entries(subjects).flatMap(([subject, details]) =>
        details.faculty.flatMap((faculty) =>
          details.periods.map((period) => ({
            subject,
            faculty: faculty.faculty_name,
            phone: faculty.faculty_phone,
            email: faculty.email_address,
            time: periodToTime[period],
            classFor: `Sec: ${section}`,
          }))
        )
      )
    );
  };

  const handleCardClick = (classItem, index) => {
    const currentTime = new Date();
    const classTime = new Date();
    const [hours, minutes] = classItem.time.split(":");
    classTime.setHours(hours, minutes, 0);

    if (currentTime >= classTime) {
      const data = {
        year: year,
        date: todayDate,
        section: classItem.classFor.replace("Sec: ", "").trim(),
        subject: classItem.subject,
        faculty: classItem.faculty,
        time: classItem.time,
      };
      const base64Data = btoa(JSON.stringify(data));
      navigate(`/admin/todayclasses/details?data=${base64Data}`);
    } else {
      alert(
        `The class for ${classItem.subject} is scheduled at ${classItem.time} and is not yet completed.`
      );
    }
  };

  return (
    <Box>
      <Typography variant="h6" component="h1" fontWeight="bold" color="#1a237e">
        {`${year} Class Details`}
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2} sx={{ padding: "16px" }}>
          {classes.map((classItem, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                onClick={() => handleCardClick(classItem, index)}
                sx={{
                  height: "100%",
                  maxWidth: 280,
                  margin: "auto",
                  borderRadius: "12px",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                  },
                  cursor: "pointer",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <School sx={{ color: "#1976d2" }} />
                      <Typography
                        variant="h6"
                        sx={{ color: "#1976d2", fontWeight: "bold" }}
                      >
                        {classItem.subject}
                      </Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        bgcolor: "#e3f2fd",
                        color: "#1976d2",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      {classItem.classFor}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 1.5 }} />

                  <Box sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <People sx={{ color: "#666" }} />
                      <Typography variant="body2" color="text.secondary">
                        {classItem.faculty}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <Phone sx={{ color: "#666" }} />
                      <Typography variant="body2" color="text.secondary">
                        {classItem.phone}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Email sx={{ color: "#666" }} />
                      <Typography variant="body2" color="text.secondary">
                        {classItem.email}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AccessTime sx={{ color: "#666" }} />
                      <Typography variant="body2" color="text.secondary">
                        {classItem.time}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ClassCards;
