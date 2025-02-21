import React from "react";
import { MdDashboard } from "react-icons/md";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { PiCalendarCheckBold } from "react-icons/pi";
import { FiSettings } from "react-icons/fi";

const Sidebar = () => {
  return (
    <div className="bg-gray-100 fixed left-0 top-18 h-screen flex flex-col text-lg text-gray-800 pt-4">
      <div className="flex items-center gap-2 py-4 pl-6 pr-12 cursor-pointer hover:bg-gray-300">
        <MdDashboard />
        <p>Dashboard</p>
      </div>
      <div className="flex items-center gap-2 py-4 pl-6 pr-12 cursor-pointer hover:bg-gray-300">
        <FaHouseChimneyUser />
        <p>Classrooms</p>
      </div>
      <div className="flex items-center gap-2 py-4 pl-6 pr-12 cursor-pointer hover:bg-gray-300">
        <PiCalendarCheckBold />
        <p>Bookings</p>
      </div>
      <div className="flex items-center gap-2 py-4 pl-6 pr-12 cursor-pointer hover:bg-gray-300">
        <FiSettings />
        <p>Settings</p>
      </div>
    </div>
  );
};

export default Sidebar;
