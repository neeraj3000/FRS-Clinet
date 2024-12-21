import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import "./styles/app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Admin from "./pages/admin/admin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TodayClasses from "./pages/admin/TodayClasses";
import ManageFaculty from "./pages/admin/ManageFaculty";
import StudentVisualisation from "./pages/admin/StudentVisualisation";

import E1Classes from "./pages/admin/E1Classes";
import E2Classes from "./pages/admin/E2Classes";
import E3Classes from "./pages/admin/E3Classes";
import E4Classes from "./pages/admin/E4Classes";


import theme from "./utils/Theme";

import Dashboard from "./pages/Faculty/DashBoard";
import Profile from "./pages/Faculty/Profile";
import Settings from "./pages/Faculty/settings";
import FacultyLayout from "./pages/Faculty/Faculty_Layout";
import ClassesList from "./pages/Faculty/ClassesList";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {/* Admin route */}
          <Route path="/admin" element={<Admin />}>
            {/* Nested admin routes */}
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="todayclasses" element={<TodayClasses />} />
            <Route path="todayclasses/e1" element={<E1Classes />} />
            <Route path="todayclasses/e2" element={<E2Classes />} />
            <Route path="todayclasses/e3" element={<E3Classes />} />
            <Route path="todayclasses/e4" element={<E4Classes />} />
            <Route path="managefaculty" element={<ManageFaculty />} />
            <Route path="studentvisualisation" element={<StudentVisualisation />} />

          </Route>
          <Route path="/faculty" element={<FacultyLayout />}>
             <Route index element={<Navigate to="/faculty/dashboard" />} /> 
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
