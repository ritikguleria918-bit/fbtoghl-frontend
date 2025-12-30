// import { NavLink } from "react-router-dom";
// import { useState } from "react";
// import {
//     LayoutDashboard,
//     Users,
//     Building2,
//     Facebook,
//     Workflow,
//     Activity,
//     Menu,
//     X,
//     ArrowRightToLine,
// } from "lucide-react";
// import logo from "../../assets/logo.png";

// const nav = [
//     { to: "/admin", label: "Overview", icon: LayoutDashboard },
//     { to: "/admin/users", label: "Users", icon: Users },
//     // { to: "/admin/clients", label: "Clients", icon: Building2 },
//     { to: "/admin/facebook", label: "Facebook Accounts", icon: Facebook },
// ];

// export default function AdminSidebar() {
//     const [sidebarOpen, setSidebarOpen] = useState(true);

//     return (
//         <aside
//             className={`h-screen bg-gray-950 border-r border-gray-800 text-gray-200
//       transition-all duration-500 ease-in-out
//       ${sidebarOpen ? "w-64" : "w-20"}`}
//         >
//             <div className="flex flex-col h-full">
//                 {/* Header */}
//                 <div className="flex items-center justify-between p-4">
//                     {sidebarOpen && (
//                         <img
//                             src={logo}
//                             alt="Admin Logo"
//                             className="w-40 transition-opacity duration-300"
//                         />
//                     )}

//                     <button
//                         onClick={() => setSidebarOpen(!sidebarOpen)}
//                         className={`hidden lg:flex items-center justify-center w-9 h-9 rounded-lg
//             text-green-600 hover:scale-110 transition-all ${sidebarOpen ? "ml-5" : ""}`}
//                     >
//                         {sidebarOpen ? <X size={26} /> : <Menu size={26} />}
//                     </button>
//                 </div>

//                 {/* Navigation */}
//                 <nav className="flex flex-col flex-grow p-4 gap-2">
//                     {nav.map(({ to, label, icon: Icon }) => (
//                         <NavLink
//                             key={to}
//                             to={to}
//                             end={to === '/admin'}
//                             className={({ isActive }) =>
//                                 `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
//                 transition-all duration-300
//                 ${isActive
//                                     ? "bg-green-600 text-black"
//                                     : "hover:bg-gray-800 text-gray-300"
//                                 }`
//                             }
//                         >
//                             <Icon size={18} />
//                             <span
//                                 className={`whitespace-nowrap transition-all duration-300
//                 ${sidebarOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 hidden"}`}
//                             >
//                                 {label}
//                             </span>
//                         </NavLink>
//                     ))}
//                 </nav>

//                 {/* Footer */}
//                 <div className="p-4 border-t border-gray-800">
//                     <button
//                         onClick={() => setSidebarOpen(!sidebarOpen)}
//                         className="w-full py-2 text-sm bg-gray-800 rounded-lg
//             hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
//                     >
//                         {sidebarOpen ? "Collapse" : <ArrowRightToLine size={18} />}
//                     </button>
//                 </div>
//             </div>
//         </aside>
//     );
// }
import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
    LayoutDashboard,
    Users,
    Facebook,
    Menu,
    X,
    ArrowRightToLine,
} from "lucide-react";
import logo from "../../assets/logo.png";

const nav = [
    { to: "/admin", label: "Overview", icon: LayoutDashboard },
    { to: "/admin/users", label: "Users", icon: Users },
    { to: "/admin/facebook", label: "Facebook Accounts", icon: Facebook },
    { to: "/admin/admin-facebook-accounts", label: "My Facebook Accounts", icon: Facebook },
];

export default function AdminSidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(true);      // desktop collapse
    const [mobileOpen, setMobileOpen] = useState(false);      // mobile open

    return (
        <>
            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed lg:static z-50 top-0 left-0 h-screen
          bg-gray-950 border-r border-gray-800 text-gray-200
          transition-all duration-500 ease-in-out
          ${sidebarOpen ? "w-64" : "w-20"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4">
                        {sidebarOpen && (
                            <img
                                src={logo}
                                alt="Admin Logo"
                                className="w-40"
                            />
                        )}

                        {/* Desktop Toggle */}
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className={`hidden lg:flex items-center justify-center w-9 h-9 rounded-lg
              text-green-600 hover:scale-110 transition-all ${sidebarOpen ? "ml-5" : ""}`}
                        >
                            {sidebarOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-col flex-grow p-4 gap-2">
                        {nav.map(({ to, label, icon: Icon }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === "/admin"}
                                onClick={() => setMobileOpen(false)} // close on mobile click
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                  transition-colors
                  ${isActive
                                        ? "bg-green-600 text-black"
                                        : "hover:bg-gray-800 text-gray-300"
                                    }`
                                }
                            >
                                <Icon size={18} />
                                {sidebarOpen && <span>{label}</span>}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-800">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="w-full py-2 text-sm bg-gray-800 rounded-lg
              hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                        >
                            {sidebarOpen ? "Collapse" : <ArrowRightToLine size={18} />}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Toggle Button (use in header/navbar) */}
            <button
                onClick={() => setMobileOpen(true)}
                className="fixed top-4 left-4 z-30 lg:hidden
        bg-gray-900 p-2 rounded-lg text-green-500"
            >
                <Menu size={24} />
            </button>
        </>
    );
}
