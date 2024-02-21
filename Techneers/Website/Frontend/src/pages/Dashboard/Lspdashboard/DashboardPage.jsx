import React from "react";
import LspSidebar from "../../../components/Sidebar/LspSidebar";
import Dashboard from "./Dashboard";
import LspNavbar from "../../../components/TopNavbar/LspNavbar/LspNavbar";

const LDashboardPage = () => {
  return (
    <>
      <LspNavbar />
      <LspSidebar>
        <Dashboard />
      </LspSidebar>
    </>
  );
};

export default LDashboardPage;
