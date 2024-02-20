import React from "react";
import LSPSidebar from "../../../components/Sidebar/LSPSidebar";
import ComplaintsReceived_Info from "./ComplainReceived_Info";
import LspNavbar from "../../../components/TopNavbar/LspNavbar/LspNavbar";

const LSPComplainReceivedPage = () => {
  return (
    <>
      <LspNavbar />
      <LSPSidebar>
        <ComplaintsReceived_Info />
      </LSPSidebar>
    </>
  );
};

export default LSPComplainReceivedPage;
