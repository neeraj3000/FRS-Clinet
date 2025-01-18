import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';

const FacultyDashboard = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [greeting, setGreeting] = useState('');
  const [facultyName, setFacultyName] = useState('Dr. John Doe');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const FACULTY_DASHBOARD_PATH = './facultyotp'; // Path to navigate after authentication

  useEffect(() => {
    if (facultyName) {
      setGreeting(`Good Morning, ${facultyName}`);
    }
  }, [facultyName]);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setErrorMessage('');
  };

  const authenticateFaculty = async () => {
    if (!capturedImage) {
      setErrorMessage('Please capture your image for authentication.');
      return;
    }
    setIsLoading(true); // Start loading

    const { isAuthenticated, name } = await mockAuthApi(capturedImage);

    setIsLoading(false); // Stop loading

    if (isAuthenticated) {
      setFacultyName(name);
      setGreeting(`Good Morning, ${name}`);
      navigate(FACULTY_DASHBOARD_PATH);
    } else {
      setErrorMessage('Authentication failed. Please try again.');
    }
  };

  const mockAuthApi = async (image) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulating a successful authentication with a hardcoded name
        resolve({ isAuthenticated: true, name: 'Dr. John Doe' });
      }, 2000);
    });
  };

  return (
    <div className="dashboard-container">
      <h1 className="greeting">{greeting}</h1>
      <div className="card">
        <h1>Faculty Authentication</h1>
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
          <button onClick={authenticateFaculty} className="auth-button" disabled={isLoading}>
            {isLoading ? 'Authenticating...' : 'Authenticate'}
          </button>
        </div>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body, html {
          height: 100%;
          width: 100%;
          overflow: hidden;
        }

        .dashboard-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          padding: 20px;
          background: #f5f5f5;
        }

        .greeting {
          font-family: 'Roboto', sans-serif;
          color: #1976d2;
          margin-bottom: 20px;
          font-size: 2rem;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }

        .card {
          background-color: white;
          padding: 30px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          border-radius: 15px;
          width: 80%;
          max-width: 600px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-width: 350px;
        }

        .webcam-container {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }

        .webcam-circle, .captured-image-circle {
          width: 300px;
          height: 300px;
          border-radius: 50%;
          border: 5px solid #1976d2;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .button-container {
          display: flex;
          gap: 20px;
          margin-top: 20px;
        }

        .capture-button, .retake-button, .auth-button {
          padding: 14px 35px;
          font-size: 16px;
          font-weight: bold;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          color: white;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background-color: #1976d2; /* Default blue */
        }

        .retake-button {
          background-color: #f57c00; /* Orange shade */
        }

        .auth-button {
          background-color: #4caf50; /* Green shade */
        }

        .auth-button:disabled {
          background-color: #b0bec5; /* Disabled button color */
          cursor: not-allowed;
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

        /* Media Queries for responsiveness */
        @media (max-width: 1024px) {
          .greeting {
            font-size: 1.75rem;
          }

          .card {
            width: 90%;
            padding: 25px;
          }

          .webcam-circle, .captured-image-circle {
            width: 250px;
            height: 250px;
          }

          .capture-button, .retake-button, .auth-button {
            padding: 12px 30px;
            font-size: 14px;
          }
        }

        @media (max-width: 768px) {
          .greeting {
            font-size: 1.5rem;
          }

          .card {
            width: 95%;
            padding: 20px;
          }

          .webcam-circle, .captured-image-circle {
            width: 220px;
            height: 220px;
          }

          .capture-button, .retake-button, .auth-button {
            padding: 11px 28px;
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .greeting {
            font-size: 1.25rem;
          }

          .card {
            width: 95%;
            max-width: 400px;
            padding: 15px;
          }

          .webcam-circle, .captured-image-circle {
            width: 180px;
            height: 180px;
          }

          .capture-button, .retake-button, .auth-button {
            padding: 9px 22px;
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default FacultyDashboard;
