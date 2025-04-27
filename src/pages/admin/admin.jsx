import React, { useState } from "react";
import SideBar from "../../components/SideBar";

export default function AdminDashBoard() {
  const drawerItems = [
    "Dashboard",
    "Today Classes",
    "Assign Faculty",
    "Register Students",
    "View Students",
    "Manage Faculty",
    "Time Table",
    "Student Visualisation",

  ];

  const [open, setOpen] = useState(false);  // Keep drawer open by default

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <SideBar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        drawerWidth={240}
        title="Admin"
        drawerItems={drawerItems}
      />
      
    </>
  );
}
