import React, { useState, useEffect, useMemo } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Select, MenuItem, Button, Box, Typography, useTheme, Snackbar, Alert,
} from '@mui/material';
import {headers} from "../../GetAuthToken"
const TimeTableManager = ({ year }) => {
  const theme = useTheme();
  const [timeTableData, setTimeTableData] = useState(null);
  const [modified, setModified] = useState(false);
  const [selectedYear, setSelectedYear] = useState(year);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Snackbar severity
  const [subjects, setSubjects] = useState([]);

  const subjectColors = useMemo(() => ({
    EP: '#FFB6C1',
    EVS: '#98FB98',
    DM: '#87CEEB',
    OOPS: '#DDA0DD',
    'OOPS LAB': '#F0E68C',
    'EP LAB': '#F08080',
    DS: '#E6E6FA',
    'DS LAB': '#FFA07A',
    MEFA: '#B0C4DE',
  }), []);

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const sections = ['A', 'B', 'C', 'D', 'E'];
  const periods = Array.from({ length: 7 }, (_, i) => `p${i + 1}`);

  useEffect(() => {
    fetchTimeTable();
    fetchSubjects();
  }, [selectedYear]);

  const fetchTimeTable = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/admin/timetable/${year}`,{headers});
      const data = await response.json();
      setTimeTableData(data);
    } catch (error) {
      console.error('Error fetching timetable:', error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/admin/get-subjects',{headers});
      const data = await response.json();
      
      // Get subjects for the selected year
      const yearKey = selectedYear;
      const yearSubjects = data[yearKey] || [];
      setSubjects(yearSubjects);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      setSnackbarMessage('Failed to fetch subjects');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSubjectChange = (day, section, period, newValue) => {
    setTimeTableData((prevData) => {
      const newData = { ...prevData };

      // Only update the specific part of the timetable
      if (newValue) {
        newData.timetable[day][section][newValue] = newData.timetable[day][section][newValue] || [];
        if (!newData.timetable[day][section][newValue].includes(period)) {
          newData.timetable[day][section][newValue].push(period);
        }
      } else {
        const currentSubject = getSubjectForPeriod(day, section, period);
        if (currentSubject) {
          newData.timetable[day][section][currentSubject] = newData.timetable[day][section][currentSubject].filter(p => p !== period);
          if (newData.timetable[day][section][currentSubject].length === 0) {
            delete newData.timetable[day][section][currentSubject];
          }
        }
      }

      setModified(true);
      return newData;
    });
  };

  const getSubjectForPeriod = (day, section, period) => {
    if (!timeTableData?.timetable?.[day]?.[section]) return '';
    for (const [subject, periods] of Object.entries(timeTableData.timetable[day][section])) {
      if (periods.includes(period)) return subject;
    }
    return '';
  };

  const handleUpdate = async () => {
    try {
      const requestBody = {
        year: selectedYear,
        timetable: timeTableData.timetable,
      };

      const response = await fetch(`http://127.0.0.1:8000/admin/timetable/`, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setModified(false);
        fetchTimeTable();
        setSnackbarMessage('Timetable updated successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage('Failed to update timetable');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error updating timetable:', error);
      setSnackbarMessage('An error occurred during the update');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const CustomSelect = React.memo(({ value, onChange, backgroundColor }) => (
    <Select
      value={value}
      onChange={onChange}
      size="small"
      fullWidth
      sx={{
        height: '35px',
        '& .MuiSelect-select': {
          padding: '4px 8px',
          backgroundColor: backgroundColor,
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: `1px solid ${theme.palette.grey[300]}`,
        },
      }}
    >
      <MenuItem value=""><em>None</em></MenuItem>
      {subjects.map((subject) => (
        <MenuItem
          key={subject}
          value={subject}
          sx={{
            backgroundColor: subjectColors[subject],
            '&:hover': { filter: 'brightness(95%)' },
          }}
        >
          {subject}
        </MenuItem>
      ))}
    </Select>
  ));

  if (!timeTableData) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Timetable Management - {selectedYear}
        </Typography>
        <Button
          variant="contained"
          onClick={handleUpdate}
          disabled={!modified}
        >
          Update Timetable
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: theme.shadows[2] }}>
        <Table size="small" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.grey[100] }}>
                Day
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.grey[100] }}>
                Section
              </TableCell>
              {periods.map((period) => (
                <TableCell
                  key={period}
                  align="center"
                  sx={{ fontWeight: 'bold', backgroundColor: theme.palette.grey[100] }}
                >
                  {period.toUpperCase()}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {days.map((day) => (
              <React.Fragment key={day}>
                {sections.map((section, index) => (
                  <TableRow key={`${day}-${section}`}>
                    {index === 0 && (
                      <TableCell
                        rowSpan={sections.length}
                        sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
                      >
                        {day}
                      </TableCell>
                    )}
                    <TableCell sx={{ fontWeight: 'bold' }}>{section}</TableCell>
                    {periods.map((period) => {
                      const currentSubject = getSubjectForPeriod(day, section, period);
                      return (
                        <TableCell key={period} sx={{ minWidth: '120px' }}>
                          <CustomSelect
                            value={currentSubject}
                            onChange={(e) => handleSubjectChange(day, section, period, e.target.value)}
                            backgroundColor={currentSubject ? subjectColors[currentSubject] : 'white'}
                          />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TimeTableManager;
