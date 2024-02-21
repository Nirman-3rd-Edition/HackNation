import React from "react";
import UserSidebar from "../../../components/Sidebar/UserSidebar";
import ListOfComplaints from "./ListOfComplaints";
import UserNavbar from "../../../components/Topnavbar/UserNavbar/UserNavbar";

const ListofComplaintsPage = () => {
  return (
    <>
      <UserNavbar />
      <UserSidebar>
        <ListOfComplaints />
      </UserSidebar>
    </>
  );
};

export default ListofComplaintsPage;
