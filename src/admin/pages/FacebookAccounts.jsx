import { useParams, Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { users, fbAccounts } from "../../constants/mockAdminData";
import FbAccountModal from "../../components/FbAccountModal";
import FbUploadModal from "../../components/FbUploadModal";


export default function AdminFacebookAccounts() {
    const { userId } = useParams();

    const [statusFilter, setStatusFilter] = useState("all");
    const [userFilter, setUserFilter] = useState("all");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [accounts, setAccounts] = useState(fbAccounts);

    const filteredAccounts = useMemo(() => {
        return accounts.filter((acc) => {
            if (userId && acc.userId !== Number(userId)) return false;
            if (statusFilter !== "all" && acc.status !== statusFilter) return false;
            if (userFilter !== "all" && acc.userId !== Number(userFilter)) return false;
            return true;
        });
    }, [accounts, userId, statusFilter, userFilter]);

    const getUser = (id) => users.find((u) => u.id === id);

    return (
        <div>
            {/* HEADER */}
            <div className="lg:flex md:flex  items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-semibold">Facebook Accounts</h1>
                    {userId && (
                        <p className="text-gray-400">
                            User: {getUser(Number(userId))?.name}
                        </p>
                    )}
                </div>
                <div className="flex gap-2 my-2 items-center ">
                    <button
                        onClick={() => setShowUploadModal(true)}
                        className="px-4 py-2 bg-green-700 hover:bg-green-600 rounded text-sm "
                    >
                        Upload CSV
                    </button>

                    <button
                        onClick={() => setShowAddModal(true)}
                        className="px-4 py-2 bg-green-700 hover:bg-green-600 rounded text-sm"
                    >
                        Add Account
                    </button>
                </div>
                {/* FILTERS */}
                <div className="flex gap-3">
                    {!userId && (
                        <select
                            value={userFilter}
                            onChange={(e) => setUserFilter(e.target.value)}
                            className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm "
                        >
                            <option value="all">All Users</option>
                            {users.map((u) => (
                                <option key={u.id} value={u.id}>
                                    {u.name}
                                </option>
                            ))}
                        </select>
                    )}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                    </select>
                </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto rounded-lg border border-gray-700 bg-gray-900">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-800 text-left text-gray-400 text-sm">
                            <th className=" sm:p-2 whitespace-nowrapp-4 ">#</th>
                            <th className=" sm:p-2 whitespace-nowrapp-4 ">Account</th>
                            <th className=" sm:p-2 whitespace-nowrapp-4 ">Email</th>
                            <th className=" sm:p-2 whitespace-nowrapp-4 ">User</th>
                            <th className=" sm:p-2 whitespace-nowrapp-4 ">Messages (Month)</th>
                            <th className=" sm:p-2 whitespace-nowrapp-4 ">Status</th>
                            <th className=" sm:p-2 whitespace-nowrap p-4 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredAccounts.map((acc, index) => {
                            const user = getUser(acc.userId);

                            return (
                                <tr
                                    key={acc.id}
                                    className="border-t border-gray-700 hover:bg-gray-800"
                                >
                                    <td className=" sm:p-2 whitespace-nowrap  p-4 text-gray-400">
                                        {index + 1}
                                    </td>
                                    <td className=" sm:p-2 whitespace-nowrap  p-4 font-medium">
                                        {acc.name}
                                    </td>
                                    <td className=" sm:p-2 whitespace-nowrap p-4 ">
                                        {acc.email}
                                    </td>
                                    <td className=" sm:p-2 whitespace-nowrap p-4 ">
                                        {user ? user.name : "—"}
                                    </td>
                                    <td className=" sm:p-2 whitespace-nowrap p-4 ">
                                        {acc.messagesScrapedThisMonth}
                                    </td>
                                    <td className=" sm:p-2 whitespace-nowrap  p-4 capitalize">
                                        <select
                                            value={acc.status}
                                            onChange={(e) => {
                                                const newStatus = e.target.value;
                                                setAccounts((prev) =>
                                                    prev.map((a) =>
                                                        a.id === acc.id ? { ...a, status: newStatus } : a
                                                    )
                                                );
                                            }}
                                            className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm capitalize"
                                        >
                                            <option value="active">active</option>
                                            <option value="inactive">inactive</option>
                                            <option value="suspended">suspended</option>
                                        </select>

                                    </td>
                                    {/* <td className="sm:p-2 whitespace-nowrap p-4 text-center"> */}
                                    <td className="sm:p-2 whitespace-nowrap p-4 text-center space-x-2">
                                        <button
                                            onClick={() =>
                                                setAccounts((prev) => prev.filter((a) => a.id !== acc.id))
                                            }
                                            className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 rounded"
                                        >
                                            Remove
                                        </button>

                                        <Link to={`/admin/facebook/${acc.userId}`}>
                                            <button className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded">
                                                View User
                                            </button>
                                        </Link>
                                    </td>

                                    {/* </td>    */}
                                </tr>
                            );
                        })}

                        {filteredAccounts.length === 0 && (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="p-6 text-center text-gray-500"
                                >
                                    No Facebook accounts found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {userId && (
                <div className="mt-6">
                    <Link to="/admin/facebook">
                        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded">
                            ← Back to all accounts
                        </button>
                    </Link>
                </div>
            )}
            {showAddModal && (
                <FbAccountModal
                    userId={userId ? Number(userId) : null}
                    onClose={() => setShowAddModal(false)}
                    onSuccess={(newAccount) => {
                        setAccounts((prev) => [...prev, newAccount]);
                        setShowAddModal(false);
                    }}
                />
            )}

            {showUploadModal && (
                <FbUploadModal
                    userId={userId ? Number(userId) : null}
                    onClose={() => setShowUploadModal(false)}
                    onSuccess={(newAccounts) => {
                        setAccounts((prev) => [...prev, ...newAccounts]);
                        setShowUploadModal(false);
                    }}
                />
            )}


        </div>
    );
}
