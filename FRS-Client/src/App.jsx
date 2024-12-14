import React from "react";
import { ThemeProvider } from "@mui/material/styles"; // Fix here
import "./styles/app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Admin from "./pages/admin/admin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TodayClasses from "./pages/admin/TodayClasses"
import ManageFaculty from "./pages/admin/ManageFaculty";
import StudentVisualisation from "./pages/admin/StudentVisualisation";

import E1Classes from "./pages/admin/E1Classes"
import E2Classes from "./pages/admin/E2Classes"
import E3Classes from "./pages/admin/E3Classes"
import E4Classes from "./pages/admin/E4Classes"



import theme from "./utils/Theme"; // Your custom theme

/*
TODO
the cards are not spread over entire page

mobile : view : http://192.168.31.77:3000

*/



function App() {
  console.log(theme.palette.action.hover)
  console.log(theme.palette)

  return (
    <ThemeProvider theme={theme}> {/* Using the correct ThemeProvider */}
      <Router>
        <Routes>
          <Route path="/admin" element={<Admin />}>
            {/* Nested routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} /> 
            <Route path="/admin/todayclasses" element={<TodayClasses />} /> 
            <Route path="/admin/todayclasses/e1" element={<E1Classes />} /> 
            <Route path="/admin/todayclasses/e2" element={<E2Classes />} /> 
            <Route path="/admin/todayclasses/e3" element={<E3Classes />} /> 
            <Route path="/admin/todayclasses/e4" element={<E4Classes />} /> 
            <Route path="/admin/managefaculty" element={<ManageFaculty />} /> 
            <Route path="/admin/studentvisualisation" element={<StudentVisualisation />} /> 


          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
