// import React, { useState, useMemo, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Trash2, Plus, Upload } from "lucide-react";
// import FbAccountModal from "../../components/FbAccountModal";
// import FbUploadModal from "../../components/FbUploadModal";
// import { fbAccounts as mockFbAccounts } from "../../constants/mockAdminData";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchFBAccounts } from "../../redux/slices/fbAccountsSlice";
// function AdminFbAccounts() {
//     const dispatch = useDispatch();
//     const { userId } = useParams();

//     // const [accounts, setAccounts] = useState(
//     //     mockFbAccounts.filter(acc => acc.userId === Number(userId))
//     // );  
//     const { accounts, loading, error } = useSelector((state) => state.fbAccounts);

//     const [addModalOpen, setAddModalOpen] = useState(false);
//     const [uploadModalOpen, setUploadModalOpen] = useState(false);

//     const handleRemove = (id) => {
//         setAccounts(prev => prev.filter(acc => acc.id !== id));
//     };

//     const handleStatusChange = (id, status) => {
//         setAccounts(prev =>
//             prev.map(acc =>
//                 acc.id === id ? { ...acc, status } : acc
//             )
//         );
//     };

//     const handleAddAccount = (newAccount) => {
//         setAccounts(prev => [...prev, newAccount]);
//     };

//     const handleBulkUpload = (newAccounts) => {
//         setAccounts(prev => [...prev, ...newAccounts]);
//     };
//     useEffect(() => {
//         dispatch(fetchFBAccounts());
//     }, [dispatch]);

//     return (
//         <div className="p-6 text-gray-200">
//             {/* Header */}
//             <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold text-green-400">
//                     Facebook Accounts (Admin)
//                 </h2>

//                 <div className="flex gap-3">
//                     <button
//                         onClick={() => setUploadModalOpen(true)}
//                         className="flex items-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-600 rounded text-black"
//                     >
//                         <Upload size={16} />
//                         Upload CSV
//                     </button>

//                     <button
//                         onClick={() => setAddModalOpen(true)}
//                         className="flex items-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-600 rounded text-black"
//                     >
//                         <Plus size={16} />
//                         Add Account
//                     </button>
//                 </div>
//             </div>

//             {/* Empty State */}
//             {accounts.length === 0 && (
//                 <p className="text-gray-400">No Facebook accounts for this user.</p>
//             )}

//             {/* Accounts List */}
//             <ul className="space-y-4">
//                 {accounts.map(acc => (
//                     <li
//                         key={acc.id}
//                         className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex justify-between items-center"
//                     >
//                         <div>
//                             <p className="font-semibold text-white">{acc.name}</p>
//                             <p className="text-sm text-gray-400">{acc.email}</p>
//                             <p className="text-sm text-gray-400">
//                                 Messages this month:{" "}
//                                 <span className="text-green-400">
//                                     {acc.messagesScrapedThisMonth}
//                                 </span>
//                             </p>
//                         </div>

//                         <div className="flex items-center gap-4">
//                             {/* Status */}
//                             <select
//                                 value={acc.status}
//                                 onChange={(e) =>
//                                     handleStatusChange(acc.id, e.target.value)
//                                 }
//                                 className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-sm"
//                             >
//                                 <option value="active">Active</option>
//                                 <option value="inactive">Inactive</option>
//                                 <option value="suspended">Suspended</option>
//                             </select>

//                             {/* Remove */}
//                             <button
//                                 onClick={() => handleRemove(acc.id)}
//                                 className="flex items-center gap-1 px-3 py-1 bg-red-800 hover:bg-red-700 rounded text-red-100"
//                             >
//                                 <Trash2 size={14} />
//                                 Remove
//                             </button>
//                         </div>
//                     </li>
//                 ))}
//             </ul>

//             {/* Modals */}
//             {addModalOpen && (
//                 <FbAccountModal
//                     userId={Number(userId)}
//                     onClose={() => setAddModalOpen(false)}
//                     onSuccess={handleAddAccount}
//                 />
//             )}

//             {uploadModalOpen && (
//                 <FbUploadModal
//                     userId={Number(userId)}
//                     onClose={() => setUploadModalOpen(false)}
//                     onSuccess={handleBulkUpload}
//                 />
//             )}
//         </div>
//     );
// }

