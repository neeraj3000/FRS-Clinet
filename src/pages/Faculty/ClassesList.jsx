import * as React from "react";
import { Box, Typography, TextField } from "@mui/material";
import { useState } from "react";
import ClassList from "./FclassList";

const ManageClasses = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          mb: { xs: 2, sm: 3 },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          fontWeight="bold"
          color="#1a237e"
        >
          Today's Classes
        </Typography>

        <TextField
          type="date"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            console.log(e.target.value);
          }}
          sx={{
            width: { xs: '100%', sm: 200 },
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: 'white',
            },
          }}
          InputLabelProps={{ shrink: true }}
          label="Select Date"
        />
      </Box>

      {/* Render ClassList for the selected date */}
      <ClassList year="e1" date={selectedDate} />
    </Box>
  );
};

export default ManageClasses;