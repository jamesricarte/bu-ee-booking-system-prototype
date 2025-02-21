import React, { useState } from "react";
import Button from "../Button";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";

const Nav = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <nav className="flex justify-between items-center bg-green-400 h-16 text-white px-20 fixed top-0 left-0 w-full">
      <div className="flex items-center font-bold">
        <h3 className="text-2xl">Classroom Booking</h3>
        <div className="ml-10 flex items-center gap-2 cursor-pointer">
          <GiHamburgerMenu size={20} />
          <h3 className="text-xl">Dashboard</h3>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <IoNotificationsOutline
          className="cursor-pointer transition-all ease duration-100 hover:text-[#e8e8e8]"
          size={26}
        />
        <div
          className="flex items-center gap-1 cursor-pointer transition-all ease duration-100 hover:bg-green-500 rounded-md p-2 relative"
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        >
          <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
          <div>
            <h4 className="font-bold text-sm">James Ricarte</h4>
            <p className="text-xs">uhenyou@gmail.com</p>
          </div>

          {/* Profile menu */}
          <div
            className={`absolute bg-gray-100 text-black -bottom-22 left-1/2 transform -translate-x-1/2 p-1 rounded-sm ${
              showProfileMenu
                ? "block pointer-events-auto"
                : "hidden pointer-events-none"
            }`}
          >
            <div className="py-1 p-10 hover:bg-gray-200 rounded-md">
              <p>Profile</p>
            </div>
            <div className="py-1 p-10 hover:bg-gray-200 rounded-md">
              <Button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
