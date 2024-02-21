import React from "react";
import LSPSidebar from "../../../components/Sidebar/LSPSidebar";
import Cases_Info from "./Cases_Info";
import LspNavbar from "../../../components/TopNavbar/LspNavbar/LspNavbar";

const CasesPage = () => {
  return (
    <>
      <LspNavbar />
      <LSPSidebar>
        <Cases_Info />
      </LSPSidebar>
    </>
  );
};

export default CasesPage;
