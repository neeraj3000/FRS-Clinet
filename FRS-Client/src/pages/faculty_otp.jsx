import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FacultyOTPAuth = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [step, setStep] = useState(1); // Step 1: Email input, Step 2: OTP input
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  const FACULTY_DASHBOARD_PATH = "/faculty-dashboard";

  // Function to handle email submission
  const handleSendOtp = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    const mockOtp = Math.floor(1000 + Math.random() * 9000); // Generate 4-digit OTP
    setGeneratedOtp(mockOtp);
    console.log("Generated OTP:", mockOtp); // Debugging purposes
    setErrorMessage("");
    setSuccessMessage("OTP has been sent to your registered email!");
    setStep(2); // Proceed to OTP verification step
    setTimer(30); // Set countdown timer for 30 seconds
  };

  // Function to handle OTP verification
  const handleVerifyOtp = () => {
    if (otp === generatedOtp?.toString()) {
      setErrorMessage("");
      setSuccessMessage("Authentication successful!");
      setTimeout(() => navigate(FACULTY_DASHBOARD_PATH), 1500); // Delay navigation for animation
    } else {
      setErrorMessage("Invalid OTP. Please try again.");
    }
  };

  // Countdown timer for OTP
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  return (
    <div className="auth-container">
      <div className={`auth-card step-${step}`}>
        <h1>Faculty Authentication</h1>
        {step === 1 && (
          <div className="step-1">
            <p>Enter your registered email to receive an OTP.</p>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
            />
            <button onClick={handleSendOtp} className="auth-button">
              Send OTP
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="step-2">
            <p>Enter the OTP sent to your email.</p>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/, ""))}
              className="auth-input"
            />
            <button onClick={handleVerifyOtp} className="auth-button">
              Verify OTP
            </button>
            {timer > 0 ? (
              <p className="timer">Resend OTP in {timer} seconds</p>
            ) : (
              <button onClick={handleSendOtp} className="resend-button">
                Resend OTP
              </button>
            )}
          </div>
        )}

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>

      <style jsx>{`
        .auth-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #1976d2, #4caf50);
          font-family: "Roboto", sans-serif;
          padding: 20px;
        }

        .auth-card {
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
          text-align: center;
          animation: fadeIn 0.8s ease;
          max-width: 400px;
          width: 100%;
        }

        h1 {
          margin-bottom: 20px;
          color: #1976d2;
          font-size: 24px;
        }

        p {
          margin-bottom: 15px;
          color: #555;
        }

        .auth-input {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
        }

        .auth-button,
        .resend-button {
          background-color: #1976d2;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s ease;
        }

        .auth-button:hover,
        .resend-button:hover {
          background-color: #135ba1;
        }

        .timer {
          color: #555;
          margin-top: 10px;
          font-size: 14px;
        }

        .error-message {
          color: red;
          margin-top: 10px;
          font-size: 14px;
        }

        .success-message {
          color: green;
          margin-top: 10px;
          font-size: 14px;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default FacultyOTPAuth;
