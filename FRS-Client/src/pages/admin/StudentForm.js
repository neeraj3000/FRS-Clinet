import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  TextField,
  Paper,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
  Container,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const StudentForm = () => {
  const [formData, setFormData] = useState({
    id_number: "",
    batch: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    year: "",
    branch: "",
    section: "",
    email_address: "",
    phone_number: "",
    password: "",
    gender: "",
    semester: "",
    confirmPassword: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const batchOptions = ["R19", "R20", "R21", "R22"];
  const genderOptions = ["Male", "Female", "Other"];
  const branchOptions = ["CSE", "ECE", "EEE", "MECH", "CIVIL"];
  const sectionOptions = ["A", "B", "C", "D"];
  const semesterOptions = ["1", "2"];
  const yearOptions = ["E1", "E2", "E3", "E4", "P1", "P2"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requiredFields = [
      "id_number",
      "batch",
      "first_name",
      "last_name",
      "middle_name",
      "branch",
      "section",
      "gender",
      "phone_number",
      "email_address",
      "semester",
      "year",
      "password",
      "confirmPassword",
    ];
  
    const missingFields = requiredFields.filter((field) => !formData[field]);
  
    if (missingFields.length > 0) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }
  
    if (formData.id_number.length !== 7) {
      setErrorMessage("Student ID must be 7 digits.");
      return;
    }
  
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
  
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email_address)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
  
    // Simple phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone_number)) {
      setErrorMessage("Please enter a valid 10-digit phone number.");
      return;
    }
  
    // Convert form data to match backend enums
    const submissionData = {
      id_number: formData.id_number,
      first_name: formData.first_name,
      last_name: formData.last_name,
      middle_name: formData.middle_name || "", 
      year: formData.year.toUpperCase(),
      branch: formData.branch.toLowerCase(),
      section: formData.section.toUpperCase(),
      email_address: formData.email_address,
      phone_number: formData.phone_number,
      password: formData.password,
      gender: formData.gender.toLowerCase(),
      overall_attendance: 0,
      semester: formData.semester.toString(),
    };
  
    // Build query string from submission data
    const queryParams = new URLSearchParams();
    for (const [key, value] of Object.entries(submissionData)) {
      queryParams.append(key, value);
    }
    
    const apiUrl = `http://127.0.0.1:8000/admin/create-student?${queryParams.toString()}`;
    console.log("Submitting to URL:", apiUrl);
  
    try {
      const response = await fetch(apiUrl, {
        method: "POST", // Changed to GET since we're using query params
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      const data = await response.json();
    
      if (response.ok) {
        console.log("Student created successfully:", data);
        navigate(`/admin/webcam-capture?id=${submissionData.id_number}`, { state: { formData: submissionData } });
      } else {
        // Handle FastAPI validation errors properly
        if (Array.isArray(data.detail)) {
          // Extract only the messages
          const errorMessages = data.detail.map((error) => error.msg).join(", ");
          setErrorMessage(errorMessages);
        } else {
          setErrorMessage(data.detail || "Failed to create student.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Network error. Please try again.");
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#f5f5f5',
        py: 4
      }}
    >
      <Container maxWidth="xl">
        <Paper 
          elevation={4} 
          sx={{ 
            p: { xs: 2, sm: 4 },
            borderRadius: "16px",
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <Box display="flex" alignItems="center">
            <IconButton onClick={() => navigate("/")} sx={{ mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" sx={{ flexGrow: 1, textAlign: "center", fontWeight: 500 }}>
              Student Registration
            </Typography>
          </Box>

          <form onSubmit={handleSubmit} noValidate>
            <Box 
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2,
                mt: 2
              }}
            >
              <FormControl>
                <InputLabel>Batch *</InputLabel>
                <Select
                  name="batch"
                  value={formData.batch}
                  onChange={handleChange}
                  label="Batch"
                  required
                >
                  {batchOptions.map((batch) => (
                    <MenuItem key={batch} value={batch}>{batch}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Student ID"
                name="id_number"
                variant="outlined"
                value={formData.id_number}
                onChange={handleChange}
                required
                inputProps={{ maxLength: 7 }}
                helperText="Enter the last four digits"
              />
              <TextField 
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                variant="outlined" 
              />
              <TextField 
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                variant="outlined" 
              />

              <TextField 
                label="Middle Name"
                name="middle_name"
                value={formData.middle_name}
                onChange={handleChange}
                variant="outlined" 
                helperText="Optional"
              />

              <FormControl>
                <InputLabel>Gender *</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  label="Gender"
                  required
                >
                  {genderOptions.map((gender) => (
                    <MenuItem key={gender} value={gender}>{gender}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel>Branch *</InputLabel>
                <Select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  label="Branch"
                  required
                >
                  {branchOptions.map((branch) => (
                    <MenuItem key={branch} value={branch}>{branch}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel>Section *</InputLabel>
                <Select
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  label="Section"
                  required
                >
                  {sectionOptions.map((section) => (
                    <MenuItem key={section} value={section}>{section}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <TextField 
                label="Phone Number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
                variant="outlined"
                inputProps={{ maxLength: 10 }}
                helperText="10-digit number without spaces or dashes" 
              />
              
              <TextField 
                label="Email Address"
                name="email_address"
                value={formData.email_address}
                onChange={handleChange}
                required
                variant="outlined"
                type="email" 
              />
              
              <FormControl>
                <InputLabel>Semester *</InputLabel>
                <Select
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  label="Semester"
                  required
                >
                  {semesterOptions.map((semester) => (
                    <MenuItem key={semester} value={semester}>{semester}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <FormControl>
                <InputLabel>Year *</InputLabel>
                <Select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  label="Year"
                  required
                >
                  {yearOptions.map((year) => (
                    <MenuItem key={year} value={year}>{year}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <TextField 
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                variant="outlined"
                type="password" 
              />
              
              <TextField 
                label="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                variant="outlined" 
                type="password"
              />
            </Box>

            {errorMessage && (
              <Typography color="error" variant="body2" sx={{ mt: 3, textAlign: "center" }}>
                {errorMessage}
              </Typography>
            )}

            <Box sx={{ mt: 4, mb: 2, textAlign: "center" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ 
                  minWidth: "200px", 
                  borderRadius: "8px", 
                  padding: "12px 24px",
                  fontSize: "1.1rem"
                }}
              >
                Start Recording
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default StudentForm;