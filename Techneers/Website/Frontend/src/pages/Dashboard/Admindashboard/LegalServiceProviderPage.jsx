import React from "react";
import AdminSidebar from "../../../components/Sidebar/AdminSidebar";
import LegalServiceProviders_Info from "./LegalServiceProvider_Info";
import AdminNavbar from "../../../components/TopNavbar/AdminNavbar/AdminNavbar";

const LegalServiceProviderPage = () => {
  return (
    <>
      <AdminNavbar />
      <AdminSidebar>
        <LegalServiceProviders_Info />
      </AdminSidebar>
    </>
  );
};

export default LegalServiceProviderPage;
