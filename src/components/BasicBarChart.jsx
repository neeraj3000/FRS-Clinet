import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const chartSetting = {
  yAxis: [
    {
      label: '#students',
    },
  ],
};

export default function BasicBars({ xAxisData, seriesData, width = 500, height = 300 }) {
  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: xAxisData }]}  // dynamic x-axis data
      series={seriesData}  // dynamic series data
      width={width}
      height={height}
      {...chartSetting}
    />
  );
}
