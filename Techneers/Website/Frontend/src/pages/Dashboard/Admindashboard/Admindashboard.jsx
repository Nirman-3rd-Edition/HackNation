import React from "react";
import AdminSidebar from "../../../components/Sidebar/AdminSidebar";
import AdminDashboardHome_Info from "./AdminDashboardHome_Info";
import AdminNavbar from "../../../components/TopNavbar/AdminNavbar/AdminNavbar";

const Admindashboard = () => {
  return (
    <div>
      <AdminNavbar />
      <AdminSidebar>
        <AdminDashboardHome_Info />
      </AdminSidebar>
    </div>
  );
};

export default Admindashboard;
