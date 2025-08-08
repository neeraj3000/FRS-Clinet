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
  Paper,
  useMediaQuery,
  IconButton,
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
  Person as PersonIcon,
  VisibilityOff as VisibilityOffIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";

// Create theme with responsive breakpoints
const theme = createTheme({
  palette: {
    primary: { main: "#2196f3" },
    secondary: { main: "#4caf50" },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

// Stats Component
const AttendanceStats = ({ presentCount, totalCount }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const attendanceRate = ((presentCount / totalCount) * 100).toFixed(1);

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: "center", p: isMobile ? 1 : 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
                <Avatar sx={{ bgcolor: "primary.light", mr: 1, width: isMobile ? 32 : 40, height: isMobile ? 32 : 40 }}>
                  <TrendingUpIcon fontSize={isMobile ? "small" : "medium"} />
                </Avatar>
                <Typography variant={isMobile ? "h5" : "h4"} color="primary.main">
                  {attendanceRate}%
                </Typography>
              </Box>
              <Typography color="text.secondary" variant="body2">
                Attendance Rate
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: "center", p: isMobile ? 1 : 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
                <Avatar sx={{ bgcolor: "secondary.light", mr: 1, width: isMobile ? 32 : 40, height: isMobile ? 32 : 40 }}>
                  <GroupIcon fontSize={isMobile ? "small" : "medium"} />
                </Avatar>
                <Typography variant={isMobile ? "h5" : "h4"} color="secondary.main">
                  {presentCount}/{totalCount}
                </Typography>
              </Box>
              <Typography color="text.secondary" variant="body2">
                Students Present
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: "center", p: isMobile ? 1 : 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
                <Avatar sx={{ bgcolor: "warning.light", mr: 1, width: isMobile ? 32 : 40, height: isMobile ? 32 : 40 }}>
                  <AccessTimeIcon fontSize={isMobile ? "small" : "medium"} />
                </Avatar>
                <Typography variant={isMobile ? "h5" : "h4"} color="text.primary">
                  {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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

// Responsive detected faces list component
const DetectedFacesList = ({ detectedFaces, isVisible, toggleVisibility }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Get unique faces based on id_number or name (whichever is available)
  const uniqueFaces = detectedFaces.reduce((acc, face) => {
    const identifier = face.id_number || face.name;
    if (identifier && identifier !== "Unknown" && !acc.some(f => (f.id_number || f.name) === identifier)) {
      acc.push(face);
    }
    return acc;
  }, []);

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 2, 
        ml: isMobile ? 0 : 2, 
        mt: isMobile ? 2 : 0,
        height: isMobile ? 'auto' : '100%',
        maxHeight: isMobile ? 300 : 600, 
        overflow: 'auto',
        bgcolor: 'background.paper',
        borderRadius: 2,
        width: '100%',
        position: 'relative',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
          <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
          Detected Students ({uniqueFaces.length})
        </Typography>
        {isMobile && (
          <IconButton size="small" onClick={toggleVisibility}>
            {isVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        )}
      </Box>
      
      {uniqueFaces.length === 0 ? (
        <Alert severity="info">
          No students detected yet. Please ensure students face the camera clearly.
        </Alert>
      ) : (
        <List dense={isMobile}>
          {uniqueFaces.map((face, index) => (
            <ListItem key={face.id_number || `face-${index}`} divider>
              <Avatar sx={{ bgcolor: 'primary.light', mr: 2, width: isMobile ? 28 : 40, height: isMobile ? 28 : 40 }}>
                {face.name ? face.name[0].toUpperCase() : "?"}
              </Avatar>
              <ListItemText 
                primary={
                  <Typography variant={isMobile ? "body2" : "body1"} fontWeight="medium">
                    {face.name || "Unknown"}
                  </Typography>
                } 
                secondary={face.id_number ? `ID: ${face.id_number}` : "ID not identified"}
              />
              <Chip 
                size="small" 
                color="success" 
                icon={<CheckIcon />} 
                label="Detected" 
                sx={{ ml: 1 }} 
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

const MarkAttendance = () => {
  // Media queries for responsive design
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  // States
  const [activeStep, setActiveStep] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);
  const [frameCount, setFrameCount] = useState(0);
  const [captureInterval, setCaptureInterval] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [attendanceProcessed, setAttendanceProcessed] = useState(false);
  const [presentStudents, setPresentStudents] = useState([]);
  const [absentStudents, setAbsentStudents] = useState([]);
  const [recentlyMoved, setRecentlyMoved] = useState(null);
  const [socket, setSocket] = useState(null);
  const [detectedFaces, setDetectedFaces] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [numPeriods, setNumPeriods] = useState(1);
  const [isListVisible, setIsListVisible] = useState(true);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const hiddenCanvasRef = useRef(document.createElement("canvas"));
  
  const { id, year: rawYear, faculty_name } = useParams();
  const year = rawYear.toUpperCase();
  const [subject, section] = id.split("-");
  const branch = "CS";
  const navigate = useNavigate();

  // Toggle list visibility on mobile
  const toggleListVisibility = () => {
    setIsListVisible(prev => !prev);
  };

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

  // Camera functions
  const startCamera = async () => {
    try {
      const constraints = {
        video: { 
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 },
          facingMode: "user"
        }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
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
        tracks.forEach((track) => track.stop());
      }
      videoRef.current.srcObject = null;
    }
  };

  const captureFrame = () => {
    const canvas = hiddenCanvasRef.current;
    const context = canvas?.getContext("2d");
    const video = videoRef.current;

    if (!canvas || !context || !video || !video.videoWidth || video.readyState < 2) {
      return null;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const visibleCanvas = canvasRef.current;
    if (visibleCanvas) {
      visibleCanvas.width = video.videoWidth;
      visibleCanvas.height = video.videoHeight;
    }

    return canvas.toDataURL("image/jpeg", 0.5);
  };

  const drawFaceBoxes = (faces) => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const context = canvas.getContext("2d");
  const video = videoRef.current;
  if (!video || video.videoWidth === 0) return;

  // Match canvas size to video
  if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  }

  // Draw the current video frame as background
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Scale helpers
  const scale = Math.min(canvas.width, canvas.height) / 500;
  const lineWidth = Math.max(1, Math.floor(2 * scale));
  const fontSize  = Math.max(10, Math.floor(16 * scale));

  context.font = `${fontSize}px Arial`;
  
  faces.forEach(({ x, y, w, h, name }) => {
    const isUnknown = name === "Unknown";

    // choose styles
    context.lineWidth   = lineWidth;
    context.strokeStyle = isUnknown ? "rgba(255, 0, 0, 0.8)"  // red
                                     : "rgba(0, 255, 0, 0.8)"; // green
    context.fillStyle   = isUnknown ? "rgba(255, 0, 0, 0.2)"
                                     : "rgba(0, 255, 0, 0.2)";

    // draw box
    context.fillRect(x, y, w, h);
    context.strokeRect(x, y, w, h);

    // draw label background
    const label = name || "Unknown";
    const textWidth = context.measureText(label).width;
    context.fillStyle = "rgba(0, 0, 0, 0.6)";
    context.fillRect(x, y - fontSize - 6, textWidth + 10, fontSize + 4);

    // draw label text
    context.fillStyle = "white";
    context.fillText(label, x + 5, y - 6);
  });
};

  
  const handleStartCapture = () => {
    startCamera();
    setIsCapturing(true);
    setFrameCount(0);
    setDetectedFaces([]);
    setIsListVisible(true);  // Ensure list is visible when starting capture
  
    const ws = new WebSocket("ws://127.0.0.1:8000/predict/ws");
    setSocket(ws);
  
    let isReadyToSend = true;
    let latestFaces = [];
  
    ws.onopen = () => {
      console.log("WebSocket Connected");
    };
  
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.students) {
          latestFaces = data.students;
          setDetectedFaces(prevFaces => [...prevFaces, ...data.students]);
          setFrameCount((prev) => prev + 1);
          isReadyToSend = true;
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };
  
    const facultyId = "1";
    
    videoRef.current.onloadeddata = () => {
      const captureInterval = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN && isReadyToSend) {
          const frame = captureFrame();
          if (!frame) return;
  
          ws.send(
            JSON.stringify({
              frame: frame,
              faculty_id: facultyId,
              year: year,
              branch: branch,
              section: section,
            })
          );
          isReadyToSend = false;
        }
      }, 150);
  
      setCaptureInterval(captureInterval);
  
      const renderLoop = () => {
        drawFaceBoxes(latestFaces);
        requestAnimationFrame(renderLoop);
      };
  
      requestAnimationFrame(renderLoop);
    };
  };
  
  const fetchAllStudents = async () => {
    setIsLoading(true);
    try {
      const requestBody = { year, branch, section };
      const response = await fetch("http://127.0.0.1:8000/predict/allstudents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(`Failed to fetch students: ${response.status} - ${responseText}`);
      }

      const data = JSON.parse(responseText);
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
    const detectedStudentIdentifiers = new Set(
      detectedFaces
        .flatMap(face => [face.name, face.id_number])
        .filter(val => val && val !== "Unknown")
    );


    // Find matching students from allStudents
    const presentStudentsList = allStudents.filter(
      (student) =>
        detectedStudentIdentifiers.has(student.name) ||
        detectedStudentIdentifiers.has(student.id_number)
    );

    // Find absent students
    const absentStudentsList = allStudents.filter(
      (student) =>
        !presentStudentsList.some((present) => present.id_number === student.id_number)
    );

    setPresentStudents(presentStudentsList);
    setAbsentStudents(absentStudentsList);
    setAttendanceProcessed(true);
    setActiveStep(1);

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
    setAbsentStudents((prev) => prev.filter((s) => s.id_number !== student.id_number));
    setPresentStudents((prev) => [...prev, student]);
    setRecentlyMoved(student);
  };

  const moveToAbsent = (student) => {
    setPresentStudents((prev) => prev.filter((s) => s.id_number !== student.id_number));
    setAbsentStudents((prev) => [...prev, student]);
    setRecentlyMoved(student);
  };

  const handleSubmitAttendance = async () => {
    try {
      const ids_list = presentStudents.map(student => student.id_number);
      
      const submissionData = {
        ids: ids_list,
        subject,
        faculty_name,
        year,
        branch,
        section,
        number_of_periods: numPeriods,
      };
  
      const response = await fetch("http://127.0.0.1:8000/faculty/mark-attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });
  
      if (!response.ok) {
        const errorResponse = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorResponse}`);
      }
  
      await response.json();
      navigate("/faculty/todayclasses", { replace: true });
    } catch (error) {
      console.error("Error submitting attendance:", error);
    } finally {
      setSubmitDialogOpen(false);
    }
  };

  const undoMove = () => {
    if (recentlyMoved) {
      if (presentStudents.some(s => s.id_number === recentlyMoved.id_number)) {
        moveToAbsent(recentlyMoved);
      } else {
        moveToPresent(recentlyMoved);
      }
      setRecentlyMoved(null);
    }
  };

  const filteredPresentStudents = presentStudents.filter(
    (student) =>
      student.name?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
      student.id_number?.includes(searchQuery)
  );

  const steps = ["Capture Attendance", "Review & Adjust"];

  // Dynamic height for camera based on device type
  const cameraHeight = isMobile ? 300 : isTablet ? 450 : 600;

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ py: 2, px: isMobile ? 1 : 3 }}>
        <Box sx={{ mb: 4 }}>
          {/* Header */}
          <Box sx={{ 
            display: "flex", 
            flexDirection: isMobile ? "column" : "row", 
            justifyContent: "space-between", 
            alignItems: isMobile ? "flex-start" : "center", 
            mb: 3,
            gap: 2
          }}>
            <Typography
              variant={isMobile ? "h5" : "h4"}
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
                size={isMobile ? "medium" : "large"}
                sx={{
                  background: "linear-gradient(45deg, #2196f3 30%, #4caf50 90%)",
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

          {/* Stepper - hide on small mobile devices to save space */}
          {!isMobile && (
            <Stepper
              activeStep={activeStep}
              sx={{
                mb: 3,
                "& .MuiStepLabel-root .Mui-completed": { color: "secondary.main" },
                "& .MuiStepLabel-root .Mui-active": { color: "primary.main" },
              }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          )}

          {/* Camera Section */}
          {activeStep === 0 && (
            <Card sx={{ mb: 3, background: "linear-gradient(120deg, rgba(33, 150, 243, 0.05), rgba(76, 175, 80, 0.05))" }}>
              <CardContent sx={{ p: isMobile ? 1 : 2 }}>
                <Grid container spacing={isMobile ? 2 : 3}>
                  {/* Larger Camera Section */}
                  <Grid item xs={12} md={8}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                      <Box
                        sx={{
                          width: "100%",
                          height: cameraHeight,
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
                            <PhotoCamera sx={{ fontSize: isMobile ? 48 : 80, color: "primary.light" }} />
                            <Typography color="text.secondary" variant={isMobile ? "body1" : "h6"} sx={{ mt: 2 }}>
                              Click Start Capture to begin
                            </Typography>
                          </Box>
                        )}
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                        <canvas
                          ref={canvasRef}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            zIndex: 5,
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
                              zIndex: 20,
                            }}
                          >
                            <Typography color="primary" variant={isMobile ? "body2" : "body1"}>
                              Frames: {frameCount}
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
                        <Alert severity="error" sx={{ width: "100%", borderRadius: 2 }}>
                          {cameraError}
                        </Alert>
                      )}

                      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
                        {!isCapturing ? (
                          <Button
                            variant="contained"
                            onClick={handleStartCapture}
                            disabled={isCapturing}
                            startIcon={<PhotoCamera />}
                            size={isMobile ? "medium" : "large"}
                            fullWidth={isMobile}
                            sx={{
                              px: isMobile ? 2 : 4,
                              py: isMobile ? 1 : 1.5,
                              fontSize: isMobile ? "1rem" : "1.1rem",
                              background: "linear-gradient(45deg, #2196f3 30%, #2196f3 90%)",
                              "&:hover": {
                                background: "linear-gradient(45deg, #1976d2 30%, #1976d2 90%",
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
                            size={isMobile ? "medium" : "large"}
                            fullWidth={isMobile}
                            sx={{ 
                              px: isMobile ? 2 : 4, 
                              py: isMobile ? 1 : 1.5, 
                              fontSize: isMobile ? "1rem" : "1.1rem" 
                            }}
                          >
                            Stop Capture
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                  
                  {/* Real-time Detected Students List */}
                  <Grid item xs={12} md={4}>
                    {(!isMobile || (isMobile && isListVisible)) && 
                      <DetectedFacesList 
                        detectedFaces={detectedFaces} 
                        isVisible={isListVisible}
                        toggleVisibility={toggleListVisibility}
                      />
                    }
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}

          {/* Results Section */}
          {activeStep === 1 && (
            <Fade in={attendanceProcessed}>
              <Box>
                <Box sx={{ 
                  mb: 3, 
                  display: "flex", 
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: "space-between", 
                  alignItems: isMobile ? "flex-start" : "center",
                  gap: 2
                }}>
                  <Typography variant={isMobile ? "h6" : "h5"}>Attendance Results</Typography>
                  <Box sx={{ 
                    display: "flex", 
                    flexDirection: isMobile ? "column" : "row",
                    gap: 1,
                    width: isMobile ? "100%" : "auto" 
                  }}>
                    {recentlyMoved && (
                      <Button
                        variant="outlined"
                        startIcon={<UndoIcon />}
                        onClick={undoMove}
                        fullWidth={isMobile}
                        size={isMobile ? "small" : "medium"}
                        sx={{ mr: isMobile ? 0 : 2 }}
                      >
                        Undo Last Move
                      </Button>
                    )}
                    <Button
                      variant="outlined"
                      startIcon={<RestartIcon />}
                      onClick={handleReset}
                      fullWidth={isMobile}
                      size={isMobile ? "small" : "medium"}
                      sx={{ borderRadius: 20, mr: isMobile ? 0 : 2 }}
                    >
                      Reset
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setSubmitDialogOpen(true)}
                      fullWidth={isMobile}
                      size={isMobile ? "small" : "medium"}
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
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {/* Search Bar - Now consistently at the top for both mobile and desktop */}
                    <Box 
                      sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        bgcolor: "background.paper", 
                        borderRadius: 2,
                        px: 2,
                        mb: 2,
                        width: "100%"
                      }}
                    >
                      <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
                      <TextField
                        variant="standard"
                        placeholder="Search students..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{ disableUnderline: true }}
                        fullWidth
                      />
                    </Box>
                    
                    {/* Container for Present/Absent Cards */}
                    <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 3 }}>
                      {/* Present Students Card */}
                      <Card sx={{ flexGrow: 1, mb: isMobile ? 2 : 0, borderRadius: 2 }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                            <CheckIcon color="success" sx={{ mr: 1 }} />
                            Present ({presentStudents.length})
                          </Typography>
                          <Paper
                            variant="outlined"
                            sx={{
                              maxHeight: 400,
                              overflow: "auto",
                              borderRadius: 2,
                            }}
                          >
                            {filteredPresentStudents.length > 0 ? (
                              <List dense={isMobile}>
                                {filteredPresentStudents.map((student) => (
                                  <ListItem key={student.id_number} divider>
                                    <ListItemText
                                      primary={student.name}
                                      secondary={`ID: ${student.id_number}`}
                                    />
                                    <ListItemSecondaryAction>
                                      <IconButton
                                        edge="end"
                                        aria-label="mark absent"
                                        onClick={() => moveToAbsent(student)}
                                        size="small"
                                      >
                                        <Chip 
                                          label="→ Absent" 
                                          color="error" 
                                          variant="outlined" 
                                          size="small" 
                                        />
                                      </IconButton>
                                    </ListItemSecondaryAction>
                                  </ListItem>
                                ))}
                              </List>
                            ) : (
                              <Box sx={{ p: 3, textAlign: "center" }}>
                                <Typography color="text.secondary">
                                  {searchQuery
                                    ? "No matches found"
                                    : "No students marked as present"}
                                </Typography>
                              </Box>
                            )}
                          </Paper>
                        </CardContent>
                      </Card>

                      {/* Absent Students Card */}
                      <Card sx={{ flexGrow: 1, borderRadius: 2 }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ mb: 2, color: "error.main", display: "flex", alignItems: "center" }}>
                            <VisibilityOffIcon color="error" sx={{ mr: 1 }} />
                            Absent ({absentStudents.length})
                          </Typography>
                          <Paper
                            variant="outlined"
                            sx={{
                              maxHeight: 400,
                              overflow: "auto",
                              borderRadius: 2,
                            }}
                          >
                            {absentStudents.length > 0 ? (
                              <List dense={isMobile}>
                                {absentStudents
                                  .filter(
                                    (student) =>
                                      student.name?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
                                      student.id_number?.includes(searchQuery)
                                  )
                                  .map((student) => (
                                    <ListItem key={student.id_number} divider>
                                      <ListItemText
                                        primary={student.name}
                                        secondary={`ID: ${student.id_number}`}
                                      />
                                      <ListItemSecondaryAction>
                                        <IconButton
                                          edge="end"
                                          aria-label="mark present"
                                          onClick={() => moveToPresent(student)}
                                          size="small"
                                        >
                                          <Chip 
                                            label="→ Present" 
                                            color="success" 
                                            variant="outlined" 
                                            size="small" 
                                          />
                                        </IconButton>
                                      </ListItemSecondaryAction>
                                    </ListItem>
                                  ))}
                              </List>
                            ) : (
                              <Box sx={{ p: 3, textAlign: "center" }}>
                                <Typography color="text.secondary">
                                  All students are marked as present
                                </Typography>
                              </Box>
                            )}
                          </Paper>
                        </CardContent>
                      </Card>
                    </Box>
                  </Box>
                )}
              </Box>
            </Fade>
          )}
        </Box>
      </Container>

      {/* Submit Attendance Dialog */}
      <Dialog open={submitDialogOpen} onClose={() => setSubmitDialogOpen(false)}>
        <DialogTitle>Confirm Attendance Submission</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to submit attendance for {presentStudents.length} students.
            {absentStudents.length > 0 && ` ${absentStudents.length} students will be marked as absent.`}
          </DialogContentText>
          <Box sx={{ mt: 3, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Number of Periods
            </Typography>
            <TextField
              select
              fullWidth
              value={numPeriods}
              onChange={(e) => setNumPeriods(Number(e.target.value))}
              SelectProps={{
                native: true,
              }}
              variant="outlined"
            >
              {[1, 2, 3, 4].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "Period" : "Periods"}
                </option>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSubmitDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmitAttendance} variant="contained" color="primary">
            Confirm & Submit
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default MarkAttendance;