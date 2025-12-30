import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function FbErrorsByUserChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
                <XAxis
                    type="number"
                    stroke="#9CA3AF"
                    tickLine={false}
                />
                <YAxis
                    type="category"
                    dataKey="name"
                    stroke="#9CA3AF"
                    width={120}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: "#16A34A",
                        border: "1px solid #374151",
                        borderRadius: "0.5rem",
                    }}
                />
                <Bar
                    dataKey="errors"
                    fill="#EF4444"
                    radius={[0, 6, 6, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
