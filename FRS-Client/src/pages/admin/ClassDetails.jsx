import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  IconButton,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
} from "@mui/material";
import {
  ArrowBack,
  CheckCircle,
  Cancel,
  AccessTime,
  Person,
  Class,
  HowToReg,
  School,
} from "@mui/icons-material";

// Dummy data with 40 students added
const classDetails = {
  id: 1,
  subject: "Math",
  faculty: "Dr. Smith",
  time: "10:00 AM",
  presents: 20,
  absents: 60,
  classFor: "Sec : A",
  students: [
    { name: "John Doe", id: "S101", status: "present" },
    { name: "Jane Smith", id: "S102", status: "present" },
    { name: "Alex Brown", id: "S103", status: "absent" },
    { name: "Emily White", id: "S104", status: "present" },
    { name: "Michael Green", id: "S105", status: "absent" },
    { name: "Lisa Black", id: "S106", status: "present" },
    { name: "Sophia Blue", id: "S107", status: "absent" },
    // Adding 40 more dummy students
    ...Array.from({ length: 40 }, (_, index) => ({
      name: `Student ${index + 8}`,
      id: `S1${index + 8}`,
      status: index % 2 === 0 ? "present" : "absent",
    })),
  ],
};

const ClassDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState(classDetails.students);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const presentStudents = students.filter(
    (student) => student.status === "present"
  );
  const absentStudents = students.filter(
    (student) => student.status === "absent"
  );

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleMarkPresent = (student) => {
    setSelectedStudent(student);
    setOpenDialog(true);
  };

  const handleConfirmAttendance = () => {
    setStudents(
      students.map((s) =>
        s.id === selectedStudent.id ? { ...s, status: "present" } : s
      )
    );
    setOpenDialog(false);
  };

  const handleMarkAbsentPresent = (student) => {
    setStudents(
      students.map((s) =>
        s.id === student.id ? { ...s, status: "present" } : s
      )
    );
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 4, backgroundColor: "#f9fafb", minHeight: "100vh" }}
    >
      {/* Header Section */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          mb: 2,
          backgroundColor: "#6a1b9a", // Changed blue color
          color: "white",
          borderRadius: "12px",
          height: "150px", // Decreased height
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton onClick={handleBackClick} sx={{ mr: 2, color: "white" }}>
            <ArrowBack sx={{ fontSize: 28 }} />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <School sx={{ fontSize: 30, color: "#ffca28" }} />{" "}
            {/* Icon color */}
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", fontSize: "1.6rem" }}
            >
              {classDetails.subject} Class
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Person sx={{ fontSize: 24, color: "#ffca28" }} />{" "}
              {/* Icon color */}
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Faculty
                </Typography>
                <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                  {classDetails.faculty}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AccessTime sx={{ fontSize: 24, color: "#ffca28" }} />{" "}
              {/* Icon color */}
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Time
                </Typography>
                <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                  {classDetails.time}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Class sx={{ fontSize: 24, color: "#ffca28" }} />{" "}
              {/* Icon color */}
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Section
                </Typography>
                <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                  {classDetails.classFor}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Attendance Summary */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              backgroundColor: "#c8e6c9", // Green color for present
              borderRadius: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "80px", // Decreased height
            }}
          >
            <Typography variant="h6" sx={{ fontSize: "1.5rem" }}>
              Present Students
            </Typography>
            <Chip
              icon={<CheckCircle sx={{ fontSize: 20 }} />}
              label={presentStudents.length}
              color="success"
              sx={{
                height: 35,
                "& .MuiChip-label": { fontSize: "1.2rem", px: 2 },
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              backgroundColor: "#ffcdd2", // Red color for absent
              borderRadius: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "80px", // Decreased height
            }}
          >
            <Typography variant="h6" sx={{ fontSize: "1.5rem" }}>
              Absent Students
            </Typography>
            <Chip
              icon={<Cancel sx={{ fontSize: 20 }} />}
              label={absentStudents.length}
              color="error"
              sx={{
                height: 35,
                "& .MuiChip-label": { fontSize: "1.2rem", px: 2 },
              }}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Students Lists */}
      <Grid container spacing={1}>
        {/* Present Students */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{ p: 1, borderRadius: "12px", backgroundColor: "#f1f8e9" }}
          >
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                color: "#388e3c",
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontSize: "1.2rem",
              }}
            >
              <CheckCircle sx={{ fontSize: 24 }} /> Present Students
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {presentStudents.map((student) => (
              <Card
                key={student.id}
                sx={{ mb: 1, backgroundColor: "#fff", height: 40 }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems:"center",
                    py: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems:"center",
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "1rem",
                        
                      }}
                    >
                      {student.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="textSecondary"
                      sx={{height:"100%",width:"30%",display:"flex",justifyContent:"center", fontSize: "0.9rem", border:"1px solid green",borderRadius:"6px", padding:"2px 2px" }}
                    >
                      ID: {student.id}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>

        {/* Absent Students */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{ p: 1, borderRadius: "12px", backgroundColor: "#ffebee" }}
          >
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                color: "#d32f2f",
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontSize: "1.2rem",
              }}
            >
              <Cancel sx={{ fontSize: 24 }} /> Absent Students
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {absentStudents.map((student) => (
              <Card
                key={student.id}
                sx={{ mb: 1, backgroundColor: "#fff", height: 50 }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    py: 1,
                  }}
                >
                  <Box sx={{width:"80%" ,display: "flex",justifyContent:"space-between" , alignItems: "center", gap: 6 }}>
                    <Typography variant="h6" sx={{ fontSize: "1rem" , display:"flex",}}>
                      {student.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="textSecondary"
                      sx={{height:"100%",width:"30%",display:"flex",justifyContent:"center", fontSize: "0.9rem", border:"1px solid green",borderRadius:"6px", padding:"2px 2px" }}
                    >
                      ID: {student.id}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained" // Changed to solid color
                    color="primary"
                    onClick={() => handleMarkAbsentPresent(student)}
                    sx={{ height: 30, fontSize: "0.9rem" }}
                  >
                    Consolidate
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>
      </Grid>

      {/* Dialog for confirming attendance */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Mark Present</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to mark {selectedStudent?.name} as present?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmAttendance} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ClassDetails;
