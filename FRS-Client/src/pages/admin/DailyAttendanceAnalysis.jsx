import React from "react";
import BasicLineChart from "../../components/BasicLineChart";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function DailyAttendanceAnalysis() {
  const studentAttendanceData = {
    xAxisData: [1, 2, 3, 4, 5, 6, 7], // Days of the week, for example
    seriesData: [68, 67, 70, 65, 62, 72, 69], // 1 for present, 0 for absent
  };

  const [selectedExam, setSelectedExam] = React.useState("E1");
  const [selectedSubject, setSelectedSubject] = React.useState("all");
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
    <div style={{ margin: "20px" , width:'fit-content' }}>
      <h2>Daily Student Analysis</h2>

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

      <BasicLineChart
        xAxisData={studentAttendanceData.xAxisData}
        seriesData={studentAttendanceData.seriesData}
        xAxisScale={{ type: "linear", min: 0, max: 10 }}
        yAxisScale={{ type: "linear", min: 0, max: 1 }}
        width={450}
        height={300}
      />
    </div>
  );
}

export default DailyAttendanceAnalysis;
