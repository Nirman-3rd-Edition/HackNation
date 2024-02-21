import React from "react";
import AdminSidebar from "../../../components/Sidebar/AdminSidebar";
import Notaries from "./Notaries_Info";
import AdminNavbar from "../../../components/TopNavbar/AdminNavbar/AdminNavbar";

const NotariesPage = () => {
  return (
    <>
      <AdminNavbar />
      <AdminSidebar>
        <Notaries />
      </AdminSidebar>
    </>
  );
};

export default NotariesPage;
