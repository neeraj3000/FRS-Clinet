import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const SubjectCard = ({
  subject,
  total,
  present,
  absent,
  smallScreenStyles = {}, // Styles for small screens
  largeScreenStyles = {}, // Styles for large screens
}) => {
  const percentage = Math.round((present / total) * 100); // Attendance percentage

  // Dynamic color based on percentage
  const getColor = (percentage) => {
    // if (percentage > 90) return "#6a0dad"; // Purple
    if (percentage >= 75) return '#1a237e';     //"#32CD32"; // Green
    if (percentage >= 70) return '#2196f3';//"#FFD700"; // Dark Yellow
    return "#ff2624"; // Red
  };

  // Determine screen size (responsive logic)
  const isSmallScreen = window.innerWidth <= 768; // Adjust breakpoint as needed

  // Merge default styles with responsive styles
  const mergedStyles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "rgba(255, 255, 255, 0.5)", // Light background
      padding: isSmallScreen ? "8px" : "20px",
      borderRadius: "10px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      marginBottom: "0px",
      transition: "transform 0.2s ease, background-color 0.3s ease",
      cursor: "pointer", // Change cursor to pointer
      "&:hover": {
        backgroundColor: "#e3f2fd", // Light blue on hover
        transform: "scale(1.05)", // Slight zoom on hover
      },
      ...(isSmallScreen ? smallScreenStyles.container : largeScreenStyles.container),
    },
    subjectTitle: {
      fontSize: isSmallScreen ? "1rem" : "1.5rem",
      fontWeight: "600",
      marginBottom: "12px",
      color: "#333",
      textAlign: "center",
      ...(isSmallScreen ? smallScreenStyles.subjectTitle : largeScreenStyles.subjectTitle),
    },
    tableCell: {
      padding: "0px 0",
      fontWeight: "600",
      fontSize: isSmallScreen ? "0.8rem" : "1.2rem",
      color: "#555",
      textAlign: "right",
      ...(isSmallScreen ? smallScreenStyles.tableCell : largeScreenStyles.tableCell),
    },
    progressContainer: {
      width: isSmallScreen
        ? smallScreenStyles.progressSize || "40px"
        : largeScreenStyles.progressSize || "110px",
    },
    progressTextSize: isSmallScreen
      ? smallScreenStyles.progressTextSize || "32px"
      : largeScreenStyles.progressTextSize || "18px",
  };

  return (
    <div style={mergedStyles.container}>
      {/* Left Section: Subject Details */}
      <div style={{ flex: 1, paddingRight: isSmallScreen ? "8px" : "16px" }}>
        
        {/* <h3 style={mergedStyles.subjectTitle}>{subject}</h3> */}
        <h3 style={{ ...mergedStyles.subjectTitle, color: '#1a237e' }}>{subject}</h3>

        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td style={{ ...mergedStyles.tableCell, textAlign: "left" }}>
                Attended:
              </td>
              <td style={{ ...mergedStyles.tableCell, color: "#4caf50" }}>
                {present}/{total}
              </td>
            </tr>
            <tr>
              <td style={{ ...mergedStyles.tableCell, textAlign: "left" }}>
                Absent:
              </td>
              <td style={{ ...mergedStyles.tableCell, color: "#f44336" }}>
                {absent}/{total}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Right Section: Circular Progress Bar */}
      <div style={mergedStyles.progressContainer}>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          strokeWidth={12}
          styles={buildStyles({
            textColor: "#000", // Center percentage color
            pathColor: getColor(percentage), // Dynamic color
            trailColor: "#ddd", // Light gray trail
            textSize: mergedStyles.progressTextSize, // Responsive center text size
            strokeLinecap: "round", // Rounded edges for progress
          })}
        />
      </div>
    </div>
  );
};

export default SubjectCard;
