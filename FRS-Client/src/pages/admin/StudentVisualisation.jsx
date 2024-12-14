import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import DailyAttendanceAnalysis from "./DailyAttendanceAnalysis";
import WeeklyAttendanceAnalysis from "./WeeklyAttendanceAnalysis";
import StudentProfile from './StudentProfile'
import StudentAttedanceHeatmap from './StudentAttendanceHeatmap'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode.secondary ,
  padding: theme.spacing(0.5),
  color: theme.palette.text.secondary,
  width: 'fit-content',
  // border: '1px solid gray', // Thin neon border
  borderRadius: '8px', // Optional smooth corners
  // boxShadow: '0 0 5px gray', // Subtle neon glow effect
  // transition: 'box-shadow 0.3s ease-in-out',
  // '&:hover': {
  //   boxShadow: '0 0 10px gray', // Slightly stronger glow on hover
  // },
}));


const studentData = {
  fullName: "John Doe",
  studentId: "123456",
  profilePicture: "https://example.com/profile.jpg",
  classGrade: "10th Grade",
  section: "A",
  enrollmentDate: "2021-09-01",
  contactInfo: {
    email: "john.doe@example.com",
    phone: "+1234567890"
  }
};

export default function StudentVisualisation() {
  const [searchValue, setSearchValue] = React.useState("");
  const [searchResult, setSearchResult] = React.useState(null);

  const handleSearch = async () => {
    try {
      // const response = await fetch(`https://your-backend-url.com/search`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ searchValue }),
      // });

      // const data = await response.json();
      setSearchResult([1, 2, 3]);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Item>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                height: "40%",
              }}
            >
              <TextField
                label="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                sx={{ width: "90%",margin:'5px' }}
                size="small"
              />
              <Button variant="contained" onClick={handleSearch} size='small'
              sx={{height:'40px'}}
              >
                Search
              </Button>
            </Box>
          </Item>
        </Grid>
        {!searchResult && (
          <React.Fragment>
            <Grid item xs={6}>
              <Item>
                <DailyAttendanceAnalysis></DailyAttendanceAnalysis>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <WeeklyAttendanceAnalysis></WeeklyAttendanceAnalysis>
              </Item>
            </Grid>
          </React.Fragment>
        )}
      </Grid>
      {searchResult && (
        <React.Fragment>
          <Grid container spacing={2}>

          <Grid item xs={6}>
              <StudentProfile {...studentData} />
          </Grid>
          <Grid item xs={6}>
              <Item>
              <WeeklyAttendanceAnalysis></WeeklyAttendanceAnalysis>
              </Item>
          </Grid>
          </Grid>
          <Grid container spacing={1}>
            <StudentAttedanceHeatmap></StudentAttedanceHeatmap>
          </Grid> 
        </React.Fragment>
      )}
    </Box>
  );
}
