import React from "react";
import AdminSidebar from "../../../components/Sidebar/AdminSidebar";
import Mediators from "./Mediators_Info";
import AdminNavbar from "../../../components/TopNavbar/AdminNavbar/AdminNavbar";

const MediatorsPage = () => {
  return (
    <>
      <AdminNavbar />
      <AdminSidebar>
        <Mediators />
      </AdminSidebar>
    </>
  );
};

export default MediatorsPage;
