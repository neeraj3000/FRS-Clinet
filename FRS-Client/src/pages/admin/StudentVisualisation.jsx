import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import DailyAttendanceAnalysis from "./DailyAttendanceAnalysis";
import WeeklyAttendanceAnalysis from "./WeeklyAttendanceAnalysis";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  // textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

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
      <Grid container spacing={2}>
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
                sx={{ width: "90%" }}
                size="small"
              />
              <Button variant="contained" onClick={handleSearch}>
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
          <Grid item xs={6}>
            <Item>
              {/* <DailyAttendanceAnalysis data={searchResult.dailyAttendance} /> */}
              <p>Searched</p>
            </Item>
          </Grid>
          {/* <Grid item xs={6}>
              <Item>
                <WeeklyAttendanceAnalysis data={searchResult.weeklyAttendance} />
              </Item>
            </Grid> */}
        </React.Fragment>
      )}
    </Box>
  );
}
