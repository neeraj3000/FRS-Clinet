import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function BasicLineChart({ xAxisData, seriesData, xAxisScale, yAxisScale, width = 500, height = 300 }) {
  return (
    <LineChart
      xAxis={[
        {
          data: xAxisData,
          scale: xAxisScale,
          tickInterval :xAxisData
        },
      ]}
      yAxis={[
        {
          scale: yAxisScale,
          ticks:[0,1],
          tickInterval:(index,value)=>(value%5 === 0)
        }
      ]}
      series={[
        {
          data: seriesData,
          
        },
      ]}
      width={width}
      height={height}
    />
  );
}