import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const AttendanceHeatmap = ({ startDate, endDate, values }) => {
  // Format the data for react-calendar-heatmap
  const heatmapData = Object.keys(values).map(date => ({
    date: date,    // The date should be in 'YYYY-MM-DD' format
    count: values[date], // The count of attendance or other metric
  }));

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <CalendarHeatmap
        startDate={new Date(startDate)}   // Start date of the heatmap
        endDate={new Date(endDate)}       // End date of the heatmap
        values={heatmapData}              // Data in format [{ date: 'YYYY-MM-DD', count: 1 }]
        classForValue={(value) => {
          if (!value) {
            return 'color-empty'; // Return empty class for missing values
          }
          return `color-scale-${Math.min(value.count, 4)}`; // Adjust for your legend or thresholds
        }}
        tooltipDataAttrs={(value) => {
          if (!value || !value.date) {
            return null;
          }
          return {
            'data-tip': `${value.date}: ${value.count || 0} attendance`,
          };
        }}
        showWeekdayLabels={true}
        gutterSize={5}
        horizontal={true} // For horizontal layout
      />
    </div>
  );
};

export default AttendanceHeatmap;
