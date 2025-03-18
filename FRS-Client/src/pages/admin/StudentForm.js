import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  InputAdornment,
  IconButton,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
  Stack,
  Alert,
  styled,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge";
import VideocamIcon from "@mui/icons-material/Videocam";

// Styled components for enhanced UI
const StyledFormCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 850,
  margin: "0 auto",
  marginTop: theme.spacing(4),
  borderRadius: "16px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  background: "linear-gradient(to right bottom, #ffffff, #f9f9ff)",
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  marginBottom: theme.spacing(0.5),
  fontSize: "0.9rem",
  color: theme.palette.text.secondary,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
}));

const StudentForm = () => {
  const [formData, setFormData] = useState({
    studentIdSuffix: "",
    batch: "",
    name: "",
    branch: "",
    section: "",
    year: "",
    gender: "",
    phone_number: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDataRetrieved, setIsDataRetrieved] = useState(false);
  const navigate = useNavigate();

  const batchOptions = ["R19", "R20", "R21", "R22"];

  const handleBatchChange = (e) => {
    const selectedBatch = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      batch: selectedBatch,
      studentIdSuffix: "",
    }));
    setIsDataRetrieved(false);
  };

  const handleStudentIdSuffixChange = async (e) => {
    const suffix = e.target.value;
    const fullStudentId = formData.batch + suffix;

    setFormData((prevData) => ({
      ...prevData,
      studentIdSuffix: suffix,
    }));

    if (suffix.length === 4 && formData.batch) {
      setIsLoading(true);
      try {
        const response = await axios.post("http://127.0.0.1:8000/admin/student-details", { id_number: fullStudentId });
        const data = response.data;

        if (data.error) {
          setErrorMessage(data.error);
          setFormData((prevData) => ({
            ...prevData,
            name: "",
            branch: "",
            section: "",
            year: "",
            gender: "",
            phone_number: "",
          }));
          setIsDataRetrieved(false);
        } else {
          setFormData((prevData) => ({
            ...prevData,
            name: data.name,
            branch: data.branch,
            section: data.section,
            year: data.year,
            gender: data.gender,
            phone_number: data.phone_number,
          }));
          setErrorMessage("");
          setIsDataRetrieved(true);
        }
      } catch (error) {
        setErrorMessage("Error retrieving student details. Please try again.");
        setFormData((prevData) => ({
          ...prevData,
          name: "",
          branch: "",
          section: "",
          year: "",
          gender: "",
          phone_number: "",
        }));
        setIsDataRetrieved(false);
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrorMessage("");
      setFormData((prevData) => ({
        ...prevData,
        name: "",
        branch: "",
        section: "",
        year: "",
        gender: "",
        phone_number: "",
      }));
      setIsDataRetrieved(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.batch || !formData.studentIdSuffix || formData.studentIdSuffix.length < 4) {
      setErrorMessage("Please fill in all required fields and ensure the Student ID has 4 digits.");
      return;
    }

    if (!formData.name || !formData.branch || !formData.section) {
      setErrorMessage("Please retrieve student details before submitting.");
      return;
    }

    const submissionData = {
      id_number: formData.batch + formData.studentIdSuffix,
    };
    
    console.log(submissionData);
    navigate(`/admin/webcam-capture?id=${submissionData.id_number}`, { state: { formData: submissionData } });
  };

  return (
    <StyledFormCard elevation={4}>
      {/* Header with back button */}
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton 
          onClick={() => navigate("/admin/dashboard")}
          sx={{ 
            backgroundColor: "rgba(0,0,0,0.04)", 
            "&:hover": { backgroundColor: "rgba(0,0,0,0.08)" } 
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography 
          variant="h4" 
          sx={{ 
            flexGrow: 1, 
            textAlign: "center", 
            fontWeight: 600,
            backgroundImage: "linear-gradient(45deg, #3f51b5, #2196f3)",
            backgroundClip: "text",
            textFillColor: "transparent",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Student Registration
        </Typography>
      </Box>

      <form onSubmit={handleSubmit} noValidate>
        <Card variant="outlined" sx={{ mb: 3, borderRadius: "12px" }}>
          <CardContent>
            <SectionTitle variant="h6">
              <BadgeIcon color="primary" /> Student Identification
            </SectionTitle>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <FieldLabel>Batch</FieldLabel>
                <FormControl fullWidth variant="outlined" size="small">
                  <Select
                    name="batch"
                    value={formData.batch}
                    onChange={handleBatchChange}
                    displayEmpty
                    required
                  >
                    <MenuItem value="" disabled>Select Batch</MenuItem>
                    {batchOptions.map((batch) => (
                      <MenuItem key={batch} value={batch}>{batch}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={8}>
                <FieldLabel>Student ID</FieldLabel>
                <TextField
                  fullWidth
                  placeholder="Enter last 4 digits"
                  variant="outlined"
                  size="small"
                  value={formData.studentIdSuffix}
                  onChange={handleStudentIdSuffixChange}
                  required
                  disabled={!formData.batch || isLoading}
                  InputProps={{
                    startAdornment: formData.batch && (
                      <InputAdornment position="start">
                        <Chip label={formData.batch} size="small" color="primary" variant="outlined" />
                      </InputAdornment>
                    ),
                    inputProps: { maxLength: 4 },
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Student Information Section */}
        <Card 
          variant="outlined" 
          sx={{ 
            mb: 3, 
            borderRadius: "12px",
            backgroundColor: isDataRetrieved ? "rgba(232, 245, 253, 0.5)" : "inherit",
            transition: "all 0.3s ease"
          }}
        >
          <CardContent>
            <SectionTitle variant="h6">
              <PersonIcon color="primary" /> Student Information
            </SectionTitle>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FieldLabel>Full Name</FieldLabel>
                <TextField 
                  fullWidth 
                  placeholder="Student name will appear here"
                  value={formData.name} 
                  InputProps={{ readOnly: true }} 
                  variant="outlined"
                  size="small"
                />
              </Grid>
              
              <Grid item xs={12} md={3}>
                <FieldLabel>Branch</FieldLabel>
                <TextField 
                  fullWidth 
                  placeholder="Branch"
                  value={formData.branch} 
                  InputProps={{ readOnly: true }} 
                  variant="outlined"
                  size="small"
                />
              </Grid>
              
              <Grid item xs={12} md={3}>
                <FieldLabel>Section</FieldLabel>
                <TextField 
                  fullWidth 
                  placeholder="Section"
                  value={formData.section} 
                  InputProps={{ readOnly: true }} 
                  variant="outlined"
                  size="small"
                />
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 2, opacity: 0.6 }} />
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <FieldLabel>Academic Year</FieldLabel>
                <TextField 
                  fullWidth 
                  placeholder="Year"
                  value={formData.year} 
                  InputProps={{ readOnly: true }} 
                  variant="outlined"
                  size="small"
                />
              </Grid>
              
              <Grid item xs={12} md={4}>
                <FieldLabel>Gender</FieldLabel>
                <TextField 
                  fullWidth 
                  placeholder="Gender"
                  value={formData.gender} 
                  InputProps={{ readOnly: true }} 
                  variant="outlined"
                  size="small"
                />
              </Grid>
              
              <Grid item xs={12} md={4}>
                <FieldLabel>Contact Number</FieldLabel>
                <TextField 
                  fullWidth 
                  placeholder="Phone number"
                  value={formData.phone_number} 
                  InputProps={{ 
                    readOnly: true,
                    startAdornment: formData.phone_number && (
                      <InputAdornment position="start">
                        <PhoneIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  }} 
                  variant="outlined"
                  size="small"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Error message area */}
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: "8px" }}>
            {errorMessage}
          </Alert>
        )}

        {/* Submit button area */}
        <Box textAlign="center" mt={4}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={!isDataRetrieved}
            startIcon={<VideocamIcon />}
            sx={{ 
              minWidth: "250px", 
              borderRadius: "30px", 
              padding: "12px 24px",
              boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)",
              background: "linear-gradient(45deg, #3f51b5, #2196f3)",
              "&:hover": {
                background: "linear-gradient(45deg, #303f9f, #1e88e5)",
                boxShadow: "0 6px 14px rgba(33, 150, 243, 0.4)",
              }
            }}
          >
            Start Recording
          </Button>
        </Box>
      </form>
    </StyledFormCard>
  );
};

export default StudentForm;