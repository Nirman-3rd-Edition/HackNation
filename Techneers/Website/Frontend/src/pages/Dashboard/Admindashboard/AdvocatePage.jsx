import React from "react";
import AdminSidebar from "../../../components/Sidebar/AdminSidebar";
import AdminNavbar from "../../../components/TopNavbar/AdminNavbar/AdminNavbar";
import Advocates_Info from "./Advocates_Info";

const AdvocatePage = () => {
  return (
    <>
      <AdminNavbar />
      <AdminSidebar>
        <Advocates_Info />
      </AdminSidebar>
    </>
  );
};

export default AdvocatePage;
