import * as React from "react";
// import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
// import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import CardImage from "../../assests/admin/YearCard.png";
import YearCard from "../../components/BasicCard";
import Button from "@mui/material/Button"


/*
TODO
* place all cards in exacr center and place the one by one in down in mobile devices 
* style cards 
* show past classes 

*/

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
//   ...theme.applyStyles("dark", {
//     backgroundColor: "#1A2027",
//   }),
// }));

export default function TodayClasses() {
  return (
    <Box
      sx={{
        width: "100%",
        height:"100%",
        display: "flex",
        flexGrow:1,
        alignItems: "center",
        justifyContent: "center", // Center horizontally
        flexWrap: "wrap",
      }}
    >
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }} // Center within Grid
      >
        <Grid size={6}>
          <YearCard image={CardImage} title={"E1"} url={'/admin/todayclasses/e1'}></YearCard>
        </Grid>
        <Grid size={6}>
          <YearCard image={CardImage} title={"E2"} url={'/admin/todayclasses/e2'}></YearCard>
        </Grid>
        <Grid size={6}>
          <YearCard image={CardImage} title={"E3"} url={'/admin/todayclasses/e3'}></YearCard>
        </Grid>
        <Grid size={6}>
          <YearCard image={CardImage} title={"E4"} url={'/admin/todayclasses/e4'}></YearCard>
          <Button variant="contained"  size='small'>
                Search
              </Button>
        </Grid>
      </Grid>
    </Box>
  );
}