import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Fade,
  LinearProgress,
  CircularProgress,
  Chip,
  Avatar,
  createTheme,
  ThemeProvider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  PhotoCamera,
  Search as SearchIcon,
  Check as CheckIcon,
  RestartAlt as RestartIcon,
  TrendingUp as TrendingUpIcon,
  Group as GroupIcon,
  AccessTime as AccessTimeIcon,
  Download as DownloadIcon,
  Undo as UndoIcon,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#4caf50",
    },
  },
});

// Stats Component
const AttendanceStats = ({ presentCount, totalCount }) => {
  const attendanceRate = ((presentCount / totalCount) * 100).toFixed(1);

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center", p: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <Avatar sx={{ bgcolor: "primary.light", mr: 2 }}>
                  <TrendingUpIcon />
                </Avatar>
                <Typography variant="h4" color="primary.main">
                  {attendanceRate}%
                </Typography>
              </Box>
              <Typography color="text.secondary" variant="body2">
                Attendance Rate
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center", p: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <Avatar sx={{ bgcolor: "secondary.light", mr: 2 }}>
                  <GroupIcon />
                </Avatar>
                <Typography variant="h4" color="secondary.main">
                  {presentCount}/{totalCount}
                </Typography>
              </Box>
              <Typography color="text.secondary" variant="body2">
                Students Present
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center", p: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <Avatar sx={{ bgcolor: "warning.light", mr: 2 }}>
                  <AccessTimeIcon />
                </Avatar>
                <Typography variant="h4" color="text.primary">
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
              </Box>
              <Typography color="text.secondary" variant="body2">
                Last Updated
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const MarkAttendance = () => {
  // States
  const [activeStep, setActiveStep] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);
  const [frameCount, setFrameCount] = useState(1);
  const [capturedFrames, setCapturedFrames] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [attendanceProcessed, setAttendanceProcessed] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [presentStudents, setPresentStudents] = useState([]);
  const [absentStudents, setAbsentStudents] = useState([]);
  const [recentlyMoved, setRecentlyMoved] = useState(null);
  const [captureInterval, setCaptureInterval] = useState(null);
  const [socket, setSocket] = useState(null);
  const [detectedFaces, setDetectedFaces] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [numPeriods, setNumPeriods] = useState(1);


  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const hiddenCanvasRef = useRef(document.createElement("canvas"));
  const { id, year: rawYear,faculty_name } = useParams();
  const year = rawYear.toUpperCase();
  const [subject, section] = id.split("-");
  const branch = "CS";
  const navigate = useNavigate();
  // Fetch all students
  useEffect(() => {
    fetchAllStudents();
  }, [year, subject, section, branch]);

  // Camera cleanup effect
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  // Draw face boxes when detectedFaces change
  useEffect(() => {
    if (detectedFaces.length > 0 && canvasRef.current) {
      drawFaceBoxes(detectedFaces);
    }
  }, [detectedFaces]);

  // Camera functions
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraError(null);
    } catch (error) {
      setCameraError("Unable to access camera. Please check permissions.");
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (videoRef?.current) {
      let stream = videoRef.current.srcObject;
      if (stream) {
        let tracks = stream.getTracks();
        tracks.forEach((track) => track.stop()); // Stop all tracks
      }
      videoRef.current.srcObject = null;
    } else {
      console.warn("Camera stream already stopped or videoRef is null.");
    }
  };

  const captureFrame = () => {
    const canvas = hiddenCanvasRef.current;
    const context = canvas?.getContext("2d");
    const video = videoRef.current;

    // Check if video is ready
    if (
      !canvas ||
      !context ||
      !video ||
      !video.videoWidth ||
      !video.videoHeight ||
      video.readyState < 2
    ) {
      // HTMLMediaElement.HAVE_CURRENT_DATA = 2
      console.warn("Video or canvas not ready yet. Skipping frame capture.");
      return null;
    }

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Also make sure the visible canvas matches the video dimensions
    const visibleCanvas = canvasRef.current;
    if (visibleCanvas) {
      visibleCanvas.width = video.videoWidth;
      visibleCanvas.height = video.videoHeight;
    }

    return canvas.toDataURL("image/jpeg", 0.5);
  };

  const drawFaceBoxes = (faces) => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Ensure canvas exists

    const context = canvas.getContext("2d");
    const video = videoRef.current;

    if (!video || video.videoWidth === 0) return;

    // Set canvas dimensions to match video if not already set
    if (
      canvas.width !== video.videoWidth ||
      canvas.height !== video.videoHeight
    ) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    // Clear the canvas first
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw face boxes
    context.strokeStyle = "red";
    context.lineWidth = 3;
    context.font = "16px Arial";
    context.fillStyle = "white";

    // Add semi-transparent overlay for text background
    context.fillStyle = "rgba(255, 0, 0, 0.7)";

    faces.forEach(({ x, y, w, h, name }) => {
      // Draw rectangle
      context.strokeRect(x, y, w, h);

      // Draw text background
      const textWidth = context.measureText(name || "Unknown").width;
      context.fillRect(x, y - 25, textWidth + 10, 20);

      // Draw text
      context.fillStyle = "white";
      context.fillText(name || "Unknown", x + 5, y - 10);
      context.fillStyle = "rgba(255, 0, 0, 0.7)"; // Reset for next iteration
    });
  };
  const handleStartCapture = () => {
    startCamera();
    setIsCapturing(true);
    setFrameCount(0);

    const ws = new WebSocket("ws://127.0.0.1:8000/predict/ws");
    setSocket(ws);

    ws.onopen = () => {
      console.log("WebSocket Connected");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.students) {
          setDetectedFaces(data.students);
          setFrameCount((prev) => prev + 1);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    // Set up credentials and parameters for the WebSocket messages
    const facultyId = "1";
    // const year = 'E3';
    // const branch = 'ece';
    // const section = 'C';

    // Wait for video to be ready before setting up the interval
    videoRef.current.onloadeddata = () => {
      console.log("Video is ready for capture");

      const interval = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          const frame = captureFrame();
          if (!frame) return; // Skip sending if frame is empty

          ws.send(
            JSON.stringify({
              frame: frame,
              faculty_id: facultyId,
              year: year,
              branch: branch,
              section: section,
            })
          );
        }
      }, 500);

      setCaptureInterval(interval);
    };
  };

  const fetchAllStudents = async () => {
    setIsLoading(true);
    try {
      const requestBody = { year, branch, section };

      console.log("Sending Request:", requestBody);

      const response = await fetch(
        "http://127.0.0.1:8000/predict/allstudents",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      console.log("Response Status:", response.status);

      // Read response as text to catch unexpected errors
      const responseText = await response.text();
      // console.log("Raw Response:", responseText); 

      if (!response.ok) {
        throw new Error(
          `Failed to fetch students: ${response.status} - ${responseText}`
        );
      }

      const data = JSON.parse(responseText);
      console.log("Fetched Students Data:", data);

      setAllStudents(Array.isArray(data.students) ? data.students : []);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStopCapture = () => {
    setIsCapturing(false);

    if (captureInterval) {
      clearInterval(captureInterval);
      setCaptureInterval(null);
    }

    if (socket) {
      socket.close();
      setSocket(null);
    }

    // Process the attendance data
    // Extract unique student names from detectedFaces
    console.log("Detected Faces:", detectedFaces);
    const detectedStudentIdentifiers = new Set(
      detectedFaces
        .filter(
          (face) => (face.name && face.name !== "Unknown") || face.id_number
        )
        .flatMap((face) => [face.name, face.id_number].filter(Boolean))
    );

    // Find matching students from allStudents
    const presentStudentsList = allStudents.filter(
      (student) =>
        detectedStudentIdentifiers.has(student.name) ||
        detectedStudentIdentifiers.has(student.id_number)
    );

    // Find absent students (those in allStudents but not in presentStudentsList)
    const absentStudentsList = allStudents.filter(
      (student) =>
        !presentStudentsList.some(
          (present) => present.id_number === student.id_number
        )
    );

    setPresentStudents(presentStudentsList);
    setAbsentStudents(absentStudentsList);
    setAttendanceProcessed(true);
    setActiveStep(1);

    console.log("Present Students:", presentStudentsList);
    console.log("Absent Students:", absentStudentsList);

    // Optionally, save attendance to backend
    // saveAttendanceToBackend(presentStudentsList, absentStudentsList);

    stopCamera();
  };

  const handleReset = () => {
    setActiveStep(0);
    setFrameCount(0);
    setIsCapturing(false);
    setAttendanceProcessed(false);
    setPresentStudents([]);
    setAbsentStudents([]);
    setRecentlyMoved(null);
    setCapturedFrames([]);
    setDetectedFaces([]);
    stopCamera();

    if (captureInterval) {
      clearInterval(captureInterval);
      setCaptureInterval(null);
    }

    if (socket) {
      socket.close();
      setSocket(null);
    }
  };

  const moveToPresent = (student) => {
    setAbsentStudents((prev) =>
      prev.filter((s) => s.id_number !== student.id_number)
    );
    setPresentStudents((prev) => [...prev, student]);
    setRecentlyMoved(student);
  };

  const moveToAbsent = (student) => {
    setPresentStudents((prev) =>
      prev.filter((s) => s.id_number !== student.id_number)
    );
    setAbsentStudents((prev) => [...prev, student]);
    setRecentlyMoved(student);
  };


  const handleSubmitAttendance = async () => {
    try {
      console.log("🚀 Submitting Attendance...");
  
      const ids_list = presentStudents.map(student => student.id_number);
      
      // Check if required fields are missing
      // if (!subject || !faculty_name || !year || !branch || !section || !numPeriods) {
      //   console.error("❌ Missing required fields in submissionData");
      //   console.log()
      //   return;
      // }
  
      const submissionData = {
        ids: ids_list,
        subject,
        faculty_name,
        year,
        branch,
        section,
        number_of_periods: numPeriods,
      };
  
      console.log("📤 Sending data to backend:", submissionData);
  
      const response = await fetch("http://127.0.0.1:8000/faculty/mark-attendance", { // Check underscore vs. hyphen in URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });
  
      console.log("📥 Response received from backend:", response);
  
      if (!response.ok) {
        const errorResponse = await response.text(); // Get more details from the response
        throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorResponse}`);
      }
  
      const responseData = await response.json();
      console.log("✅ Attendance submission successful:", responseData);
  
      // Use navigate with replace to prevent back navigation
      navigate("/faculty/todayclasses", { replace: true });
    } catch (error) {
      console.error("❌ Error submitting attendance:", error);
    } finally {
      setSubmitDialogOpen(false);
    }
  };
    

  const undoMove = () => {
    if (recentlyMoved) {
      setPresentStudents((prev) =>
        prev.filter((s) => s.id_number !== recentlyMoved.id_number)
      );
      setAbsentStudents((prev) => [...prev, recentlyMoved]);
      setRecentlyMoved(null);
    }
  };

  const filteredPresentStudents = presentStudents.filter(
    (student) =>
      student.name?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
      "" ||
      student.id_number?.includes(searchQuery) ||
      ""
  );

  const steps = ["Capture Attendance", "Review & Adjust"];

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                background: "linear-gradient(45deg, #2196f3 30%, #4caf50 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "bold",
              }}
            >
              Mark Attendance
            </Typography>
            {attendanceProcessed && (
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                sx={{
                  background:
                    "linear-gradient(45deg, #2196f3 30%, #4caf50 90%)",
                  color: "white",
                }}
              >
                Export Report
              </Button>
            )}
          </Box>

          {/* Stats Overview */}
          {attendanceProcessed && (
            <AttendanceStats
              presentCount={presentStudents.length}
              totalCount={presentStudents.length + absentStudents.length || 10}
            />
          )}

          {/* Stepper */}
          <Stepper
            activeStep={activeStep}
            sx={{
              mb: 4,
              "& .MuiStepLabel-root .Mui-completed": {
                color: "secondary.main",
              },
              "& .MuiStepLabel-root .Mui-active": {
                color: "primary.main",
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Camera Section */}
          {activeStep === 0 && (
            <Card
              sx={{
                mb: 4,
                background:
                  "linear-gradient(120deg, rgba(33, 150, 243, 0.05), rgba(76, 175, 80, 0.05))",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      maxWidth: 640,
                      height: 480,
                      bgcolor: "background.paper",
                      borderRadius: 2,
                      overflow: "hidden",
                      position: "relative",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {!isCapturing && !videoRef.current?.srcObject && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          textAlign: "center",
                          zIndex: 10,
                        }}
                      >
                        <PhotoCamera
                          sx={{ fontSize: 64, color: "primary.light" }}
                        />
                        <Typography color="text.secondary" sx={{ mt: 2 }}>
                          Click Start Capture to begin
                        </Typography>
                      </Box>
                    )}
                    {/* Always display the video element, don't hide it */}
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block", // Always display the video
                      }}
                    />
                    {/* Position the canvas on top of the video */}
                    <canvas
                      ref={canvasRef}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        zIndex: 5, // Ensure canvas is above video but below the frame counter
                      }}
                    />
                    {isCapturing && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 16,
                          right: 16,
                          bgcolor: "rgba(255, 255, 255, 0.9)",
                          p: 1,
                          borderRadius: 1,
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                          zIndex: 20, // Ensure the frame counter is on top
                        }}
                      >
                        <Typography color="primary">
                          Frames Captured: {frameCount}
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={(frameCount / 10) * 100}
                          sx={{ mt: 1 }}
                        />
                      </Box>
                    )}
                  </Box>

                  {cameraError && (
                    <Alert
                      severity="error"
                      sx={{
                        width: "100%",
                        borderRadius: 2,
                      }}
                    >
                      {cameraError}
                    </Alert>
                  )}

                  <Box sx={{ display: "flex", gap: 2 }}>
                    {!isCapturing ? (
                      <Button
                        variant="contained"
                        onClick={handleStartCapture}
                        disabled={isCapturing}
                        startIcon={<PhotoCamera />}
                        size="large"
                        sx={{
                          px: 4,
                          py: 1.5,
                          fontSize: "1.1rem",
                          background:
                            "linear-gradient(45deg, #2196f3 30%, #2196f3 90%)",
                          "&:hover": {
                            background:
                              "linear-gradient(45deg, #1976d2 30%, #1976d2 90%",
                          },
                        }}
                      >
                        Start Capture
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={handleStopCapture}
                        color="secondary"
                        startIcon={<CheckIcon />}
                        size="large"
                        sx={{
                          px: 4,
                          py: 1.5,
                          fontSize: "1.1rem",
                        }}
                      >
                        Stop Capture
                      </Button>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Results Section */}
{/* Inside your Results Section */}
{activeStep === 1 && (
  <Fade in={attendanceProcessed}>
    <Box>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Attendance Results</Typography>
        <Box>
          {recentlyMoved && (
            <Button
              variant="outlined"
              startIcon={<UndoIcon />}
              onClick={undoMove}
              sx={{ mr: 2 }}
            >
              Undo Last Move
            </Button>
          )}
          <Button
            variant="outlined"
            startIcon={<RestartIcon />}
            onClick={handleReset}
            sx={{ borderRadius: 20, mr: 2 }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setSubmitDialogOpen(true)}
            sx={{ borderRadius: 20 }}
          >
            Submit Attendance
          </Button>
        </Box>
      </Box>

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {/* Present Students List */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6">Present Students</Typography>
                  <Chip
                    label={`${presentStudents.length} Students`}
                    color="success"
                    variant="outlined"
                  />
                </Box>

                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                    ),
                  }}
                  sx={{ mb: 2 }}
                />

                {presentStudents.length === 0 ? (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    No students marked as present
                  </Alert>
                ) : (
                  <List
                    sx={{
                      maxHeight: 400,
                      overflow: "auto",
                      "&::-webkit-scrollbar": {
                        width: "8px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "rgba(0,0,0,0.2)",
                        borderRadius: "4px",
                      },
                    }}
                  >
                    {filteredPresentStudents.map((student) => (
                      <ListItem key={student.id_number}>
                        <ListItemText
                          primary={student.name ? student.name : "Unknown"} // Makes name bold
                          secondary={`ID: ${student.id_number}`}
                        />
                        <ListItemSecondaryAction>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Chip
                              icon={<CheckIcon />}
                              label="Present"
                              color="success"
                              size="small"
                              sx={{ mr: 1 }}
                            />
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => moveToAbsent(student)}
                              color="error"
                              sx={{ borderRadius: 20 }}
                            >
                              Mark Absent
                            </Button>
                          </Box>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Absent Students List */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6">Absent Students</Typography>
                  <Chip
                    label={`${absentStudents.length} Students`}
                    color="error"
                    variant="outlined"
                  />
                </Box>

                {absentStudents.length === 0 ? (
                  <Alert severity="success" sx={{ mt: 2 }}>
                    All students are present
                  </Alert>
                ) : (
                  <List
                    sx={{
                      maxHeight: 400,
                      overflow: "auto",
                      "&::-webkit-scrollbar": {
                        width: "8px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "rgba(0,0,0,0.2)",
                        borderRadius: "4px",
                      },
                    }}
                  >
                    {absentStudents.map((student) => (
                      <ListItem key={student.id_number}>
                        <ListItemText
                          primary={student.name}
                          secondary={`ID: ${student.id_number}`}
                        />
                        <ListItemSecondaryAction>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => moveToPresent(student)}
                            color="primary"
                            sx={{ borderRadius: 20 }}
                          >
                            Mark Present
                          </Button>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Submit Attendance Dialog */}
      <Dialog
        open={submitDialogOpen}
        onClose={() => setSubmitDialogOpen(false)}
        aria-labelledby="submit-attendance-dialog-title"
      >
        <DialogTitle id="submit-attendance-dialog-title">
          Submit Attendance
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Please enter the number of periods for this attendance record.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="periods"
            label="Number of Periods"
            type="number"
            fullWidth
            variant="outlined"
            value={numPeriods}
            onChange={(e) => setNumPeriods(parseInt(e.target.value) || 0)}
            inputProps={{ min: 1, step: 1 }}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setSubmitDialogOpen(false)} 
            color="primary"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmitAttendance} 
            color="primary" 
            variant="contained"
            disabled={numPeriods < 1}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  </Fade>
)}
</Box>
</Container>
</ThemeProvider>
  );
};

export default MarkAttendance;
