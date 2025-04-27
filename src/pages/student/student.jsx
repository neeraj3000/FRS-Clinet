import React, { useState } from "react";
import SideBar from "../../components/SideBar";

export default function Student() {
  const drawerItems = [
    "Dashboard",
    "Check Classes",
    "TimeTable"
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
        title="Student"
        drawerItems={drawerItems}
      />
      
    </>
  );
}
