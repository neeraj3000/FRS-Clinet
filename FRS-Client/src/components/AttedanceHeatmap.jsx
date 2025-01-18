import React, { useState } from 'react';
import { Box, Paper, Typography, IconButton, Grid } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const MonthCalendar = ({ currentDate, attendanceData }) => {
  const getMonthData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return { startingDay: firstDay.getDay(), totalDays: lastDay.getDate() };
  };

  const getAttendanceColor = (date) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    const attendance = attendanceData[dateStr];
    
    if (!attendance) return '#f5f5f5';
    if (attendance === 'present') return 'rgba(26, 35, 126, 0.7)'; // Darker green
    if (attendance === 'absent') return 'rgba(255, 38, 36, 0.6)'; // Darker red
    return 'rgba(255,255,255, 1)'; // Darker yellow
  };

  const { startingDay, totalDays } = getMonthData();
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const weeks = Math.ceil((startingDay + totalDays) / 7);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="subtitle2" sx={{ mb: 1, textAlign: 'center' }}>
        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
      </Typography>
      <Grid container spacing={0.5}>
        {days.map(day => (
          <Grid item xs={12/7} key={day}>
            <Typography variant="caption" sx={{ textAlign: 'center', display: 'block', color: '#666' }}>
              {day}
            </Typography>
          </Grid>
        ))}
        {Array.from({ length: weeks * 7 }).map((_, index) => {
          const day = index - startingDay + 1;
          const isValidDay = day > 0 && day <= totalDays;
          return (
            <Grid item xs={12/7} key={index}>
              <Box sx={{
                aspectRatio: '1',
                backgroundColor: isValidDay ? getAttendanceColor(day) : 'transparent',
                borderRadius: 0.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem', // Increased font size
                fontWeight: '500', // Slightly bold
              }}>
                {isValidDay && day}
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

const AttendanceCalendar = ({ attendanceData }) => {
  const [baseDate, setBaseDate] = useState(new Date());

  const handlePreviousMonths = () => {
    setBaseDate(new Date(baseDate.setMonth(baseDate.getMonth() - 3)));
  };

  const handleNextMonths = () => {
    setBaseDate(new Date(baseDate.setMonth(baseDate.getMonth() + 3)));
  };

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <IconButton onClick={handlePreviousMonths} size="small">
          <ChevronLeft />
        </IconButton>
        <Typography variant="h6" sx={{ color: "#1a237e", fontSize: "1.5rem", fontWeight: 600  }} >Attendance Calendar</Typography>
        <IconButton onClick={handleNextMonths} size="small">
          <ChevronRight />
        </IconButton>
      </Box>

      <Grid container spacing={2}>
        {[0, 1, 2].map(offset => (
          <Grid item xs={12} md={4} key={offset}>
            <MonthCalendar 
              currentDate={new Date(baseDate.getFullYear(), baseDate.getMonth() + offset)} 
              attendanceData={attendanceData}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'center' }}>
        {[
          { color: 'rgba(26, 35, 126, 0.7)', label: 'Present' },  // Darker green
          { color: 'rgba(255, 38, 36, 0.6)', label: 'Absent' },   // Darker red
          { color: 'rgb(238, 229, 229)', label: 'Partial/Late' }  // Darker yellow
        ].map(({ color, label }) => (
          <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, backgroundColor: color, borderRadius: 0.5 }} />
            <Typography variant="caption">{label}</Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default AttendanceCalendar;
