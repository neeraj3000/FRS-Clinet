import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
} from '@mui/material';
import { authtoken } from '../../GetAuthToken';

const SECTIONS = ["A", "B", "C", "D", "E"];

const FacultyAssignmentForm = ({ year }) => {
  const [assignments, setAssignments] = useState({});
  const [facultyList, setFacultyList] = useState([]);
  const [subjectMapping, setSubjectMapping] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Fetch the subjects for the given year from the API
    const fetchSubjects = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/admin/get-subjects',{
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authtoken}`
          },
        });
        const data = await response.json();
        setSubjectMapping(data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();
  }, [year]);

  useEffect(() => {
    // Fetch faculty emails from the API
    const fetchFacultyEmails = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/admin/get-faculty-emails',{
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authtoken}`
          }
        });
        const data = await response.json();
        if (data.status_code === 200) {
          setFacultyList(data.faculty_data);
        }
      } catch (error) {
        console.error('Error fetching faculty emails:', error);
      }
    };

    fetchFacultyEmails();
  }, []);

  useEffect(() => {
    // Initialize assignments when subjects are fetched
    const subjects = subjectMapping[year] || [];
    const initialAssignments = {};
    subjects.forEach(subject => {
      initialAssignments[subject] = {};
      SECTIONS.forEach(section => {
        initialAssignments[subject][section] = "";
      });
    });
    setAssignments(initialAssignments);
  }, [year, subjectMapping]);

  useEffect(() => {
    const isValid = Object.values(assignments).every(subject =>
      Object.values(subject).every(faculty => faculty !== "")
    );
    setIsFormValid(isValid);
  }, [assignments]);

  const handleFacultyChange = (subject, section, faculty) => {
    setAssignments(prev => ({
      ...prev,
      [subject]: {
        ...prev[subject],
        [section]: faculty
      }
    }));
  };

  const formatDataForAPI = () => {
    const formattedData = {
      year,
      assignments: []
    };

    Object.entries(assignments).forEach(([subname, sections]) => {
      const facultyAssignments = {};
      Object.entries(sections).forEach(([section, faculty]) => {
        if (!facultyAssignments[faculty]) {
          facultyAssignments[faculty] = [];
        }
        facultyAssignments[faculty].push(section);
      });

      const subjectData = {
        subname,
        data: Object.entries(facultyAssignments).map(([faculty_username, sec]) => ({
          faculty_username,
          sec
        }))
      };

      formattedData.assignments.push(subjectData);
    });

    return formattedData;
  };

  const handleSubmit = async () => {
    try {
      const formattedData = formatDataForAPI();
      const response = await fetch('http://127.0.0.1:8000/admin/update-timetable-for-faculty/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${authtoken}`
        },
        body: JSON.stringify(formattedData)
      });

      if (!response.ok) {
        throw new Error('Failed to update faculty assignments');
      }

      alert('Faculty assignments updated successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update faculty assignments');
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Faculty Assignment - {year}
      </Typography>
      
      {subjectMapping[year]?.map((subject) => (
        <Card key={subject} sx={{ mb: 2, '& .MuiCardContent-root': { p: 1.5 } }}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
              {subject}
            </Typography>
            <Grid container spacing={1}>
              {SECTIONS.map((section) => (
                <Grid item xs={12} sm={4} md={2.4} key={section}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Sec {section}</InputLabel>
                    <Select
                      value={assignments[subject]?.[section] || ""}
                      label={`Sec ${section}`}
                      onChange={(e) => handleFacultyChange(subject, section, e.target.value)}
                      sx={{ minHeight: '40px' }}
                    >
                      {facultyList.map((faculty) => (
                        <MenuItem key={faculty.email} value={faculty.email}>
                          {faculty.faculty_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      ))}

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          disabled={!isFormValid}
          onClick={handleSubmit}
          size="medium"
          sx={{ minWidth: '150px' }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default FacultyAssignmentForm;
