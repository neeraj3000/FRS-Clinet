import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { PageContainer } from "@toolpad/core/PageContainer";
import Grid from "@mui/material/Grid2";

import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

// theme
import darkTheme from "../../utils/Theme"; // Import your theme

// table
import StudentAbsentiesTable from "./StudentAbsentiesTable";
import FacultyAbsentiesTable from "./FacultyAbsentTable";

// calender
// import Calender from './DashboardCalender'

const Skeleton = styled("div")(({ theme, height }) => ({
  // backgroundColor: theme.palette.action.hover, // Use theme from context
  borderRadius: theme.shape.borderRadius,
  height,
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: "gray",
  padding: "10px",
  content: '" "',
  padding: 0,
}));

export default function PageContainerBasic(props) {
  console.log("happy");
  console.log(darkTheme.palette.action.hover);
  return (
    <PageContainer>
      <Grid container spacing={1} sx={{ margin: "20px" }}>
        <Grid size={6}>
          {/* <Typography
          sx={{ flex: '1 1 100%',display:"flex",JustifyContent:'center',margin:'10px' }}
          variant="h2"
          component="div"
          >
          Absenties
        </Typography> */}
          <p class="admin-drawer-content-heading">Good Mornin Admin</p>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        {/* <Grid size={4}>
          <Typography variant="subtitle1" gutterBottom align="center">
            8:02:09 AM
          </Typography>
          <Typography variant="caption" gutterBottom align="center">
            Realtime Insight
          </Typography>
        </Grid> */}
        <Grid size={4}>
          {/* <Skeleton height={200}> */}

          <StudentAbsentiesTable></StudentAbsentiesTable>
          {/* </Skeleton> */}
        </Grid>

        <Grid size={4}>
          <FacultyAbsentiesTable></FacultyAbsentiesTable>
          {/* <Calender></Calender> */}
        </Grid>
        <Grid size={8}></Grid>
      </Grid>
    </PageContainer>
  );
}
