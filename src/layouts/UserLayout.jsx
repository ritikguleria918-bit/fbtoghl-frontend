import { Outlet } from "react-router-dom";

export default function UserLayout() {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 flex">
            {/* Your existing sidebar stays here */}
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
}
