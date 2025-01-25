import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';

const FacultyAuth = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const FACULTY_DASHBOARD_PATH = '/faculty-dashboard';



  useEffect(() => {
    if (capturedImage) {
      console.log('Captured Image:', capturedImage);
    }
    if (errorMessage) {
      console.log('Error Message:', errorMessage);
    }
  }, [capturedImage, errorMessage]);

  const captureImage = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setErrorMessage('');
    const base64String = capturedImage.split(",")[1]; // Remove the data URL prefix

    try {
      const res = await fetch("/compare_faces/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64String }),
      });

      if (res.ok) {
        const result = await res.json();
        setResponse(result);
      } else {
        setErrorMessage("Failed to send the image to the backend.");
      }
    } catch (error) {
      console.error("Error sending image to backend:", error);
      setErrorMessage("An error occurred while sending the image.");
    }

  };

  const authenticateFaculty = async () => {
    if (!capturedImage) {
      setErrorMessage('Please capture your image for authentication.');
      return;
    }

    const isAuthenticated = await mockAuthApi(capturedImage);

    if (isAuthenticated) {
      navigate(FACULTY_DASHBOARD_PATH);
    } else {
      setErrorMessage('Authentication failed. Please try again.');
    }
  };

  const mockAuthApi = async (image) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Faculty Authentication</h1>
      <div className="webcam-container">
        {!capturedImage ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcam-circle"
          />
        ) : (
          <img src={capturedImage} alt="Captured" className="captured-image-circle" />
        )}
      </div>
      <div className="button-container">
        {!capturedImage ? (
          <button onClick={captureImage} className="capture-button">Capture Image</button>
        ) : (
          <button onClick={() => setCapturedImage(null)} className="retake-button">Retake</button>
        )}
        <button onClick={authenticateFaculty} className="auth-button">Authenticate</button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <style jsx>{`
        .auth-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          min-height: 100vh;
          background: url('https://path-to-your-frs-image.jpg') no-repeat center center/cover;
          position: relative;
          z-index: 1;
        }

        .auth-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.6); /* Dim overlay for better text visibility */
          z-index: -1;
        }

        .auth-title {
          font-family: 'Roboto', sans-serif;
          color: #ffffff;
          margin-bottom: 20px;
          animation: slideDown 1.2s ease;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        }

        .webcam-container {
          margin: 20px;
        }

        .webcam-circle, .captured-image-circle {
          width: 300px;
          height: 300px;
          border: 5px solid #ffffff;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(255, 255, 255, 0.5);
          animation: zoomIn 1.2s ease;
        }

        .button-container {
          display: flex;
          gap: 15px;
          margin-top: 20px;
        }

        .capture-button, .retake-button, .auth-button {
          padding: 10px 25px;
          font-size: 16px;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          color: white;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .capture-button {
          background-color: #1976d2; /* Official blue */
        }

        .retake-button {
          background-color: #f57c00; /* Orange shade */
        }

        .auth-button {
          background-color: #4caf50; /* Green shade */
        }

        .capture-button:hover, .retake-button:hover, .auth-button:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 10px rgba(255, 255, 255, 0.3);
        }

        .error-message {
          color: white;
          margin-top: 10px;
          background-color: rgba(255, 0, 0, 0.3);
          padding: 5px 10px;
          border-radius: 5px;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }

        @keyframes slideDown {
          from {
            transform: translateY(-50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes zoomIn {
          from {
            transform: scale(0.8);
            opacity: 0.5;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default FacultyAuth;