// export default AdminFbAccounts;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchFBAccounts,
    removeFBAccount,
} from "../../redux/slices/fbAccountsSlice";
import FBAccountModal from "../../components/FBAccountModal";
import FBUploadModal from "../../components/FBUploadModal";
import { Link } from "react-router-dom";
import { Trash2, Plus, Edit2, Upload } from "lucide-react";
import FBAccountEditModal from "../../components/FBAccountEditModal";
import AutomatedMessageModal from "../../components/AutomatedMessageModal";
function FacebookAccounts() {
    const { accounts, loading, error } = useSelector((state) => state.fbAccounts);
    // console.log(accounts)
    const { user, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [autoMsgModalOpen, setAutoMsgModalOpen] = useState(false);
    const [selectedAutoMsgAccount, setSelectedAutoMsgAccount] = useState(null);
    const openAutoMsgModal = (acc) => {
        setSelectedAutoMsgAccount(acc);
        setAutoMsgModalOpen(true);
    };

    const majorErrors = ['Cookies Expired', 'Proxy Expired']


    const handleEditClick = (account) => {
        setSelectedAccount(account);
        setEditModalOpen(true);
    };

    const [openId, setOpenId] = useState(null);

    useEffect(() => {
        dispatch(fetchFBAccounts());
    }, [dispatch]);

    return (
        <div className="p-6 text-gray-200 bg-gray-700">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">
                <h2 className="text-2xl font-bold text-green-400">
                    Facebook Accounts
                </h2>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={() => setShowUploadModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-600 rounded text-black"
                    >
                        <Upload size={16} />   Upload CSV/Excel
                    </button>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-600 rounded text-black"
                    >
                        <Plus size={16} />
                        Add Account
                    </button>
                </div>
            </div>

            {/* States */}
            {loading && <p className="text-gray-400">Loading accounts...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {
                !loading && accounts.length === 0 && (
                    <p className="text-gray-400">No accounts connected yet.</p>
                )
            }

            {/* Accounts List */}
            <ul className="space-y-5">
                {accounts.map((acc) => (
                    <li
                        key={acc.id}
                        className="bg-gray-900 border border-gray-800 rounded-xl p-4"
                    >
                        {/* Header Row */}
                        <div className="relative">
                            <button
                                onClick={() => setOpenId(openId === acc.id ? null : acc.id)}
                                className="w-full flex items-center justify-between text-left"
                            >
                                <p className="text-lg font-semibold text-green-400">
                                    {acc.account_name || acc.email || acc.phone_number}
                                </p>

                                {/* Mobile Arrow */}
                                <span
                                    className={`sm:hidden transition-transform duration-200 ${openId === acc.id ? "rotate-180" : ""
                                        }`}
                                >
                                    ▼
                                </span>
                            </button>

                            {/* Desktop / Tablet Edit */}
                            <button
                                onClick={() => handleEditClick(acc)}
                                className="
              hidden sm:flex items-center gap-2
              px-3 py-1.5
              rounded-md
              bg-gray-800
              border border-gray-700
              text-gray-200 text-sm
              hover:bg-gray-700 hover:border-gray-600
              transition-colors
              absolute top-0 right-0
            "
                            >
                                <Edit2 size={14} />
                                Edit
                                {acc?.last_error && majorErrors.includes(acc?.last_error)
                                    ? ` (${acc.last_error})`
                                    : ""}
                            </button>
                        </div>

                        {/* Details */}
                        <div
                            className={`mt-3 space-y-1 text-sm ${openId === acc.id ? "block" : "hidden sm:block"
                                }`}
                        >
                            <p className="text-gray-300">
                                <span className="text-green-600">Proxy:</span>{" "}
                                {acc.proxy_url || "No Proxy"}
                            </p>

                            <p className="text-gray-300">
                                <span className="text-green-600">User:</span>{" "}
                                {acc.proxy_user || "N/A"}
                            </p>

                            <p className="text-gray-300">
                                <span className="text-green-600">Port:</span>{" "}
                                {acc.proxy_port || "N/A"}
                            </p>

                            <p>
                                <span className="text-green-600">Status:</span>{" "}
                                <span
                                    className={
                                        acc.login_status === "active"
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }
                                >
                                    {acc.login_status}
                                </span>
                                {acc.last_error && (
                                    <span className="text-red-500 ml-1">
                                        ({acc.last_error})
                                    </span>
                                )}
                            </p>
                        </div>

                        {/* Actions */}
                        <div
                            className={`mt-4 ${openId === acc.id ? "block" : "hidden sm:block"
                                }`}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                {/* Automated Message */}
                                <button
                                    onClick={() => openAutoMsgModal(acc)}
                                    className="bg-yellow-600 hover:bg-yellow-500 text-black py-2 rounded-lg font-medium"
                                >
                                    Automated Message
                                </button>

                                {/* Edit - Mobile Only */}
                                <button
                                    onClick={() => handleEditClick(acc)}
                                    className="sm:hidden bg-gray-800 hover:bg-gray-700 text-gray-200 py-2 rounded-lg font-medium flex items-center justify-center gap-2"
                                >
                                    <Edit2 size={16} />
                                    Edit
                                </button>

                                {/* View Chats */}
                                {acc.login_status === "active" && (
                                    <Link to={`/admin/fb/${acc.id}`} className="w-full">
                                        <button className="w-full bg-indigo-700 hover:bg-indigo-600 text-indigo-100 py-2 rounded-lg font-medium flex items-center justify-center gap-2">
                                            {/* <Eye size={16} /> */}
                                            View Chats
                                        </button>
                                    </Link>
                                )}

                                {/* Remove */}
                                <button
                                    onClick={async () => {
                                        setDeletingId(acc.id);
                                        await dispatch(removeFBAccount(acc.id));
                                        setDeletingId(null);
                                    }}
                                    disabled={deletingId === acc.id}
                                    className={`py-2 rounded-lg font-medium flex items-center justify-center gap-2 ${deletingId === acc.id
                                        ? "bg-gray-600 cursor-not-allowed text-gray-300"
                                        : "bg-red-900 hover:bg-red-800 text-red-200"
                                        }`}
                                >
                                    <Trash2 size={16} />
                                    {deletingId === acc.id ? "Removing..." : "Remove"}
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Modals */}
            <FBAccountEditModal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                account={selectedAccount}
                token={token}
                onSuccess={() => dispatch(fetchFBAccounts())}
            />

            {modalOpen && <FBAccountModal onClose={() => setModalOpen(false)} />}
            {showUploadModal && <FBUploadModal onClose={() => setShowUploadModal(false)} />}

            <AutomatedMessageModal
                isOpen={autoMsgModalOpen}
                onClose={() => setAutoMsgModalOpen(false)}
                account={selectedAutoMsgAccount}
            />
        </div >



    );
}
export default FacebookAccounts;