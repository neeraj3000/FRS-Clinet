import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useNavigate, useLocation } from "react-router-dom";

import { Typography, TextField } from "@mui/material";

import theme from "../../utils/Theme";
import ClassList from "./ClassList";

const periodToTime = {
  "p1": "8:30-9:30",
  "p2": "9:30-10:30",
  "p3": "10:40-11:40",
  "p4": "11:40-12:40",  
  "p5": "1:30-2:30",
  "p6": "2:30-3:30",
  "p7": "3:40-4:40",
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ManageClasses = () => {
  const navigate = useNavigate();
  const location = useLocation(); // To get the current URL path

  const years = [
    { year: "1st Year", value: "E1" },
    { year: "2nd Year", value: "E2" },
    { year: "3rd Year", value: "E3" },
    { year: "4th Year", value: "E4" },
  ];

  const [selectedDate, setSelectedDate] = React.useState(new Date().toISOString().split('T')[0]);

  // Parse the year from the URL (if any) or default to the first tab
  const getCurrentTabFromUrl = () => {
    const currentPath = location.pathname.split("/").pop();
    const yearIndex = years.findIndex((item) => item.value === currentPath);
    return yearIndex === -1 ? 0 : yearIndex; // Default to 0 if no match
  };

  const [value, setValue] = React.useState(getCurrentTabFromUrl());

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(`/admin/todayclasses/${years[newValue].value}`); // Update the URL based on the selected tab
  };

  // Automatically update the tab if the URL changes
  React.useEffect(() => {
    setValue(getCurrentTabFromUrl());
  }, [location.pathname]); // Update the active tab if the URL changes

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ 
        mb: { xs: 2, sm: 3 },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 1
      }}>
        <Typography 
          variant="h5"
          component="h1" 
          fontWeight="bold"
          color="#1a237e"
        >
          Scheduled Classes
        </Typography>

        <TextField
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          sx={{ 
            width: { xs: '100%', sm: 200 },
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: 'white'
            }
          }}
          InputLabelProps={{ shrink: true }}
          label="Select Date"
        />
      </ Box>
      <Box sx={{ backgroundColor: "#f5f5f5" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            ".MuiTabs-flexContainer": {
              borderBottom: "none", // Removed bottom border
            },
            backgroundColor: "#f5f5f5", // Set background color of the Tabs to a light color
          }}
        >
          {years.map((item, index) => {
            return (
              <Tab
                key={index}
                label={item.year} // Updated to display year name
                {...a11yProps(index)}
                sx={{
                  padding: "10px 20px",
                  borderRadius: "8px 8px 0 0", // Rounded corners on top to simulate tab shape
                  fontWeight: 600,
                  fontSize: "14px",
                  minWidth: "unset", // Remove default minimum width
                  margin: "0 4px", // Add space between tabs
                  transition: "background-color 0.3s, color 0.3s", // Smooth transition
                  "&.Mui-selected": {
                    backgroundColor: "#cfe2f3", // Light blue for active tab
                    color: theme.palette.primary.main, // Selected tab text color
                    boxShadow: "inset 0 -2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for active tab
                  },
                  "&:hover": {
                    backgroundColor: "#f0f0f0", // Hover effect
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "#cfe2f3", // Hover effect for active tab
                  },
                }}
              />
            );
          })}
        </Tabs>
      </Box>

      {years.map((item, index) => {
        return (
          <CustomTabPanel key={index} value={value} index={index}>
            <ClassList year={item.value}></ClassList>
          </CustomTabPanel>
        );
      })}
    </Box>
  );
};

export default ManageClasses;
