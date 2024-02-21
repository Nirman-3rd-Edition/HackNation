import { useState } from "react";

import Control from "../../assets/adminimg/control.png";

import Logo from "../../assets/adminimg/logo.png";

import { FcBusinessman } from "react-icons/fc";
import { FcViewDetails } from "react-icons/fc";
import { FcTodoList } from "react-icons/fc";
import { FcPortraitMode } from "react-icons/fc";
import { Link } from "react-router-dom";
import { FcManager } from "react-icons/fc";
import { FcNews } from "react-icons/fc";
import { FcBarChart } from "react-icons/fc";
import { FcBriefcase } from "react-icons/fc";
import { FcConferenceCall } from "react-icons/fc";
import { GoLaw } from "react-icons/go";
import { FaStamp } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { FcLibrary } from "react-icons/fc";
import { FcReading } from "react-icons/fc";
import { FcSms } from "react-icons/fc";

const LSPSidebar = ({ children }) => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Home", src: <FcLibrary size={"20px"} /> },
    { title: "Dashboard", src: <FcBarChart size={"20px"} /> },
    {
      title: "Profile",
      src: <FcManager size={"20px"} />,
    },
    { title: "Cases", src: <FcReading size={"20px"} /> },

    {
      title: "Complain_Recieved",
      src: <FcViewDetails size={"20px"} />,
    },
    { title: "Chat", src: <FcSms size={"20px"} />, gap: true },
  ];

  return (
    <div className="flex" style={{ position: "absolute" }}>
      <div
        className={` ${
          open ? "w-60" : "w-12 "
        } bg-dark-blue h-screen p-3  pt-8 relative duration-300 `}
      >
        <img
          src={Control}
          className={`absolute cursor-pointer -right-6 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={Logo}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            LSP Dashboard
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <Link to={`/LSPDashboard/${Menu.title}Page`}>
              <li
                key={index}
                className={`flex  rounded-md p-1 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                  index === 0 && "bg-light-white"
                } `}
              >
                {Menu.src}
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-200 text-md`}
                >
                  {Menu.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7 overflow-x-auto">{children}</div>
    </div>
  );
};
export default LSPSidebar;
