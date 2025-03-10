import React, { useState, useEffect, useRef } from "react";
import { 
  Button, 
  Typography, 
  Grid, 
  Paper, 
  Box, 
  Card, 
  CardContent,
  Container,
  Fade,
  CircularProgress,
  LinearProgress
} from "@mui/material";
import { styled } from "@mui/system";
import { useParams,useLocation, useNavigate } from "react-router-dom";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Styled components
const MainContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: '#f8f9fa',
  padding: theme.spacing(4),
}));

const MainCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
  maxWidth: '900px',
  margin: '0 auto',
  overflow: 'hidden',
}));

const StyledVideo = styled('video')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  borderRadius: '12px',
  objectFit: 'cover',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.up('sm')]: {
    height: '320px',
  },
}));

const InfoCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: '12px',
  backgroundColor: '#ffffff',
  textAlign: 'center',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const StatusCard = styled(Card)(({ theme, status }) => ({
  padding: theme.spacing(2),
  borderRadius: '12px',
  backgroundColor: status === 'success' ? '#e8f5e9' : '#f8f9fa',
  textAlign: 'center',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  marginTop: theme.spacing(2),
  transition: 'all 0.3s ease',
}));

const CaptureButton = styled(Button)(({ theme }) => ({
  borderRadius: '30px',
  padding: '12px 32px',
  fontSize: '16px',
  fontWeight: 600,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  textTransform: 'none',
  position: 'relative',
  overflow: 'hidden',
}));

const BlurOverlay = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backdropFilter: 'blur(8px)',
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
});

const MessageBox = styled(Paper)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  backgroundColor: 'white',
  padding: '24px 36px',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
});

const AnimatedHourglass = styled(HourglassEmptyIcon)({
  fontSize: '28px',
  animation: 'spin 2s infinite linear',
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
});

const ProgressIndicator = styled(Box)(({ theme, active, complete }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: complete ? '#4caf50' : active ? '#1976d2' : '#e0e0e0',
  color: '#fff',
  fontWeight: 'bold',
  margin: '0 auto',
  marginBottom: theme.spacing(1),
  transition: 'all 0.3s ease',
}));

