// src/App.js
import React from 'react';
import AttendanceHeatmap from '../../components/CalendarHeatmap';

const App = () => {
  const attendanceData = {
      '2024-12-01': 5,
      '2024-12-02': 10,
      '2024-12-03': 15,
      // Add more dates with attendance counts
  };

  const startDate = '2024-12-01'; // Set your desired start date
  const endDate = '2025-01-01'; // Set your desired end date

  return (
      <div>
          <h1>Attendance Tracker</h1>
          <AttendanceHeatmap 
              startDate={startDate} 
              endDate={endDate} 
              values={attendanceData} 
          />
      </div>
  );
};

export default App;