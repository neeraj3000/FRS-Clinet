import React, { useState } from "react";
import {
  Home,
  CalendarDays,
  Users,
  UserPlus,
  UserCheck,
  LayoutList,
  Table,
  BarChart3
} from "lucide-react";
import SideBar from "../../components/SideBar";

export default function AdminDashBoard() {
  const drawerItems = [
    { text: "Dashboard", icon: <Home size={20} /> },
    { text: "Today’s Classes", icon: <CalendarDays size={20} /> },
    { text: "Assign Faculty", icon: <UserCheck size={20} /> },
    { text: "Register Students", icon: <UserPlus size={20} /> },
    { text: "View Students", icon: <Users size={20} /> },
    { text: "Manage Faculty", icon: <LayoutList size={20} /> },
    { text: "Timetable", icon: <Table size={20} /> },
    { text: "Student Visualization", icon: <BarChart3 size={20} /> }
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
