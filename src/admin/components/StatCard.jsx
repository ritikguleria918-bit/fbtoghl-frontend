export default function StatCard({ label, value, color }) {
    return (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 sm:p-6 shadow">
            <h3 className="text-gray-400 text-xs sm:text-sm">
                {label}
            </h3>

            <p className={`mt-1 sm:mt-2 font-bold text-2xl sm:text-4xl ${color}`}>
                {value}
            </p>
        </div>
    );
}
