import React from "react";
import UserSidebar from "../../../components/Sidebar/UserSidebar";
import SubmitComplaints from "./SubmitComplaints";
import UserNavbar from "../../../components/Topnavbar/UserNavbar/UserNavbar";

const SubmitComplaintsPage = () => {
  return (
    <>
      <UserNavbar />
      <UserSidebar>
        <SubmitComplaints />
      </UserSidebar>
    </>
  );
};

export default SubmitComplaintsPage;