const WebcamCapture = () => {
  const videoRef = useRef(null);
  const [capturedImages, setCapturedImages] = useState([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [curFrame, setCurFrame] = useState(0);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [processStatus, setProcessStatus] = useState("");
  const [captureProgress, setCaptureProgress] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state;
  
  const TOTAL_FRAMES = 30; // Total number of frames to capture

  // Function to capture a single frame
  const captureFrame = () => {

    const videoElement = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg");
  };

  // Send all 30 captured images as a batch to the backend
  const sendImagesBatch = async (images) => {
    try {
      setStatusMessage("Processing verification...");
      
      const response = await fetch("http://127.0.0.1:8000/capturing/verify-batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"id_number":formData.formData.id_number, "images": images }),
      });
    //   console.log(images)
      console.log(formData.formData.id_number)

      const data = await response.json();

      if (data.status === "success") {
        setProcessStatus("success");
        setStatusMessage("Verification successful!");
        setIsRedirecting(true);

        // Redirect after 3 seconds
        setTimeout(() => {
          navigate("/student");
        }, 3000);
      } else {
        setProcessStatus("error");
        setStatusMessage(data.message || "Verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Error sending images to the backend", error);
      setProcessStatus("error");
      setStatusMessage("Error connecting to the server. Please try again later.");
    }
  };

  // Function to start capturing images
  const startCapture = () => {
    setCapturedImages([]);
    setStatusMessage("Starting verification process...");
    setProcessStatus("");
    setCurFrame(0);
    setCaptureProgress(0);
    setIsCapturing(true);
  };

  // Capture 30 frames in regular intervals and send them as a batch
  useEffect(() => {
    let intervalId;
    if (isCapturing) {
      intervalId = setInterval(() => {
        if (capturedImages.length < TOTAL_FRAMES) {
          const newImage = captureFrame();
          setCapturedImages((prevImages) => [...prevImages, newImage]);
          const newFrame = capturedImages.length + 1;
          setCurFrame(newFrame);
          setCaptureProgress((newFrame / TOTAL_FRAMES) * 100);
          setStatusMessage(`Captured frame ${newFrame} of ${TOTAL_FRAMES}`);
        } else {
          clearInterval(intervalId);
          setIsCapturing(false);
          sendImagesBatch(capturedImages); // Send all captured images
        }
      }, 100); // Capture every 200ms (5 frames per second)
    }

    return () => clearInterval(intervalId);
  }, [isCapturing, capturedImages]);

  // Start video stream on component mount
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        console.error("Error accessing webcam", err);
        setStatusMessage("Error accessing webcam. Please check your camera permissions.");
      });
      
    return () => {
      // Clean up video stream when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  // Calculate progress steps for display
  const getProgressStepStatus = (step) => {
    const stepSize = TOTAL_FRAMES / 3;
    if (curFrame >= (step * stepSize)) return "complete";
    if (curFrame >= ((step - 1) * stepSize)) return "active";
    return "inactive";
  };

  return (
    <MainContainer maxWidth="lg">
      {isRedirecting && (
        <Fade in={isRedirecting}>
          <BlurOverlay>
            <MessageBox>
              <AnimatedHourglass />
              <Typography variant="h6" sx={{ fontWeight: 500 }}>Redirecting to student dashboard...</Typography>
            </MessageBox>
          </BlurOverlay>
        </Fade>
      )}

      <MainCard>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" sx={{ fontWeight: 700, mb: 1 }}>
              Capturing Student Identity
            </Typography>
            <Typography variant="body1" align="center" color="textSecondary" sx={{ mb: 4 }}>
              Please center your face in the camera and click the button below
            </Typography>
          </Grid>

          <Grid item xs={12} md={7}>
            <Box sx={{ position: 'relative' }}>
              <StyledVideo ref={videoRef} autoPlay muted />
              {isCapturing && (
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: '10px', 
                    right: '10px', 
                    backgroundColor: 'rgba(0,0,0,0.6)', 
                    color: 'white',
                    borderRadius: '20px',
                    padding: '4px 12px',
                  }}
                >
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CircularProgress size={16} thickness={6} color="inherit" />
                    Capturing {curFrame}/{TOTAL_FRAMES}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={5}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InfoCard>
                  <CardContent>
                    <Typography variant="h6" color="textSecondary" gutterBottom>
                      Capturing...
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 3 }}>
                      <Box sx={{ textAlign: 'center', flex: 1 }}>
                        <ProgressIndicator 
                          active={getProgressStepStatus(1) === "active"} 
                          complete={getProgressStepStatus(1) === "complete"}
                        >
                          {getProgressStepStatus(1) === "complete" ? <CheckCircleIcon /> : 1}
                        </ProgressIndicator>
                        <Typography variant="body2">Initial</Typography>
                      </Box>
                      
                      <Box sx={{ textAlign: 'center', flex: 1 }}>
                        <ProgressIndicator 
                          active={getProgressStepStatus(2) === "active"} 
                          complete={getProgressStepStatus(2) === "complete"}
                        >
                          {getProgressStepStatus(2) === "complete" ? <CheckCircleIcon /> : 2}
                        </ProgressIndicator>
                        <Typography variant="body2">Middle</Typography>
                      </Box>
                      
                      <Box sx={{ textAlign: 'center', flex: 1 }}>
                        <ProgressIndicator 
                          active={getProgressStepStatus(3) === "active"} 
                          complete={getProgressStepStatus(3) === "complete"}
                        >
                          {getProgressStepStatus(3) === "complete" ? <CheckCircleIcon /> : 3}
                        </ProgressIndicator>
                        <Typography variant="body2">Final</Typography>
                      </Box>
                    </Box>

                    {isCapturing && (
                      <Box sx={{ mb: 2 }}>
                        <LinearProgress variant="determinate" value={captureProgress} />
                        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                          Capturing {curFrame} of {TOTAL_FRAMES} frames ({Math.round(captureProgress)}%)
                        </Typography>
                      </Box>
                    )}

                    <CaptureButton
                      variant="contained"
                      color="primary"
                      onClick={startCapture}
                      disabled={isCapturing || curFrame === TOTAL_FRAMES || isRedirecting}
                      fullWidth
                      size="large"
                      startIcon={<CameraAltIcon />}
                    >
                      {curFrame === TOTAL_FRAMES 
                        ? "Capture Complete" 
                        : isCapturing 
                          ? `Capturing...` 
                          : "Start Verification"}
                    </CaptureButton>
                  </CardContent>
                </InfoCard>
              </Grid>

              {statusMessage && (
                <Grid item xs={12}>
                  <Fade in={!!statusMessage}>
                    <StatusCard status={processStatus}>
                      <CardContent sx={{ py: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                          {processStatus === 'success' ? (
                            <CheckCircleIcon color="success" />
                          ) : isCapturing || curFrame === TOTAL_FRAMES ? (
                            <CircularProgress size={20} thickness={5} />
                          ) : processStatus === 'error' ? (
                            <Typography variant="body1" color="error">⚠️</Typography>
                          ) : null}
                          <Typography 
                            variant="body1"
                            color={processStatus === 'success' ? 'success.main' : 
                                  processStatus === 'error' ? 'error.main' : 'textPrimary'}
                            sx={{ fontWeight: 500 }}
                          >
                            {statusMessage}
                          </Typography>
                        </Box>
                      </CardContent>
                    </StatusCard>
                  </Fade>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </MainCard>
    </MainContainer>
  );
};

export default WebcamCapture;