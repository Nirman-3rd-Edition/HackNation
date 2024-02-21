import React from "react";
import AdminSidebar from "../../../components/Sidebar/AdminSidebar";
import VerificationPage from "./VerificationStatus_Info";
import AdminNavbar from "../../../components/TopNavbar/AdminNavbar/AdminNavbar";

const VerificationStatusPage = () => {
  return (
    <>
      <AdminNavbar />
      <AdminSidebar>
        <VerificationPage />
      </AdminSidebar>
    </>
  );
};

export default VerificationStatusPage;
