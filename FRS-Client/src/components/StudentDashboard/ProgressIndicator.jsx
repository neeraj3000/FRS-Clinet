import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressIndicator = ({ totalClasses, attendedClasses }) => {
  const percentage = Math.round((attendedClasses / totalClasses) * 100);

  const theme = useTheme(); // Access the Material-UI theme for breakpoints

  const getColor = (percentage) => {
    return percentage >= 75 ? "#1a237e" : "#f44336"; // Green if 75% or more, otherwise red
  };

  // Define sizes for the circle and padding based on screen size
  const size = {
    xs: 150, // Circle size for extra small screens
    sm: 220, // Circle size for small screens
    // md: 200, // Circle size for medium screens
  };

  const padding = {
    xs: 0, // Padding for extra small screens
    sm: 0, // Padding for small screens
    // md: 4, // Padding for medium screens
  };

  return (
    <Box
      textAlign="center"
      sx={{
        maxWidth: size, // Set maximum width based on size
        padding: padding, // Control padding dynamically
        backgroundColor : "rgba(142, 213, 241, 0.0)",
        margin: "0 auto",
        [theme.breakpoints.down("sm")]: {
          maxWidth: size.xs,
          padding: padding.xs,
        },
        [theme.breakpoints.up("sm")]: {
          maxWidth: size.sm,
          padding: padding.sm,
        },
        [theme.breakpoints.up("md")]: {
          maxWidth: size.md,
          padding: padding.md,
        },
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        fontWeight="bold"
        sx={{ fontSize: { xs: "0.8rem", sm: "1.35rem" } }}
      >
        Overall Attendance
      </Typography>

      <Box
        sx={{
          width: { xs: size.xs, sm: size.sm, md: size.md },
          height: { xs: size.xs, sm: size.sm, md: size.md },
          margin: "0 auto",
        }}
      >
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          strokeWidth={8}
          styles={buildStyles({
            textColor: "#000",
            pathColor: getColor(percentage),
            trailColor: "#ddd",
            textSize: "14px",
          })}
        />
      </Box>

      <Typography
        variant="subtitle2"
        sx={{
          fontSize: { xs: "0.8rem", sm: "1.2rem" },
          mt: { xs: 1, sm: 2 },
        }}
      >
        <b>Attended</b>: {attendedClasses} / {totalClasses}
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{
          fontSize: { xs: "0.8rem", sm: "1.2rem" },
          mt: { xs: 1, sm: 2 },
        }}
      >
          <b>Attended</b>: {totalClasses-attendedClasses} / {totalClasses}
      </Typography>
    </Box>
  );
};

export default ProgressIndicator;
