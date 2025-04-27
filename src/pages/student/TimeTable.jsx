import React, { useState, useEffect, useMemo } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, useTheme, Box
} from '@mui/material';
import {headers} from "../../GetAuthToken"

const FacultyTimeTableManager = () => {
  const theme = useTheme();
  const [year , setYear] = useState();
  const [timeTableData, setTimeTableData] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const subjectColors = useMemo(() => ({
    EP: '#FFB6C1',
    EVS: '#98FB98',
    DM: '#87CEEB',
    OOPS: '#DDA0DD',
    'OOPS LAB': '#F0E68C',
    'EP LAB': '#F08080',
    DS: '#E6E6FA',
    'DS LAB': '#FFA07A',
    MEFA: '#B0C4DE',
  }), []);

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const sections = ['A', 'B', 'C', 'D', 'E'];
  const periods = Array.from({ length: 7 }, (_, i) => `p${i + 1}`);

  useEffect(() => {
    getStudentYearByToken()
    fetchTimeTable();
    fetchSubjects();
    console.log(timeTableData)
  }, [year]);

  const getStudentYearByToken = async ()=>{
    const response = await fetch(`http://127.0.0.1:8000/profile`,{headers});
    const data = await response.json()
    setYear(data["year"])
  }

  const fetchTimeTable = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/admin/timetable/${year}`,{headers});
      const data = await response.json();
      console.log(data)
      setTimeTableData(data);
    } catch (error) {
      console.error('Error fetching timetable:', error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/admin/get-subjects',{headers});
      const data = await response.json();
      
      const yearKey = year;
      const yearSubjects = data[yearKey] || [];
      setSubjects(yearSubjects);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const getSubjectForPeriod = (day, section, period) => {
    if (!timeTableData?.timetable?.[day]?.[section]) return '';
    for (const [subject, periods] of Object.entries(timeTableData.timetable[day][section])) {
      if (periods.includes(period)) return subject;
    }
    return '';
  };

  if (!timeTableData) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Faculty Timetable - {year}
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: theme.shadows[2] }}>
        <Table size="small" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.grey[100] }}>
                Day
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.grey[100] }}>
                Section
              </TableCell>
              {periods.map((period) => (
                <TableCell
                  key={period}
                  align="center"
                  sx={{ fontWeight: 'bold', backgroundColor: theme.palette.grey[100] }}
                >
                  {period.toUpperCase()}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {days.map((day) => (
              <React.Fragment key={day}>
                {sections.map((section, index) => (
                  <TableRow key={`${day}-${section}`}>
                    {index === 0 && (
                      <TableCell
                        rowSpan={sections.length}
                        sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
                      >
                        {day}
                      </TableCell>
                    )}
                    <TableCell sx={{ fontWeight: 'bold' }}>{section}</TableCell>
                    {periods.map((period) => {
                      const currentSubject = getSubjectForPeriod(day, section, period);
                      return (
                        <TableCell 
                          key={period} 
                          sx={{ 
                            minWidth: '120px', 
                            backgroundColor: currentSubject ? subjectColors[currentSubject] : 'white',
                            textAlign: 'center'
                          }}
                        >
                          {currentSubject || '-'}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FacultyTimeTableManager;