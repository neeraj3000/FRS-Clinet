import React, { useState } from "react";
import SideBar from "../../components/SideBar";

export default function Faculty() {
  const drawerItems = [
    "Dashboard",
    "Today Classes",
    "Profile",
    "Settings",
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
        title="Faculty"
        drawerItems={drawerItems}
      />
    </>
  );
}
