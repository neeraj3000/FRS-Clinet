import React, { useState } from "react";
import BasicBarChart from "../../components/BasicBarChart"; // import your BasicBars component
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function WeeklyAttendanceAnalysis() {
  const [xAxisData] = useState(["Group A", "Group B" , "Group c"]);
  const [seriesData] = useState([
    { 
      data: [69, 70 , 60], 
      label: 'Series 1' 
    }, 
    { 
      data: [10, 12 , 8], 
      label: 'Series 2' 
    }, 
    // { data: [60, 10] }, // Series 3
  ]);

  const [selectedExam, setSelectedExam] = useState("E1");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const exams = ["E1", "E2", "E3", "E4"];
  const subjects = ["all", "sub1", "sub2", "sub3", "sub4", "sub5"];

  const handleExamChange = (event) => {
    setSelectedExam(event.target.value);
    console.log(`Selected Exam: ${event.target.value}`);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
    console.log(`Selected Subject: ${event.target.value}`);
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Weekly Student Anlysis</h2>

      <Box sx={{ display: "flex", gap: 3, mt: 3, alignItems: "center" }}>
        {/* Exam Dropdown */}
        <FormControl sx={{ minWidth: 150, marginRight: 2 }} size="small">
          <InputLabel id="exam-select-label">Exam</InputLabel>
          <Select
            labelId="exam-select-label"
            id="exam-select"
            value={selectedExam}
            label="Exam"
            onChange={handleExamChange}
          >
            {exams.map((exam, index) => (
              <MenuItem key={index} value={exam}>
                {exam}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Subject Dropdown */}
        <FormControl sx={{ minWidth: 150, marginRight: 2 }} size="small">
          <InputLabel id="subject-select-label">Subject</InputLabel>
          <Select
            labelId="subject-select-label"
            id="subject-select"
            value={selectedSubject}
            label="Subject"
            onChange={handleSubjectChange}
          >
            {subjects.map((subject, index) => (
              <MenuItem key={index} value={subject}>
                {subject}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <BasicBarChart
        xAxisData={xAxisData} // Passing x-axis data as prop
        seriesData={seriesData} // Passing series data as prop
        width={550}
        height={350}
      />
    </div>
  );
}

export default WeeklyAttendanceAnalysis;