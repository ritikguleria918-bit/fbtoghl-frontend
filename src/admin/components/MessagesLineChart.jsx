import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export function MessagesLineChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <XAxis dataKey="day" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                    contentStyle={{
                        backgroundColor: "#111827",
                        borderColor: "#374151",
                    }}
                />
                <Line
                    type="monotone"
                    dataKey="messages"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
