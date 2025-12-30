export default function ChartCard({ title, children }) {
    return (
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-400 mb-4">
                {title}
            </h3>
            <div className="h-64">
                {children}
            </div>
        </div>
    );
}
