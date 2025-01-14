import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import "./styles/app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";


import Admin from "./pages/admin/admin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageClasses from "./pages/admin/ManageClasses";
import ManageFaculty from "./pages/admin/ManageFaculty";
import StudentVisualisation from "./pages/admin/StudentVisualisation";
import LoginForm from "./pages/Login";
import SignUpFrom from "./pages/SignUp"
import AddStudent from "./pages/adduser"
import StudentForm from "./pages/admin/StudentForm"

import ClassList from "./pages/admin/ClassList";
import ClassDetails from "./pages/admin/ClassDetails";

import StudentAttendaceOverview from "./pages/admin/StudentAttendanceOverview"

import Student from "./pages/student/student";
import StudentDashboard from "./pages/student/StudentDashboard";

// import E1Classes from "./pages/admin/E1Classes";
// import E2Classes from "./pages/admin/E2Classes";
// import E3Classes from "./pages/admin/E3Classes";
// import E4Classes from "./pages/admin/E4Classes"; 


import theme from "./utils/Theme";

import Dashboard from "./pages/Faculty/DashBoard";
import Profile from "./pages/Faculty/Profile";
import Settings from "./pages/Faculty/settings";
// import FacultyLayout from "./pages/Faculty/Faculty_Layout";
import Faculty from "./pages/Faculty/faculty";
import ClassesList from "./pages/Faculty/ClassesList";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
        login_and_student_Dashboard
          {/* Login Route */}
          <Route path="/addstudent" element={<AddStudent />} />

          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpFrom />} />

          {/* student Route */}
          <Route path="/student" element={<Student></Student>}>
            <Route path="dashboard" element={<StudentDashboard />} />
          </Route>
          {/* Admin Routes */}
        
          <Route path="/admin" element={<Admin />}>
            {/* Nested admin routes */}
            <Route index element={<Navigate to="/admin/dashboard" />} /> 
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="todayclasses/" element={<ManageClasses />} />
            <Route path="todayclasses/:year" element={<ManageClasses />} />
            {/* <Route path="todayclasses/:year" element={<ClassList />} />  */}
            <Route path="todayclasses/:year/:classId" element={<ClassDetails />} /> {/* Use element instead of component */}
            {/* Uncomment and adjust these routes as needed */}
            {/* <Route path="todayclasses/e1" element={<E1Classes />} />
            <Route path="todayclasses/e2" element={<E2Classes />} />
            <Route path="todayclasses/e3" element={<E3Classes />} />
            <Route path="todayclasses/e4" element={<E4Classes />} /> */}
            <Route path="registerstudents" element={<StudentForm />} />
            <Route path="managefaculty" element={<ManageFaculty />} />
            <Route path="studentvisualisation" element={<StudentVisualisation />} />
            <Route path="studentvisualisation/:studentId" element={<StudentAttendaceOverview />} />

          </Route>
          <Route path="/faculty" element={<Faculty />}>
             <Route index element={<Navigate to="/faculty/dashboard" />} /> 
             <Route path="dashboard" element={<Dashboard />} />
             <Route path="todayclasses" element={<ClassesList />} />
             <Route path="profile" element={<Profile />} />
             <Route path="settings" element={<Settings />} />
           </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
