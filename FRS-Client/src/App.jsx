import React from "react";
import { ThemeProvider } from "@emotion/react";
import Admin from "./pages/admin/admin";
import AdminDashboard from "./pages/admin/AdminDashboard";

import theme from "./utils/Theme";
import "./styles/app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Admin />}>
            {/* Nested routes */}
            <Route path="/dashboard" element={<AdminDashboard />} />
            {/* <Route path="manage-students" element={<ManageStudents />} />
      <Route path="manage-faculty" element={<ManageFaculty />} /> */}
            {/* Add other routes similarly */}
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
