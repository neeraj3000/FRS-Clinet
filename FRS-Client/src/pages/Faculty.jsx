import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  AppBar,
  Toolbar,
  Slide,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Faculty.css';
import logo from '../Images/logo.jpeg';

const Faculty = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [year, setYear] = useState(location.state?.year || '');
  const [branch, setBranch] = useState(location.state?.branch || '');
  const [section, setSection] = useState(location.state?.section || '');
  const [subject, setSubject] = useState(location.state?.subject || '');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const rowsPerPage = 5;
  const totalClasses = 30;

  // Sample student data
  const students = [
    { id: 'S001', name: 'Alice Johnson', classesAttended: 28 },
    { id: 'S002', name: 'Bob Smith', classesAttended: 25 },
    { id: 'S003', name: 'Charlie Brown', classesAttended: 29 },
    { id: 'S004', name: 'David Wilson', classesAttended: 30 },
    { id: 'S005', name: 'Eva Green', classesAttended: 20 },
    { id: 'S006', name: 'Frank Black', classesAttended: 22 },
  ];

  useEffect(() => {
    if (year && branch && section && subject) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [year, branch, section, subject]);

  const handleMarkAttendance = () => {
    navigate('/capture', { state: { year, branch, section, subject } });
  };

  const handleViewAttendance = () => {
    setOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Filter students based on search query
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      {/* Header with centered title */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Face Recognition System
          </Typography>
        </Toolbar>
      </AppBar>

      <Box className="faculty-container">
        <Paper elevation={3} className="faculty-paper" style={{ backgroundColor: '#BBDEFB' }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Faculty Attendance Management
          </Typography>

          {/* Dropdowns for Year, Branch, Section, Subject */}
          <Box className="dropdown-container">
            {/* Year Dropdown */}
            <FormControl>
              <Typography variant="h6">
                Year <span className="required">*</span>
              </Typography>
              <Select value={year} onChange={(e) => setYear(e.target.value)} displayEmpty>
                <MenuItem value="" disabled>
                  Select Year
                </MenuItem>
                {['P1', 'P2', 'E1', 'E2', 'E3', 'E4'].map((yr) => (
                  <MenuItem key={yr} value={yr}>
                    {yr}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Branch Dropdown */}
            <FormControl>
              <Typography variant="h6">
                Branch <span className="required">*</span>
              </Typography>
              <Select value={branch} onChange={(e) => setBranch(e.target.value)} displayEmpty>
                <MenuItem value="" disabled>
                  Select Branch
                </MenuItem>
                {['CSE', 'ECE', 'EEE', 'MECH', 'CHE', 'CIVIL', 'MME'].map((br) => (
                  <MenuItem key={br} value={br}>
                    {br}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Section Dropdown */}
            <FormControl>
              <Typography variant="h6">
                Section <span className="required">*</span>
              </Typography>
              <Select value={section} onChange={(e) => setSection(e.target.value)} displayEmpty>
                <MenuItem value="" disabled>
                  Select Section
                </MenuItem>
                {['A', 'B', 'C', 'D', 'E'].map((sec) => (
                  <MenuItem key={sec} value={sec}>
                    {sec}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Subject Dropdown */}
            <FormControl>
              <Typography variant="h6">
                Subject <span className="required">*</span>
              </Typography>
              <Select value={subject} onChange={(e) => setSubject(e.target.value)} displayEmpty>
                <MenuItem value="" disabled>
                  Select Subject
                </MenuItem>
                {['Math', 'Physics', 'Chemistry', 'Biology'].map((sub) => (
                  <MenuItem key={sub} value={sub}>
                    {sub}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Fixed Box for Logo and Selected Information */}
          <Box className="fixed-box">
            {isButtonEnabled ? (
              <Box>
                <Typography variant="h6">Selected Information:</Typography>
                <Typography>Year: {year}</Typography>
                <Typography>Branch: {branch}</Typography>
                <Typography>Section: {section}</Typography>
                <Typography>Subject: {subject}</Typography>
              </Box>
            ) : (
              <img src={logo} alt="Placeholder" className="placeholder-image" />
            )}
          </Box>

          {/* Action Buttons */}
          <Box className="button-container">
            <Button variant="contained" color="primary" onClick={handleMarkAttendance} disabled={!isButtonEnabled}>
              Mark Attendance
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleViewAttendance} disabled={!isButtonEnabled}>
              View Attendance
            </Button>
          </Box>

          {/* Modal for Attendance Data */}
          <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
            <DialogTitle>Attendance Data</DialogTitle>
            <DialogContent>
              {/* Display Total Classes */}
              <Typography variant="h6" gutterBottom>
                Total Number of Classes: {totalClasses}
              </Typography>

              {/* Smooth Transition Search Bar */}
              <Slide direction="down" in mountOnEnter unmountOnExit>
                <TextField
                  variant="outlined"
                  label="Search Student"
                  fullWidth
                  onChange={(e) => setSearchQuery(e.target.value)}
                  margin="normal"
                />
              </Slide>

              {/* Student Table */}
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Classes Attended</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredStudents
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>{student.id}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.classesAttended}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Pagination Controls */}
              <TablePagination
                component="div"
                count={filteredStudents.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[]}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Box>
    </Box>
  );
};

export default Faculty;
