import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, closeMobileSidebar } from "../redux/slices/uiSlice";
import { Menu, X } from "lucide-react"; // modern icons
import { useState } from "react";
import { LayoutDashboard, UserStar, Facebook, ArrowsUpFromLine, ArrowRightToLine } from 'lucide-react';
import logo from "../assets/logo.png";
function Sidebar() {
  const dispatch = useDispatch();
  const { sidebarOpen, mobileSidebarOpen } = useSelector((state) => state.ui);


  const navItems = [
    {
      path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard />
    },
    // { path: "/settings", label: "Settings" },
    { path: "/account", label: "Account", icon: <UserStar /> },
    { path: "/facebook-accounts", label: "Facebook Accounts", icon: <Facebook /> },
    { path: "/ghl-accounts", label: "GHL Account", icon: <ArrowsUpFromLine /> },
  ];
  return (
    <>
      {/* Mobile Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => dispatch(closeMobileSidebar())}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed z-50 lg:static top-0 left-0 h-full bg-gray-950 border-r border-gray-800 text-gray-200 transition-all duration-500 ease-in-out
        ${sidebarOpen ? "w-64" : "w-20"} 
        ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Toggle Button */}
          <div className="flex items-center justify-between p-4  border-gray-800">

            {sidebarOpen && (
              <span className="text-green-400 font-bold text-lg tracking-wide">
                {/* FB - GHL Integration */}
                {/* <img src="/" alt="" /> */}
                <img src={logo} alt="Logo" className="w-full" />
              </span>

            )}
            <button
              onClick={() => dispatch(toggleSidebar())}
              className={`hidden lg:flex items-center justify-center w-9 h-9 rounded-lg text-green-600 hover:scale-110 transition-colors ${sidebarOpen ? 'ml-5' : ''}`}
            >
              {sidebarOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col flex-grow p-4 gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                    ? "bg-green-600 text-black"
                    : "hover:bg-gray-800 text-gray-300"
                  }`
                }
                onClick={() => dispatch(closeMobileSidebar())}
              >
                <span>{item.icon}</span>
                {sidebarOpen && <span>{item.label}</span>}

              </NavLink>
            ))}
          </nav>

          {/* Footer / Collapse button */}
          <div className="p-4 border-t border-gray-800">
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="w-full py-2 text-sm bg-gray-800 rounded-lg
            hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
            >
              {sidebarOpen ? "Collapse" : <ArrowRightToLine />
              }
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
