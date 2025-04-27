import React, { useState } from "react";

const AddStudent = () => {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [faceEmbedding, setFaceEmbedding] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const redirectToCamera = () => {
    // Replace with actual redirection logic to camera page
    alert("Redirecting to camera...");
    setTimeout(() => {
      const mockEmbedding = `embedding_${Math.random().toString(36).substring(2)}`;
      setFaceEmbedding(mockEmbedding);
      alert("Face embedding captured successfully!");
    }, 2000); // Simulate delay for capturing embedding
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!studentId || !password || !faceEmbedding) {
      alert("Please fill out all fields and capture face embedding!");
      return;
    }

    const newStudent = {
      studentId,
      password,
      faceEmbedding,
    };

    console.log("New Student Added:", newStudent);
    setSuccessMessage("Student added successfully!");
    setStudentId("");
    setPassword("");
    setFaceEmbedding(null);
  };

  return (
    <div className="add-student-container">
      <header className="header">
        <h1>User Management - Add Student</h1>
      </header>

      <form className="student-form" onSubmit={handleSubmit}>
        <h2>Student Information</h2>

        <div className="form-group">
          <label htmlFor="studentId">Student ID</label>
          <input
            type="text"
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter Student ID"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create Password"
          />
        </div>

        <div className="form-group">
          <label>Face Embedding</label>
          <button type="button" onClick={redirectToCamera} className="capture-button">
            Capture Face
          </button>
          {faceEmbedding && <p>Face Embedding Captured: {faceEmbedding}</p>}
        </div>

        <button type="submit" className="submit-button">
          Add Student
        </button>

        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>

      <style jsx>{`
        .add-student-container {
          font-family: "Roboto", sans-serif;
          padding: 20px;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(245, 245, 245, 0.9)),
            url("https://source.unsplash.com/1600x900/?technology,education");
          background-size: cover;
          background-attachment: fixed;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .header {
          background: #3f51b5;
          color: white;
          padding: 10px 20px;
          border-radius: 8px;
          text-align: center;
          margin-bottom: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .student-form {
          background: rgba(255, 255, 255, 0.9);
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
          max-width: 500px;
          width: 100%;
          margin: 0 auto;
          position: relative;
        }

        h2 {
          color: #3f51b5;
          margin-bottom: 20px;
          text-align: center;
        }

        .form-group {
          margin-bottom: 15px;
        }

        label {
          display: block;
          font-weight: bold;
          margin-bottom: 5px;
          color: #333;
        }

        input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 16px;
          background: #f9f9f9;
        }

        .capture-button {
          background-color: #3f51b5;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s ease;
        }

        .capture-button:hover {
          background-color: #303f9f;
        }

        .submit-button {
          background-color: #4caf50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          width: 100%;
          margin-top: 10px;
          transition: background-color 0.3s ease;
        }

        .submit-button:hover {
          background-color: #388e3c;
        }

        .success-message {
          color: green;
          margin-top: 15px;
          text-align: center;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default AddStudent;
