import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import PrivateRoute from "../components/PrivateRoute";
import Dashboard from "../pages/Dashboard";
import Settings from "../pages/Settings";
import Account from "../pages/Account";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import FacebookAccounts from "../pages/FacebookAccounts";
import ResetPassword from "../pages/ResetPassword";
import FBChat from "../pages/FBChat";
import GHLAccounts from "../pages/GhlAccount";
// import AdminLayout from "../layouts/AdminLayout";
import AdminOverview from "../admin/pages/Overview";
import AdminFacebookAccounts from "../admin/pages/FacebookAccounts";
import AdminUsers from "../admin/pages/Users";
import AdminSidebar from "../admin/components/AdminSidebar";
import AdminFbAccounts from "../admin/pages/AdminFacebookAccounts";
const totalAccounts = 15;
const errorAccounts = 4;
const errorList = [
  { id: 1, name: "John's Ads", page_id: "324234234", error: "Token expired" },
  { id: 2, name: "Clothing Brand", page_id: "998883322", error: "Invalid permissions" },
  { id: 3, name: "Tech Firm", page_id: "912221445", error: "API access revoked" },
  { id: 4, name: "Fitness Page", page_id: "554321112", error: "Authentication error" },
];


function AppRouter() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected layout with sidebar & topbar */}
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <div className="flex h-screen">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Topbar />
                <div className="p-4 flex-1 overflow-y-auto">
                  <Routes>
                    <Route path="dashboard" element={<Dashboard totalAccounts={totalAccounts}
                      errorAccounts={errorAccounts}
                      errorList={errorList} />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="account" element={<Account />} />
                    <Route path="facebook-accounts" element={<FacebookAccounts />} />
                    <Route path="fb/:id" element={<FBChat />} />
                    <Route path="ghl-accounts" element={<GHLAccounts />} />

                  </Routes>
                </div>
              </div>
            </div>
          </PrivateRoute>
        }

      />

      {/* ADMIN */}
      <Route
        path="/admin/*"
        element={
          <PrivateRoute>
            <div className="flex h-screen bg-gray-900 text-gray-200">
              {/* Admin Sidebar */}
              <AdminSidebar />

              <div className="flex-1 flex flex-col w-screen">
                {/* Topbar */}
                <Topbar />

                {/* Admin Pages */}
                <div className="p-4 flex-1 overflow-y-auto">
                  <Routes>
                    <Route index element={<AdminOverview />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="facebook" element={<AdminFacebookAccounts />} />
                    <Route path="fb/:id" element={<FBChat />} />
                    <Route path="admin-facebook-accounts" element={<AdminFbAccounts />} />
                    <Route
                      path="facebook/:userId"
                      element={<AdminFacebookAccounts />}
                    />
                  </Routes>
                </div>
              </div>
            </div>
          </PrivateRoute>
        }
      />

    </Routes>
  );
}

export default AppRouter;
