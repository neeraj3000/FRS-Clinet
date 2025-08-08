import React, { useState } from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import TodayIcon from '@mui/icons-material/Today';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PeopleIcon from '@mui/icons-material/People';
import SideBar from "../../components/SideBar";
import {Table} from "lucide-react";

export default function Faculty() {
  const drawerItems = [
    { text: "Dashboard", icon: <DashboardIcon /> },
    { text: "Today Classes", icon: <TodayIcon /> },
    { text: "Timetable", icon: <Table /> },
    { text: "Student Visualisation", icon: <PeopleIcon /> },
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
        drawerWidth={270}
        title="Faculty"
        drawerItems={drawerItems}
      />
    </>
  );
}
