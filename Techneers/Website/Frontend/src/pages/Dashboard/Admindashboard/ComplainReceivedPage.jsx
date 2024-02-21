import React from "react";
import AdminSidebar from "../../../components/Sidebar/AdminSidebar";
import Complaints from "./ComplainReceived_Info";
import AdminNavbar from "../../../components/TopNavbar/AdminNavbar/AdminNavbar";

const ComplainReceivedPage = () => {
  return (
    <>
      <AdminNavbar />
      <AdminSidebar>
        <Complaints />
      </AdminSidebar>
    </>
  );
};

export default ComplainReceivedPage;
