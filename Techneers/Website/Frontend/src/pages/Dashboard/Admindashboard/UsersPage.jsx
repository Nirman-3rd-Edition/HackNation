import React from "react";
import AdminSidebar from "../../../components/Sidebar/AdminSidebar";
import Users from "./User_Info";
import AdminNavbar from "../../../components/TopNavbar/AdminNavbar/AdminNavbar";
const UsersPage = () => {
  return (
    <>
      <AdminNavbar />
      <AdminSidebar>
        <Users />
      </AdminSidebar>
    </>
  );
};

export default UsersPage;
