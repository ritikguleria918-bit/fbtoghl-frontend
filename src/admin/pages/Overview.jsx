import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import {
    adminOverview, users, fbAccounts, messagesChartData, fbAccountsDistribution, fbUsageChartData, fbErrorTypeChartData,
    fbErrorsByUserChartData,
} from "../../constants/mockAdminData";
import { MessagesLineChart } from "../components/MessagesLineChart";
import { FbAccountsPieChart } from "../components/FbAccountsPieChart";
import FbErrorTypePieChart from "../components/FbErrorTypePieChart";
import FbErrorsByUserChart from "../components/FbErrorsByUserChart";
export default function AdminOverview() {
    return (
        <>

            <h1 className="text-3xl font-semibold mb-8">
                Platform Overview
            </h1>

            {/* STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <StatCard
                    label="Total Clients"
                    value={adminOverview.totalClients}
                    color="text-blue-400"
                />
                <StatCard
                    label="Facebook Accounts"
                    value={adminOverview.totalFbAccounts}
                    color="text-yellow-400"
                />
                <StatCard
                    label="Messages (24h)"
                    value={adminOverview.messages24h}
                    color="text-purple-400"
                />
            </div>
            {/* CHARTS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                <ChartCard title="Messages (Last 7 Days)">
                    <MessagesLineChart data={messagesChartData} />
                </ChartCard>

                <ChartCard title="FB Accounts Usage">
                    <FbAccountsPieChart data={fbUsageChartData} />
                </ChartCard>

                {/* <ChartCard title="Coming Soon">
                    <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                        More analytics coming soon
                    </div>
                </ChartCard> */}
                {/* <ChartCard title="FB Accounts Overview">
                    <FbUsageBarChart data={fbUsageChartData} />
                </ChartCard> */}

                <ChartCard title="FB Account Errors">
                    <FbErrorTypePieChart data={fbErrorTypeChartData} />
                </ChartCard>

                <ChartCard title="FB Account Errors by User">
                    <FbErrorsByUserChart data={fbErrorsByUserChartData} />
                </ChartCard>
            </div>


            {/* USERS TABLE */}
            <h2 className="text-2xl font-semibold mb-4">
                Users
            </h2>

            {/* <div className="overflow-x-auto rounded-lg border border-gray-700 bg-gray-900">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-800 text-left text-gray-400 text-sm">
                            <th className="p-4">#</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Added At</th>
                            <th className="p-4">FB Accounts</th>
                            <th className="p-4">Limit</th>
                            <th className="p-4 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => {
                            const userFbAccounts = fbAccounts.filter(
                                (acc) => acc.userId === user.id
                            );

                            return (
                                <tr
                                    key={user.id}
                                    className="border-t border-gray-700 hover:bg-gray-800"
                                >
                                    <td className="p-4 text-gray-400">
                                        {index + 1}
                                    </td>
                                    <td className="p-4 font-medium">
                                        {user.name}
                                    </td>
                                    <td className="p-4">
                                        {user.email}
                                    </td>
                                    <td className="p-4 text-gray-400">
                                        {user.addedAt}
                                    </td>
                                    <td className="p-4">
                                        {userFbAccounts.length}
                                    </td>
                                    <td className="p-4">
                                        {user.fbAccountsLimit}
                                    </td>
                                    <td className="p-4 text-center">
                                        <Link to={`/admin/facebook/${user.id}`}>
                                            <button className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded">
                                                View FB Accounts
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div> */}
            <div className="overflow-x-auto rounded-lg border border-gray-700 bg-gray-900">
                <table className="min-w-full text-xs sm:text-sm">
                    <thead>
                        <tr className="bg-gray-800 text-left text-gray-400">
                            <th className="p-2 sm:p-4 whitespace-nowrap">#</th>
                            <th className="p-2 sm:p-4 whitespace-nowrap">Name</th>
                            <th className="p-2 sm:p-4 whitespace-nowrap">Email</th>
                            <th className="p-2 sm:p-4 whitespace-nowrap">Added At</th>
                            <th className="p-2 sm:p-4 whitespace-nowrap " >FB Accounts</th>
                            <th className="p-2 sm:p-4 whitespace-nowrap">Limit</th>
                            <th className="p-2 sm:p-4 whitespace-nowrap text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => {
                            const userFbAccounts = fbAccounts.filter(
                                (acc) => acc.userId === user.id
                            );

                            return (
                                <tr
                                    key={user.id}
                                    className="whitespace-nowrap border-t border-gray-700 hover:bg-gray-800"
                                >
                                    <td className="whitespace-nowrap p-2 sm:p-4 text-gray-400">
                                        {index + 1}
                                    </td>
                                    <td className="whitespace-nowrap p-2 sm:p-4 font-medium">
                                        {user.name}
                                    </td>
                                    <td className="whitespace-nowrap p-2 sm:p-4 break-all sm:break-normal">
                                        {user.email}
                                    </td>
                                    <td className="whitespace-nowrap p-2 sm:p-4 text-gray-400 whitespace-nowrap">
                                        {user.addedAt}
                                    </td>
                                    <td className="whitespace-nowrap p-2 sm:p-4">
                                        {userFbAccounts.length}
                                    </td>
                                    <td className="whitespace-nowrap p-2 sm:p-4">
                                        {user.fbAccountsLimit}
                                    </td>
                                    <td className="whitespace-nowrap p-2 sm:p-4 text-center">
                                        <Link to={`/admin/facebook/${user.id}`}>
                                            <button className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 rounded">
                                                View FB
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

        </>
    );
}
