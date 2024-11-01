import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import { Box, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const Capture = () => {
  const webcamRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    // Handle the image (e.g., send to server or save to state)
    console.log(imageSrc);
    // After capturing, navigate back to Faculty page
    navigate('/faculty', { state: location.state });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh" // Full viewport height
      bgcolor="#e1f5fe" // Optional: set background color
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        bgcolor="white"
        padding={2}
        borderRadius={2}
        boxShadow={3}
      >
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={320}
          height={240}
        />
        <Button onClick={capture} variant="contained" color="primary" style={{ marginTop: '16px' }}>
          Capture
        </Button>
      </Box>
    </Box>
  );
};

export default Capture;