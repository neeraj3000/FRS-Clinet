import React from "react";
import { ThemeProvider } from "@mui/material/styles"; // Fix here
import "./styles/app.css";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";

import Admin from "./pages/admin/admin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TodayClasses from "./pages/admin/TodayClasses"
import ManageFaculty from "./pages/admin/ManageFaculty";
import StudentVisualisation from "./pages/admin/StudentVisualisation";

import E1Classes from "./pages/admin/E1Classes"
import E2Classes from "./pages/admin/E2Classes"
import E3Classes from "./pages/admin/E3Classes"
import E4Classes from "./pages/admin/E4Classes"

import Dashboard from "./pages/Faculty/DashBoard";
import Profile from "./pages/Faculty/Profile";
import Settings from "./pages/Faculty/settings";

import theme from "./utils/Theme"; 
import FacultyLayout from "./pages/Faculty/Faculty_Layout";
import ClassesList from "./pages/Faculty/ClassesList";

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
          {/* <Route path = "/faculty" element = {<FacultyLayout /> } />
            <Route path="/faculty/dashboard" element={<Dashboard />} />
            <Route path="/faculty/profile" element={<Profile />} />
            <Route path="/faculty/settings" element={<Settings />} />
            <Route path = "/faculty/classes" element = {<ClassesList />}/> */}
          <Route path="/faculty" element={<FacultyLayout />}>
            <Route index element={<Navigate to="/faculty/dashboard" />} /> {/* Default route */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="classes" element={<ClassesList />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
