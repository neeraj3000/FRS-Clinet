import React from "react";
import { ThemeProvider } from "@mui/material/styles"; // Fix here
import Admin from "./pages/admin/admin";
import AdminDashboard from "./pages/admin/AdminDashboard";
// import Ad2 from "./pages/admin/Ad2"

import theme from "./utils/Theme"; // Your custom theme

import "./styles/app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
