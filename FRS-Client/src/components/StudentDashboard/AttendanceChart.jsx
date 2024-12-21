import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import {
  Paper,
  Typography,
  MenuItem,
  Select,
  FormControl,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "8px",
          borderRadius: "5px",
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
        }}
      >
        <p style={{ margin: 0, fontWeight: "bold" }}>{label}</p>
        {payload.map((entry, index) => (
          <p
            key={index}
            style={{
              margin: 0,
              color: entry.color,
              fontSize: "0.9rem",
            }}
          >
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const AttendanceChart = ({ data }) => {
  const theme = useTheme();
  const [viewMode, setViewMode] = useState("percentage");
  const [filter, setFilter] = useState("daily");
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const dailyData = [
    { date: "2024-12-01", percentage: 85, classes: 2, totalClasses: 3 },
    { date: "2024-12-02", percentage: 90, classes: 3, totalClasses: 3 },
    { date: "2024-12-03", percentage: 80, classes: 4, totalClasses: 5 },
    { date: "2024-12-04", percentage: 70, classes: 3, totalClasses: 5 },
    { date: "2024-12-05", percentage: 75, classes: 4, totalClasses: 5 },
  ];

  const monthlyData = [
    { date: "Jan", percentage: 85, classes: 17, totalClasses: 20 },
    { date: "Feb", percentage: 90, classes: 18, totalClasses: 22 },
    { date: "Mar", percentage: 75, classes: 15, totalClasses: 20 },
    { date: "Apr", percentage: 80, classes: 16, totalClasses: 20 },
    { date: "May", percentage: 95, classes: 19, totalClasses: 20 },
  ];

  const isDaily = filter === "daily";
  const chartData = isDaily ? dailyData : monthlyData;

  return (
    <Paper
      elevation={3}
      sx={{
        padding: { xs: 0, sm: 2 },
        borderRadius: 3,
        backgroundColor: "rgba(142, 213, 241, 0.5)",
        width: "100%",
      }}
    >
      {/* Header Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={{ xs: "column", sm: "row" }}
        mb={2}
        gap={{ xs: 1, sm: 0 }}
        sx={{  padding: 1 }}
      >
        <Typography
          variant="h6"
          align="center"
          sx={{
            fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
            // backgroundColor: "rgba(142, 213, 241, 0.5)",
            padding: 1,
            borderRadius: 1,
          }}
        >
          Attendance Trend
        </Typography>
        <Box display="flex" gap={2} >
          <FormControl
            size="small"
            sx={{
              minWidth: { xs: 100, sm: 150, md: 200 },
              backgroundColor: "rgba(161, 236, 190, 0.5)",
            }}
          >
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              displayEmpty
              sx={{ fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" } }}
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            size="small"
            sx={{
              minWidth: { xs: 100, sm: 150, md: 200 },
              backgroundColor: "rgba(161, 236, 190, 0.5)",
            }}
          >
            <Select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              displayEmpty
              sx={{ fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" } }}
            >
              <MenuItem value="percentage">Percentage</MenuItem>
              <MenuItem value="classes">No. of Classes</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Chart Section */}
      <Box sx={{ backgroundColor: "rgba(142, 213, 241, 0.0)", borderRadius: 2, padding:0 }}>
        <ResponsiveContainer width="100%" height="100%" minHeight={300}>
          <LineChart data={chartData} margin={{ top: 20, right: 20, left: 1, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="date"
              label={{
                position: "insideBottomRight",
                offset: -20,
                style: { fill: "#546e7a", fontSize: "1.9rem" },
              }}
              tick={{
                fill: "#546e7a",
                fontSize: "0.8rem",
                angle: isSmallScreen ? -45 : 0,
                dy: 10,
                textAnchor: isSmallScreen ? "end" : "middle",
              }}
              interval={0}
            />
            <YAxis
              domain={[0, viewMode === "percentage" ? 100 : isDaily ? 7 : 30]}
              label={{
                angle: -90,
                position: "insideLeft",
                style: { fill: "#546e7a", fontSize: "0.9rem" },
              }}
              tick={{ fill: "#546e7a", fontSize: "0.8rem" }}
              tickFormatter={(value) =>
                viewMode === "percentage" ? `${value}%` : value
              }
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: "#546e7a", fontSize: "0.9rem" }} />
            {viewMode === "percentage" ? (
              <Line
                type="monotone"
                dataKey="percentage"
                name="Attendance %"
                stroke="#4caf50"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              >
                <LabelList
                  dataKey="percentage"
                  position="top"
                  formatter={(value) => `${value}%`}
                />
              </Line>
            ) : (
              <>
                <Line
                  type="monotone"
                  dataKey="classes"
                  name="Classes Attended"
                  stroke="#4caf50"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                >
                  <LabelList dataKey="classes" position="top" />
                </Line>
                <Line
                  type="monotone"
                  dataKey="totalClasses"
                  name="Total Classes"
                  stroke="#2196f3"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                >
                  <LabelList dataKey="totalClasses" position="top" />
                </Line>
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default AttendanceChart;
