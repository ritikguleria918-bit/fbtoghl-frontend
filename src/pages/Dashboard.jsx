import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDashboard } from "../redux/slices/userDashboardSlice";
import { Link } from "react-router-dom";
function Dashboard() {
  // Dispatch the action to fetch data
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDashboard());
  }, [dispatch]);

  // Accessing the Redux state
  const { totalAccounts, errorAccounts, newMessageAccounts, loading, error } = useSelector(
    (state) => state.userDashboard
  );

  // Loading state handling (optional)
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error handling (optional)
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full p-6 text-gray-200">

      {/* Header */}
      <h2 className="text-3xl font-semibold mb-6">Dashboard Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Total Accounts */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow hover:shadow-lg transition">
          <h3 className="text-lg font-medium text-gray-400">Total Facebook Accounts</h3>
          <p className="text-4xl font-bold mt-2 text-green-400">{totalAccounts}</p>
        </div>

        {/* Accounts With Error */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow hover:shadow-lg transition">
          <h3 className="text-lg font-medium text-gray-400">Accounts With Error</h3>
          <p className="text-4xl font-bold mt-2 text-red-400">{errorAccounts.length}</p>
        </div>

        {/* Accounts With New Messages */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow hover:shadow-lg transition">
          <h3 className="text-lg font-medium text-gray-400">Accounts With New Messages</h3>
          <p className="text-4xl font-bold mt-2 text-blue-400">{newMessageAccounts.length}</p>
        </div>
      </div>

      {/* TWO COLUMNS: Error Accounts + New Messages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* LEFT TABLE: Error Accounts */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Error Accounts List</h3>

          <div className="overflow-x-auto rounded-lg border border-gray-700 bg-gray-900">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-800 text-left text-gray-400 text-sm">
                  <th className="p-4">#</th>
                  <th className="p-4">Account Name</th>
                  <th className="p-4">Error Message</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {errorAccounts.length > 0 ? (
                  errorAccounts.map((acc, i) => (
                    <tr key={acc.id} className="border-t border-gray-700 hover:bg-gray-800">
                      <td className="p-4 text-gray-400">{i + 1}</td>
                      <td className="p-4 font-medium">{acc.account_name}</td>
                      <td className="p-4 text-red-400">{acc.error_message}</td>
                      <td className="p-4 text-center">
                        <Link to="/facebook-accounts/">
                          <button className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 rounded">
                            Fix
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-6 text-center text-gray-500">
                      No accounts with errors 🎉
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT TABLE: Accounts With New Messages */}
        <div>
          <h3 className="text-xl font-semibold mb-4">New Messages</h3>

          <div className="overflow-x-auto rounded-lg border border-gray-700 bg-gray-900">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-800 text-left text-gray-400 text-sm">
                  <th className="p-4">#</th>
                  <th className="p-4">Account Name</th>
                  <th className="p-4">New Messages</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {newMessageAccounts.length > 0 ? (
                  newMessageAccounts.map((acc, i) => (
                    <tr key={acc.account_id} className="border-t border-gray-700 hover:bg-gray-800">
                      <td className="p-4 text-gray-400">{i + 1}</td>
                      <td className="p-4 font-medium">{acc.account_name}</td>
                      <td className="p-4 text-blue-400">{acc.new_messages}</td>
                      <td className="p-4 text-center">
                        <Link to={`/fb/${acc.account_id}`}>
                          <button className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded">
                            Check
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-6 text-center text-gray-500">
                      No new messages 🎉
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div >
  );
}

export default Dashboard;
