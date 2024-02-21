import React from "react";
import AdminSidebar from "../../../components/Sidebar/AdminSidebar";
import Arbitrators_Info from "./Arbitrators_Info";
import AdminNavbar from "../../../components/TopNavbar/AdminNavbar/AdminNavbar";

const ArbitratorsPage = () => {
  return (
    <>
      <AdminNavbar />
      <AdminSidebar>
        <Arbitrators_Info />
      </AdminSidebar>
    </>
  );
};

export default ArbitratorsPage;
