import React, { useState } from "react";
import BasicTable from "../../components/BasicTable";
import { Typography, Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, Divider } from "@mui/material";

// Define the columns
const columns = [
  { field: "time", headerName: "Started Time", align: "left" },
  { field: "subject", headerName: "Subject", align: "right" },
  { field: "faculty_name", headerName: "Faculty Name", align: "right" },
  { field: "class_name", headerName: "Class Name", align: "right" },
  { field: "no_of_absents", headerName: "#Absents", align: "right" },
  { field: "no_of_students", headerName: "#Students", align: "right" },
];

// Define the rows with absentee names included
const rows = [
  {
    time: "09:00 AM",
    subject: "Mathematics",
    faculty_name: "Dr. John Doe",
    class_name: "MATH 101",
    no_of_absents: 2,
    no_of_students: 30,
    absentees: ["John Doe", "Jane Smith"],
  },
  {
    time: "11:00 AM",
    subject: "Physics",
    faculty_name: "Prof. Jane Smith",
    class_name: "PHY 202",
    no_of_absents: 5,
    no_of_students: 25,
    absentees: ["Tom Hanks", "Emma Watson", "Chris Hemsworth", "Mark Ruffalo", "Robert Downey Jr."],
  },
  {
    time: "01:00 PM",
    subject: "Chemistry",
    faculty_name: "Dr. Alan Brown",
    class_name: "CHEM 301",
    no_of_absents: 1,
    no_of_students: 28,
    absentees: ["Steve Rogers"],
  },
  // Add more rows as needed
];

export default function E1Classes() {
  const [open, setOpen] = useState(false); // State to control dialog visibility
  const [rowData, setRowData] = useState(null); // State to store clicked row data
  const [absentees, setAbsentees] = useState([]); // State to store absentee names

  // Handle row click
  const handleRowClick = (row) => {
    setRowData(row); // Store clicked row data
    setAbsentees(row.absentees); // Set absentee names from the clicked row
    setOpen(true); // Open the dialog to show details
  };

  // Handle dialog close
  const handleClose = () => {
    setOpen(false); // Close the dialog
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom align="center">
        E2 Class Details
      </Typography>
      <BasicTable
        columns={columns}
        rows={rows}
        onRowClick={handleRowClick} // Pass row click handler to BasicTable
      />

      {/* Dialog to show absentee names and more details */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Absentee Details</DialogTitle>
        <DialogContent>
          {rowData && (
            <div>
              {/* Class Information */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="textSecondary">
                    <strong>Class Name:</strong>
                  </Typography>
                  <Typography variant="h6">{rowData.class_name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="textSecondary">
                    <strong>Subject:</strong>
                  </Typography>
                  <Typography variant="h6">{rowData.subject}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="textSecondary">
                    <strong>Faculty Name:</strong>
                  </Typography>
                  <Typography variant="h6">{rowData.faculty_name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="textSecondary">
                    <strong>Started Time:</strong>
                  </Typography>
                  <Typography variant="h6">{rowData.time}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="textSecondary">
                    <strong>Total Students:</strong>
                  </Typography>
                  <Typography variant="h6">{rowData.no_of_students}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="textSecondary">
                    <strong>Absents:</strong>
                  </Typography>
                  <Typography variant="h6">{rowData.no_of_absents}</Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              {/* Absentees List */}
              <Typography variant="h6" gutterBottom>
                Absentees:
              </Typography>
              <ul>
                {absentees.map((name, index) => (
                  <li key={index}>
                    <Typography variant="body1">{name}</Typography>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
