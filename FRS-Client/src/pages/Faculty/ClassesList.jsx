import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TablePagination,
  Grid,
} from '@mui/material';
import { AccessTime as TimeIcon, Group as GroupIcon } from '@mui/icons-material';

const ClassesList = () => {
  // Define the classes array directly inside the component
  const classes = [
    { time: '09:00 AM', subject: 'E2 Sec-A', students: 32, marked: false },
    { time: '10:30 AM', subject: 'E2 Sec-B', students: 32, marked: false },
    { time: '11:45 AM', subject: 'E1 Sec-E', students: 28, marked: false },
    { time: '02:00 PM', subject: 'E2 Sec-B', students: 35, marked: false },
    { time: '03:15 PM', subject: 'E3 Sec-A', students: 30, marked: false },
    { time: '04:30 PM', subject: 'E1 Sec-C', students: 25, marked: false },
    { time: '05:45 PM', subject: 'E1 Sec-F', students: 27, marked: false },
  ];

  const [open, setOpen] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const [pageClasses, setPageClasses] = useState(0);
  const [rowsPerPageClasses, setRowsPerPageClasses] = useState(5);
  const [pageAttendance, setPageAttendance] = useState(0);
  const [rowsPerPageAttendance, setRowsPerPageAttendance] = useState(5);

  const handleViewAttendance = (classData) => {
    const exampleAttendance = [
      { rollNo: 1, id: 'STU001', name: 'Alice', status: true },
      { rollNo: 2, id: 'STU002', name: 'Bob', status: false },
      { rollNo: 3, id: 'STU003', name: 'Charlie', status: true },
      { rollNo: 4, id: 'STU004', name: 'Daisy', status: true },
      { rollNo: 5, id: 'STU005', name: 'Eve', status: false },
      { rollNo: 6, id: 'STU006', name: 'Frank', status: true },
      { rollNo: 7, id: 'STU007', name: 'Grace', status: true },
      { rollNo: 8, id: 'STU008', name: 'Hank', status: false },
      { rollNo: 9, id: 'STU009', name: 'Ivy', status: true },
      { rollNo: 10, id: 'STU010', name: 'Jack', status: true },
    ];
    setAttendanceData(exampleAttendance);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // Pagination for "Today's Classes"
  const handleChangePageClasses = (event, newPage) => {
    setPageClasses(newPage);
  };

  const handleChangeRowsPerPageClasses = (event) => {
    setRowsPerPageClasses(parseInt(event.target.value, 10));
    setPageClasses(0);
  };

  const paginatedClasses = classes.slice(
    pageClasses * rowsPerPageClasses,
    pageClasses * rowsPerPageClasses + rowsPerPageClasses
  );

  // Pagination for "View Attendance"
  const handleChangePageAttendance = (event, newPage) => {
    setPageAttendance(newPage);
  };

  const handleChangeRowsPerPageAttendance = (event) => {
    setRowsPerPageAttendance(parseInt(event.target.value, 10));
    setPageAttendance(0);
  };

  const paginatedAttendanceData = attendanceData.slice(
    pageAttendance * rowsPerPageAttendance,
    pageAttendance * rowsPerPageAttendance + rowsPerPageAttendance
  );

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Today's Classes
      </Typography>

      {/* "Today's Classes" List */}
      {paginatedClasses.map((classItem, index) => (
        <Paper
          key={index}
          sx={{
            p: 2,
            mb: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          elevation={1}
        >
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TimeIcon sx={{ mr: 1, fontSize: 'small' }} />
              <Typography variant="body2" color="textSecondary">
                {classItem.time}
              </Typography>
            </Box>
            <Typography variant="h6">{classItem.subject}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <GroupIcon sx={{ mr: 1, fontSize: 'small' }} />
              <Typography variant="body2" color="textSecondary">
                {classItem.students} Students
              </Typography>
            </Box>
          </Box>
          <Box>
            <Grid container spacing={2} direction={{ xs: 'column', sm: 'row' }}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ textTransform: 'none' }}
                >
                  Mark Attendance
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ textTransform: 'none' }}
                  onClick={() => handleViewAttendance(classItem)}
                >
                  View Attendance
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      ))}

      {/* Pagination for "Today's Classes" */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={classes.length}
        rowsPerPage={rowsPerPageClasses}
        page={pageClasses}
        onPageChange={handleChangePageClasses}
        onRowsPerPageChange={handleChangeRowsPerPageClasses}
      />

      {/* "View Attendance" Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Attendance Details</DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Roll No</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedAttendanceData.map((student, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{student.rollNo}</TableCell>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>
                      {student.status ? 'Present' : 'Absent'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={attendanceData.length}
            rowsPerPage={rowsPerPageAttendance}
            page={pageAttendance}
            onPageChange={handleChangePageAttendance}
            onRowsPerPageChange={handleChangeRowsPerPageAttendance}
          />
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ClassesList;
