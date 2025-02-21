import React, { useState } from "react";
import Button from "./Button";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const { logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-100 flex justify-center items-center h-18 fixed top-0 left-0 w-full">
      <div className="flex w-[80%] items-center justify-between">
        <div className="cursor-pointer">
          <h3 className="text-xl font-semibold">Bicol University</h3>
          <p className="text-sm">Engineering Department</p>
        </div>
        <div>
          <ul className="flex items-center gap-5 font-semibold">
            <li className="cursor-pointer">Bookings</li>
            <div
              className="flex items-center gap-1 cursor-pointer transition-all ease duration-100 hover:bg-gray-200 rounded-md p-2 relative"
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
                    backgroundColor="bg-green-500"
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
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
