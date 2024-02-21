import React from "react";
import AdminSidebar from "../../../components/Sidebar/AdminSidebar";
import DocumentWriters_Info from "./DocumentWriters_Info";
import AdminNavbar from "../../../components/TopNavbar/AdminNavbar/AdminNavbar";

const DocumentWritersPage = () => {
  return (
    <>
      <AdminNavbar />
      <AdminSidebar>
        <DocumentWriters_Info />
      </AdminSidebar>
    </>
  );
};

export default DocumentWritersPage;
