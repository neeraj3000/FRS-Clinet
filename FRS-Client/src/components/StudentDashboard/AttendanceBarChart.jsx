import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { Typography, Box, useMediaQuery } from "@mui/material";

const AttendanceBarChart = ({ subjects }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  // Check if valid data is passed
  if (!subjects || subjects.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        padding={0}
        sx={{
          background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
          borderRadius: 2,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography variant="h5" color="textSecondary">
          No data to display
        </Typography>
      </Box>
    );
  }

  const formattedData = subjects.map((subject) => ({
    name: subject.name,
    Attended: subject.attended,
    Total: subject.total,
  }));

  return (
    <Box
      sx={{
        padding: isMobile ? 0 : 2,
        background: "linear-gradient(135deg, #ffffff, #e3f2fd)",
        borderRadius: 2,
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Typography
        variant={isMobile ? "h6" : "h4"}
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#1a237e",
          marginBottom: isMobile ? 1 : 2,
        }}
      >
        Attendance Overview
      </Typography>
      <ResponsiveContainer width="100%" height={isMobile ? 150 : 300}>
        <BarChart
          data={formattedData}
          margin={{ top: isMobile ? 40 : 10, right: isMobile ? 0 : 10, left: isMobile ? 0 : 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#cfd8dc" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: isMobile ? 10 : 12, fill: "#37474f" }} 
            label={{ value: "Subjects", position: "insideBottom", dy: 10, fontSize: isMobile ? 12 : 14, fill: "#37474f" }} 
          />
          <YAxis 
            width={isMobile ? 20 : 50} // Reduce Y-axis width on mobile
            label={{ value: "Attendance", angle: -90, position: "insideLeft", dx: isMobile ? -5 : -10, fontSize: isMobile ? 12 : 14, fill: "#37474f" }} 
            tick={{ fontSize: isMobile ? 10 : 12, fill: "#37474f" }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #b0bec5",
              borderRadius: 8,
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            itemStyle={{ fontSize: 12, color: "#37474f" }}
            cursor={{ fill: "rgba(144, 202, 249, 0.2)" }}
          />
          <Legend
            wrapperStyle={{
              top: -10,
              fontSize: 12,
              color: "#37474f",
            }}
          />
          <Bar dataKey="Attended" fill="#2196f3" name="Classes Attended">
            <LabelList dataKey="Attended" position="top" fill="#37474f" fontSize={isMobile ? 10 : 12} />
          </Bar>
          <Bar dataKey="Total" fill="#1a237e" name="Total Classes">
            <LabelList dataKey="Total" position="top" fill="#37474f" fontSize={isMobile ? 10 : 12} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default AttendanceBarChart;