import { Outlet } from "react-router-dom";
import AdminSidebar from "../admin/components/AdminSidebar";
import Topbar from "../components/Topbar";
export default function AdminLayout() {
    return (
        <div className="bg-gray-900 text-gray-200 flex">
            <AdminSidebar />

            <div className="">
                {/* Topbar */}
                <Topbar />

                {/* Page content */}
                <main className="flex-1  p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
