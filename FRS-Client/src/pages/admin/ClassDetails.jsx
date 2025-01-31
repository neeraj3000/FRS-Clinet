import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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
import { authtoken } from "../../GetAuthToken";

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
  const { year, classId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const urlParams = new URLSearchParams(location.search);
  const encodedData = urlParams.get("data");
  const decodedData = JSON.parse(atob(encodedData));
  const urlYear = decodedData.year;
  const date = decodedData.date;
  const section = decodedData.section;
  const subject = decodedData.subject;
  const faculty = decodedData.faculty;
  const class_time = decodedData.time;

  // State for student data
  const [students, setStudents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // State for attendance counts
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);

  // Fetch attendance data from API
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/admin/class-attendance",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${authtoken}`,
            },
            body: JSON.stringify({
              "year": "E1",
              "date": "2024-12-24",
              "section": "A",
              "subject": "DM"
            })
          }
        );

        // year: urlYear || "E1", // Use year from query or default
        // date: date || "2024-12-24", // Default date if not provided
        // section: section || "A", // Default section if not provided
        // subject: subject || "DM", // Default subject if not provided

        const data = await response.json();
        console.log(data);
        const { presenties, absenties } = data;

        // Update state with present and absent student IDs
        setPresentCount(presenties.length);
        setAbsentCount(absenties.length);

        // Assuming the present and absent students data are IDs
        const allStudents = [
          ...presenties.map((id) => ({ id, status: "present" })),
          ...absenties.map((id) => ({ id, status: "absent" })),
        ];

        setStudents(allStudents);
      } catch (error) {
        console.error("Error fetching attendance data", error);
      }
    };

    fetchAttendance();
  }, [urlYear, date, section, subject]); // Dependencies for when the query parameters change

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

  const presentStudents = students.filter(
    (student) => student.status === "present"
  );
  const absentStudents = students.filter(
    (student) => student.status === "absent"
  );

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
          backgroundColor: "rgba(158, 210, 253, 0.19)",
          color: "black",
          borderRadius: "12px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton onClick={handleBackClick} sx={{ mr: 2, color: "white" }}>
            <ArrowBack sx={{ fontSize: 28 }} />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <School sx={{ fontSize: 30, color: "#ffca28" }} />
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", fontSize: "1.6rem" }}
            >
              {subject} Class
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Person sx={{ fontSize: 24, color: "#ffca28" }} />
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Faculty
                </Typography>
                <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                  {faculty}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AccessTime sx={{ fontSize: 24, color: "#ffca28" }} />
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Time
                </Typography>
                <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                  {class_time}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Class sx={{ fontSize: 24, color: "#ffca28" }} />
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Section
                </Typography>
                <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                  {section}
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
              backgroundColor: "#c8e6c9",
              borderRadius: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "80px",
            }}
          >
            <Typography variant="h6" sx={{ fontSize: "1.5rem" }}>
              Present Students
            </Typography>
            <Chip
              icon={<CheckCircle sx={{ fontSize: 20 }} />}
              label={presentCount}
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
              backgroundColor: "#ffcdd2",
              borderRadius: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "80px",
            }}
          >
            <Typography variant="h6" sx={{ fontSize: "1.5rem" }}>
              Absent Students
            </Typography>
            <Chip
              icon={<Cancel sx={{ fontSize: 20 }} />}
              label={absentCount}
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
                    alignItems: "center",
                    py: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "1rem",
                      }}
                    >
                      ID: {student.id}
                    </Typography>
                    {/* <Typography
                      variant="h6"
                      color="textSecondary"
                      sx={{height:"100%",width:"30%",display:"flex",justifyContent:"center", fontSize: "0.9rem", border:"1px solid green",borderRadius:"6px", padding:"2px 2px" }}
                    >
                      ID: {student.id}
                    </Typography> */}
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
                  <Box
                    sx={{
                      width: "80%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "1rem", display: "flex" }}
                    >
                      ID: {student.id}
                    </Typography>
                    {/* <Typography
                      variant="h6"
                      color="textSecondary"
                      sx={{height:"100%",width:"30%",display:"flex",justifyContent:"center", fontSize: "0.9rem", border:"1px solid green",borderRadius:"6px", padding:"2px 2px" }}
                    >
                      ID: {student.id}
                    </Typography> */}
                  </Box>
                  <Button
                    variant="contained" // Changed to solid color
                    color="primary"
                    onClick={() => handleMarkPresent(student)}
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
