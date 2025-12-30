import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/slices/adminSlice";
import { users, fbAccounts } from "../../constants/mockAdminData";
import AddUserModal from "../components/AddUserModal";
import ScrapeScheduleModal from "../components/ScrapeScheduleModal";


const PAGE_SIZE = 5;

export default function AdminUsers() {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector(state => state.admin)
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [showAddUser, setShowAddUser] = useState(false);
    const [showSchedule, setShowSchedule] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const filteredUsers = useMemo(() => {
        return users.filter((u) =>
            `${u.name} ${u.email}`.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, users]);
    const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
    const paginatedUsers = filteredUsers.slice(
        (page - 1) * PAGE_SIZE,
        page * PAGE_SIZE
    );


    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <div>
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6 flex-col">
                <div className="flex items-center justify-between mb-6 w-full">
                    <h1 className="text-3xl font-semibold w-full ">Users</h1>
                    <button
                        onClick={() => setShowAddUser(true)}
                        className="lg:hidden md:hidden sm:block px-4 py-2 sm:p-1 bg-green-600 hover:bg-green-700 rounded text-sm font-medium w-full"
                    >
                        Add User
                    </button>
                </div>
                <div className="flex gap-3 ">
                    <button
                        onClick={() => setShowAddUser(true)}
                        className="hidden md:block lg:block px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-sm font-medium "
                    >
                        Add User
                    </button>

                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm"
                    />
                </div>
            </div>
            {/* TABLE */}
            {!loading && !error && (
                <div className="overflow-x-auto rounded-lg border border-gray-700 bg-gray-900">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-800 text-gray-400 text-sm">
                                <th className="p-4 sm:p-2 whitespace-nowrap">#</th>
                                <th className="p-4 sm:p-2 whitespace-nowrap">Name</th>
                                <th className="p-4 sm:p-2 whitespace-nowrap">Email</th>
                                <th className="p-4 sm:p-2 whitespace-nowrap">Added</th>
                                <th className="p-4 sm:p-2 whitespace-nowrap">FB Accounts</th>
                                <th className="p-4 sm:p-2 whitespace-nowrap">Limit</th>
                                <th className="p-4 sm:p-2 whitespace-nowrap text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedUsers.map((user, index) => {
                                const fbCount = fbAccounts.filter(
                                    (acc) => acc.userId === user.id
                                ).length;

                                return (
                                    <tr key={user.id} className="border-t border-gray-700">
                                        <td className="p-4 sm:p-2 whitespace-nowrap">
                                            {(page - 1) * PAGE_SIZE + index + 1}
                                        </td>
                                        <td className="p-4 sm:p-2 whitespace-nowrap">{user.name}</td>
                                        <td className="p-4 sm:p-2 whitespace-nowrap">{user.email}</td>
                                        <td className="p-4 sm:p-2 whitespace-nowrap">{new Date(user.created_at).toLocaleDateString()}</td>
                                        <td className="p-4 sm:p-2 whitespace-nowrap text-center">{user.fb_accounts}</td>
                                        <td className="p-4 sm:p-2 whitespace-nowrap text-center">{user.fb_accounts_limit}</td>
                                        <td className="p-4 sm:p-2 whitespace-nowrap text-center space-x-2">
                                            <Link to={`/admin/facebook/${user.id}`}>
                                                <button className="px-3 py-1 bg-blue-600 rounded text-sm">
                                                    FB Accounts
                                                </button>
                                            </Link>

                                            <button
                                                onClick={() => {
                                                    setSelectedUser(user);
                                                    setShowSchedule(true);
                                                }}
                                                className="px-3 py-1 bg-purple-600 rounded text-sm"
                                            >
                                                Scrape Schedule
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
            {loading && (
                <div className="flex justify-center items-center py-10 text-gray-400">
                    Loading users...
                </div>
            )}
            <AddUserModal
                isOpen={showAddUser}
                onClose={() => setShowAddUser(false)}
            />
            {users && (

                <ScrapeScheduleModal
                    isOpen={showSchedule}
                    onClose={() => setShowSchedule(false)}
                    user={selectedUser}
                />
            )}
        </div>
    );
}
